<template>
    <div class="col-11 mx-auto pt-5 px-0 mainContainer">
    
        <div v-if="!resetPasswordRequestSent" class="col-12 col-lg-4 my-5  px-lg-5 formContainer">

            <p class="col-12 mt-5 text-center title"> Şifrəni Yenilə </p>

            <div class="col-10 px-0 mx-auto mt-5 mb-3 resetInput">

                <v-text-field v-model="resetPasswordData.email" solo label="Telefon və ya Email" :error-messages="emailError"> </v-text-field>
            </div>

            <div class="col-10 px-0 mx-auto mb-5 text-center sendButtonContainer">

                <button class="col-12 px-0 py-2" @click="sendData">
                    
                    <span v-show="buttonSpinnerIsActive" class="spinner-border loadingSpinner mr-2" role="status" aria-hidden="true"></span>  

                     Göndər 
                     
                </button>
                
            </div>

        </div>


        <div v-if="resetPasswordRequestSent && successDialogIsActive" class="col-12 col-lg-4 my-5   px-lg-5 resetLinkSentDialog">

            <p class="col-12 text-center successIcon"> <font-awesome-icon icon="fas fa-check-circle" /> </p>

            <p class="col-12 text-center successMsg">  Qeyd Etdiyiniz Emailə Təlimat Göndərildi ! </p>


        </div>


        <div v-if="resetPasswordRequestSent && errorDialogIsActive" class="col-12 col-lg-4 my-5   px-lg-5 errorDialog">

            <p class="col-12 text-center errorIcon"> <font-awesome-icon icon="fas fa-times-circle" /> </p>

            <p class="col-12 text-center errorMsg"> {{ errorMessage }} </p>


        </div>



    
    </div>
</template>

<style scoped src="./Reset-Password.css"></style>
<script src="./Reset-Password.js"></script>