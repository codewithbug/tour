import { validations } from "@/utils/resettPasswordEmailValidation";

const API = process.env.VUE_APP_APIURL;  
  
import axios from 'axios';

import { debounce } from 'debounce';

export default{

    validations:validations,

    name : "ResetPassword",

    data : function(){

        return {

            successDialogIsActive : false,
            errorDialogIsActive : false,
            buttonSpinnerIsActive: false,
            resetPasswordRequestSent : false,

            errorMessage: "Xəta baş verdi !",

            resetPasswordData : {

                email : ""

            }
        }

    },

    methods : {

        setResetRequestSentToTrue : function(){

            this.resetPasswordRequestSent = true
        },

        activateButtonSpinner : function(){

            this.buttonSpinnerIsActive = true
        },

        deactivateButtonSpinner : function(){

            this.buttonSpinnerIsActive = false
        },

        showSuccessDialog : function(){

            this.successDialogIsActive  = true
        },

        showErrorDialog : function(message){

            this.errorMessage = (message ? message : this.errorMessage);

            this.errorDialogIsActive = true
        },

        sendData : async function(){

            this.$v.$touch();

            if (this.$v.$invalid) {

                this.formValidationHasError = true;

                return;
            }

            this.activateButtonSpinner();

            this.debouncedSendData();





        }
    },

    created(){

        this.debouncedSendData  = debounce( async function(){

            this.$v.$touch();

            if (this.$v.$invalid) {

                this.formValidationHasError = true;

                return;
            }


            try{

                let response = await axios.post( API + "user/sendPasswordResetRequest" , this.resetPasswordData);

                let data = response.data;

                this.deactivateButtonSpinner();

                this.setResetRequestSentToTrue();

                if( data.success ){

                    this.showSuccessDialog();
                }else{

                    this.showErrorDialog();

                }

            }catch(error){

                let response = error.response;

                let errorMsg = response.data.errors[0];

                let resposneStatus = error.response.status;
                

                this.deactivateButtonSpinner();

                this.setResetRequestSentToTrue();

                if(resposneStatus == 400){

                    this.showErrorDialog(errorMsg);

                    return

                }

                this.showErrorDialog();
            }





        }  , 500 )
    },

    computed : {

        
        emailError() {
            
            const errors = [];
            if (!this.$v.resetPasswordData.email.$dirty) return errors;
            !this.$v.resetPasswordData.email.required && errors.push('Boş ola bilməz !.')
            return errors
        },

    }

}