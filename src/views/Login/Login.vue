<template>
<div class="col-11 mx-auto pt-5 px-0 mainContainer">

        <div class="col-4 my-5  px-lg-5 formContainer">

            <div class="col-12 mb-5 title">
                
                <h1 class="col-12 text-center"> Giriş edin </h1>
                
            </div>
            
            <div class="col-12  mb-3 inputContainer">

                <v-text-field solo name="name" label="İstifadəçi adı , Telefon və ya Email" v-model="userData.username" autocomplete="on"></v-text-field>

            </div>

            <div class="col-12 inputContainer">

                <v-text-field solo label="Şifrə" v-model="userData.password" :type="showPassword ? 'text' : 'password' " :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" ></v-text-field>

            </div>
            <div class="col-12  form-bottom">

                <div class="col-6 my-3 pl-0 rememberMeContainer">

                        <v-checkbox hide-details class="mt-0 pt-0" label="Yadda saxla" v-model="userData.rememberMe">  </v-checkbox>
                </div>

                <div class="col-6 my-3  pr-0 forgotPassword">

                        <router-link to="/resetPassword">Şifrəni unutmusan ? </router-link>
                </div>

            </div>

            <div  class="col-12 mt-5 text-center">

                <v-btn class="col-12  submitButton py-4" depressed color="primary" @click="sendData" >

                     <span v-show="buttonSpinnerIsActive" class="spinner-border loadingSpinner mr-2" role="status" aria-hidden="true"></span>  

                    Daxil ol                        
                </v-btn>

                <router-link class="col-12 text-center mt-3 signUpButton" to="/signUp"> Qeydiyyat </router-link>

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

<style scoped src="./Login.css"></style>

<script src="./Login.js"></script>