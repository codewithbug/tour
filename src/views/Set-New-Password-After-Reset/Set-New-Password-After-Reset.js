const API = process.env.VUE_APP_APIURL;  
  
import axios from 'axios';


import { validations } from '@/utils/setNewPasswordValidation';



import { debounce } from 'debounce';

export default{


    validations: validations,

    name : "SetNewPasswordAfterReset",

    data : function(){

        return{
            showPassword:  false,
            confirmShowPassword : false,

            errorMessage : "Xəta baş verdi ! ",

            resetFormIsActive : false,
            successDialogIsActive : false,
            errorDialogIsActive : false,
            requestChecked : false,
            buttonSpinnerIsActive : false,

            userData : {

                newPassword : "",
                confirmNewPassword : ""
            }
        }
    },

    methods : {

        activateButtonSpinner : function(){

            this.buttonSpinnerIsActive = true
        },

        deactivateButtonSpinner : function(){

            this.buttonSpinnerIsActive = false
        },

        showResetForm : function(){

            this.resetFormIsActive = true
        },
        

        hideResetForm : function(){

            this.resetFormIsActive = false
        },
        

        showSuccessDialog : function(){

            this.successDialogIsActive = true
        },

        showErrorDialog : function(errorMsg){

            this.errorMessage = (errorMsg ? errorMsg : this.errorMessage )

            this.errorDialogIsActive = true
        },

        setRequestCheckedToTrue : function(){

            this.requestChecked = true
        },

        redirectAfteSuccessfullPasswordReset : function(){

            setTimeout( () => this.$router.push( "/login" ) , 2000 )
        },


        checkRequest : async function(){

            try {
            

                let userId = this.$route.params.userId;

                let token = this.$route.params.token;

                let response = await axios.get( API + `user/checkPasswordResetRequest/${userId}/${token}`);

                let data = response.data;

                this.setRequestCheckedToTrue();

                if( data.success ){

                    this.showResetForm();

                }else{

                    this.showErrorDialog();
                }

            }catch(error){

                let response = error.response;

                console.log(error)

                let errorMsg = response.data.errors[0];

                let resposneStatus = error.response.status;

                this.setRequestCheckedToTrue();

                if(resposneStatus == 400){

                    this.showErrorDialog(errorMsg);

                    return

                }

                this.showErrorDialog();


            }

        },

        sendData : async function(){
            this.$v.$touch();

            if (this.$v.$invalid) {

                return;
            }

            this.activateButtonSpinner();

            this.debouncedSendData();
            


        }



        

    },

    created(){
        this.checkRequest();

        this.debouncedSendData = debounce( async function(){

            try{

                let userId = this.$route.params.userId;

                let token = this.$route.params.token;

                this.userData.id = userId;

                this.userData.token = token;

                let response = await axios.post(  API + "user/resetPassword" , this.userData );

                let data = response.data;

                this.deactivateButtonSpinner();

                if( data.success ){


                    this.hideResetForm();
                    this.showSuccessDialog();
                    this.redirectAfteSuccessfullPasswordReset();

                }else{

                    this.hideResetForm();
                    this.showErrorDialog()

                }

            }catch( error ){

                let response = error.response;

                let errorMsg = response.data.errors[0];

                let resposneStatus = error.response.status;
                

                this.deactivateButtonSpinner();


                if(resposneStatus == 400){

                    this.hideResetForm();

                    this.showErrorDialog(errorMsg);

                    return

                }

                this.hideResetForm();

                this.showErrorDialog();
            }


        } , 500)




    },

    computed :{

        passwordError() {

            const errors = [];
            if (!this.$v.userData.newPassword.$dirty) return errors;

            if( !this.$v.userData.newPassword.required ){

                errors.push('Şifrə boş ola bilməz !.')

                return errors
                
            }

            if( !this.$v.userData.newPassword.strongPassword ){

                errors.push('Ən az 1 kiçik və 1 böyük hərf , 1 rəqəm , 1 simvol olmalıdır !.')

                return errors
            }


            
            if( !this.$v.userData.newPassword.validPasswordLength){

                
                errors.push('Uzunluq  6-20 arası olmalıdır !.')

                return errors

            }


        },

        confirmPasswordError() {

            const errors = [];
            if (!this.$v.userData.confirmNewPassword.$dirty) return errors;

            if( !this.$v.userData.confirmNewPassword.required ){

                errors.push('Şifrə boş ola bilməz !.')

                return errors
                
            }

            if(  !this.$v.userData.confirmNewPassword.passwordsAreSame ){

                errors.push(' Şifrə eyni deyil !.')

                return errors
            }

            if( !this.$v.userData.confirmNewPassword.strongPassword ){

                errors.push('Ən az 1 kiçik və 1 böyük hərf , 1 rəqəm , 1 simvol olmalıdır !.')

                return errors
            }


            
            if( !this.$v.userData.confirmNewPassword.validPasswordLength){

                
                errors.push('Uzunluq  6-20 arası olmalıdır !.')

                return errors

            }



        },
        
    }
    
}