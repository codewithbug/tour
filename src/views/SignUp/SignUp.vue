<template>
<div class="col-11 mx-auto pt-5 px-0 mainContainer">

        <div v-if="!signUpIsSuccessfull" class="col-12  col-xl-8 col-lg-9 my-5  px-lg-5 formContainer">

            <div class="col-12 mb-5 title">
                
                <h1 class="col-12 text-center"> Qeydiyyatdan keçin </h1>
                
            </div>
            
            <div class="col-12 col-md-6  inputContainer">

                <v-text-field solo label="Ad" v-model="userData.name" :error-messages="nameError"></v-text-field>

            </div>
            
            <div class="col-12 col-md-6  inputContainer">

                <v-text-field solo label="Soyad" v-model="userData.surname"  :error-messages="surnameError"></v-text-field>

            </div>
            
            
            <div class="col-12 col-md-6  inputContainer">

                <v-text-field solo label="Email" v-model="userData.email" :error-messages="emailError"></v-text-field>

            </div>
            
            
            <div class="col-12 col-md-6  phoneNumberContainer inputContainer">

                <vue-tel-input class="col-4 px-0 py-2"  v-model="userData.countryCode" :input-options="{showDialCode:true}" :dropdown-options="{showSearchBox:true , showFlags:true , showDialCodeInSelection:true , showDialCodeInList:true , width:'390px'}"></vue-tel-input>

                <v-text-field class="col-8 pl-2" solo label="Telefon"  v-model="userData.phoneNumber" :error-messages="phoneNumberError"></v-text-field>

            </div>

            <div class="col-12 col-md-6 inputContainer">

                <v-text-field solo label="Şifrə" v-model="userData.password" counter maxlength="20" :type="showPassword ? 'text' : 'password' " :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" :error-messages="passwordError"></v-text-field>

            </div>

            <div class="col-12 col-md-6 inputContainer">

                <v-text-field solo label="Şifrənin təkrarı" v-model="userData.confirmPassword"  :type="confirmShowPassword ? 'text' : 'password' " :append-icon="confirmShowPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="confirmShowPassword = !confirmShowPassword" :error-messages="confirmPasswordError"></v-text-field>

            </div>

            <div  class="col-12 mt-5 text-center">

                <v-btn class="col-12  submitButton py-4" depressed color="primary" @click="sendData">

                     <span v-show="buttonSpinnerIsActive" class="spinner-border loadingSpinner mr-2" role="status" aria-hidden="true"></span>  

                     Qeydİyyat                       

                </v-btn>


                <p v-show="formValidationHasError" class="col-auto mt-2 sendButtonErrorMessage"> Səhvləri Düzəldin ! </p>

                <router-link class="col-12 text-center mt-3 loginButton" to="/login"> Daxil ol </router-link>

            </div>



        </div>


        <div v-if="signUpIsSuccessfull" class="col-12 col-xl-8 col-lg-9  my-5  px-lg-5 emailConfirmDialogContainer">
            
            <div class="col-12 text-center">

                <div class="col-12 px-0 emailIcon"> <font-awesome-icon icon="fas fa-envelope" /> </div>

            </div>

            <div class="col-12 text-center emailConfirmationMsg">

                Xoş gəlmisiniz <span  class="font-weight-bold"> {{userData.name}} </span> , qeydiyyatınızı tamamlamaq üçün qeydiyyat zamanı yazdığınız email addresinizə göndərdiyimiz linkə daxil olun ! 
            </div>
            

        </div>


                <div class="text-center">

                        <v-snackbar v-model="snackbarOpened" :timeout="3000" color="red accent-2" :class="currentSnackbarType">
                            
                           {{ snackbarMessage }}

                            <template v-slot:action="{ attrs }">

                                <v-btn class="closeSnackbarBtn" color="blue" text v-bind="attrs" @click="snackbarOpened = false">
                                    Bağla
                                </v-btn>

                            </template>

                        </v-snackbar>

                </div>


</div>



</template>

<style scoped src="./SignUp.css"></style>

<script src="./SignUp.js"></script>