<template>
    <div class="col-11 mx-auto pt-5 px-0 mainContainer">

        <div v-if="requestChecked && resetFormIsActive" class="col-12 col-lg-4 my-5  px-lg-5 formContainer">

            <div class="col-12 px-0 mb-5 text-center">

                <p class="col-12 px-0 text-center title"> Şifrənin yenilənməsi </p>
            </div>
            
            <div class="col-12 px-0 text-center passwordInputContainer">

                <v-text-field solo label="Yeni şifrə" v-model="userData.newPassword" :type="showPassword ? 'text' : 'password' " :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" :error-messages="passwordError" ></v-text-field>
                <v-text-field solo label="Yeni şifrənin təkrarı" v-model="userData.confirmNewPassword"   :type="confirmShowPassword ? 'text' : 'password' " :append-icon="confirmShowPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="confirmShowPassword = !confirmShowPassword" :error-messages="confirmPasswordError"></v-text-field>

            </div>


            <div class="col-12 px-0 mt-3 sendButtonContainer">

               <button class="col-12 px-0 py-2" @click="sendData">
                
                    <span  class="spinner-border loadingSpinner mr-2" v-if="buttonSpinnerIsActive" role="status" aria-hidden="true"></span>  

                    Təsdiqlə 
                 
                </button>

            </div>


        </div>

        <div v-if="requestChecked && successDialogIsActive" class="col-12 col-lg-4 my-5   px-lg-5 successContainer">

            <p class="col-12 text-center successIcon"> <font-awesome-icon icon="fas fa-check-circle" /> </p>

            <p class="col-12 text-center successMsg">  Şifrəniz uğurla dəyişildi ! Yönləndirilirsiniz... </p>


        </div>

        <div v-if="requestChecked && errorDialogIsActive" class="col-12 col-lg-4 my-5   px-lg-5 errorDialog">

            <p class="col-12 text-center errorIcon"> <font-awesome-icon icon="fas fa-times-circle" /> </p>

            <p class="col-12 text-center errorMsg"> {{errorMessage}} </p>


        </div>

        <div v-if="!requestChecked" class="col-12  col-xl-8 col-lg-9 my-5  px-lg-5 margin-auto text-center dialogContainer">

            <div class="spinner-border text-primary mx-auto" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            

        </div>

    </div>
</template>

<style scoped src="./Set-New-Password-After-Reset.css"></style>
<script src="./Set-New-Password-After-Reset.js"></script>