const VueTelInput = () =>Promise.all([

    import(/* webpackChunkName: "chunk-vue-tel-input" */ 'vue-tel-input'),
    import(/* webpackChunkName: "chunk-vue-tel-input" */ 'vue-tel-input/dist/vue-tel-input.css'),
  
  ]).then( ([{ VueTelInput } ]  )  => VueTelInput );

  
  
  const API = process.env.VUE_APP_APIURL;  
  
  import axios from 'axios';


  import { validations } from '@/utils/validation-for-signUp-form';

//   import equals from 'validator/es/lib/equals';

//   import isStrongPassword from 'validator/es/lib/isStrongPassword';

//   import isMobilePhone from 'validator/es/lib/isMobilePhone';
import { debounce } from 'debounce';

export default{
    name: "SignUp",
    

    validations: validations,

    data : function(){

        return{

            signUpIsSuccessfull : false,

            currentSnackbarType : "success", // success/error

            snackbarMessage: "",

            snackbarOpened: false,

            buttonSpinnerIsActive:false,
            formValidationHasError : false,
            showPassword: false,
            confirmShowPassword : false,

            userData : {

                name : "",
                surname : "",
                countryCode : "",
                phoneNumber : "",
                fullPhoneNumber : "",
                email : "",
                password : "",
                confirmPassword : ""
            }
        }

    },

    methods : {

        showEmailVerifyDialog : function (){

            this.signUpIsSuccessfull = true;
        },

        openSnackBar( message = "success" , type ) {

            this.currentSnackbarType = type;

            this.snackbarMessage = message;

            this.snackbarOpened = true;

        },

        activateButtonSpinner : function(){

            this.buttonSpinnerIsActive = true
        },

        deactivateButtonSpinner : function(){

            this.buttonSpinnerIsActive = false
        },

        formatPhoneNumber : function(){

            this.userData.fullPhoneNumber =  this.userData.countryCode + this.userData.phoneNumber;

        },

        sendData : function(){
            this.formatPhoneNumber();

            this.$v.$touch();

            if (this.$v.$invalid) {

                this.formValidationHasError = true;

                return;
            }



            this.formValidationHasError = false;

            this.activateButtonSpinner();

            this.debouncedSendData();




        }

    },

    created() {

        this.debouncedSendData = debounce( async function(){

            try{

                let response = await axios.post( API + "user/signUp" , this.userData);

                let data = response.data;

                this.deactivateButtonSpinner();

                if( data.success ){

                    this.openSnackBar( "Uğurlu Qeydiyyat !" , "success")

                    this.showEmailVerifyDialog();

                }else{

                    this.openSnackBar( "Xəta Baş Verdi !" , "error")

                }

            }catch(error){

                let errorMsg = error.response ? error.response.data.errors[0]  : error

                
                this.deactivateButtonSpinner();

                this.openSnackBar( errorMsg , "error")

            }
            


        } , 500)
    },


    computed : {



        nameError() {
            
            const errors = [];
            if (!this.$v.userData.name.$dirty) return errors;
            !this.$v.userData.name.required && errors.push('Ad boş ola bilməz !.')
            return errors
        },

        surnameError() {

            const errors = [];
            if (!this.$v.userData.surname.$dirty) return errors;
            !this.$v.userData.surname.required && errors.push('Soyad boş ola bilməz !.')
            return errors
        },

        emailError() {

            const errors = [];
            if (!this.$v.userData.email.$dirty) return errors;

            if( !this.$v.userData.email.required ){

                errors.push('email boş ola bilməz !.')

                return errors
                
            }

            if(  !this.$v.userData.email.email ){

                errors.push('email formatı yanlışdır !.')

                return errors
            }



        },


        phoneNumberError() {

            // let fullPhoneNumber = this.userData.countryCode + this.userData.phoneNumber;

            const errors = [];
            if (!this.$v.userData.phoneNumber.$dirty) return errors;

            if( !this.$v.userData.phoneNumber.required ){

                errors.push('Telefon boş ola bilməz !.')

                return errors

            }


            if( !this.$v.userData.fullPhoneNumber.validatePhoneNumber ){

                errors.push('Yanlış Nömrə Formatı !')

                return errors

            }


        },



        passwordError() {

            const errors = [];
            if (!this.$v.userData.password.$dirty) return errors;

            if( !this.$v.userData.password.required ){

                errors.push('Şifrə boş ola bilməz !.')

                return errors
                
            }

            if( !this.$v.userData.password.strongPassword ){

                errors.push('Ən az 1 kiçik və 1 böyük hərf , 1 rəqəm , 1 simvol olmalıdır !.')

                return errors
            }


            
            if( !this.$v.userData.password.validPasswordLength){

                
                errors.push('Uzunluq  6-20 arası olmalıdır !.')

                return errors

            }



        },



        confirmPasswordError() {

            const errors = [];
            if (!this.$v.userData.confirmPassword.$dirty) return errors;

            if( !this.$v.userData.confirmPassword.required ){

                errors.push('Şifrə boş ola bilməz !.')

                return errors
                
            }

            if(  !this.$v.userData.confirmPassword.passwordsAreSame ){

                errors.push(' Şifrə eyni deyil !.')

                return errors
            }


            if(  !this.$v.userData.confirmPassword.strongPassword ){

                errors.push('Ən az 1 kiçik və 1 böyük hərf , 1 rəqəm , 1 simvol olmalıdır !.')

                return errors
            }



            
            if( !this.$v.userData.confirmPassword.validPasswordLength){

                
                errors.push('Uzunluq  6-20 arası olmalıdır !.')

                return errors

            }

            




        },

        


    },


    components:{VueTelInput},

    watch : {


        "userData.countryCode" : function( code ){
            
            this.userData.fullPhoneNumber = code + this.userData.phoneNumber
        },


        "userData.phoneNumber" : function( phone ){
            
            this.userData.fullPhoneNumber = this.userData.countryCode + phone
        },

        "$v.$invalid" : function(value){

            if( !value){

                this.formValidationHasError = false
            }else{

                this.formValidationHasError = true

            }
        
    }

    }
    


}