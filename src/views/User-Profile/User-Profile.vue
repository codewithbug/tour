<template>
    <div class="col-12 mx-auto pt-5  mainContainer">

        <div class="col-12 px-0 row no-gutters">


            <!--      Sidebar      -->
            <div  class="col-3 sidebarContainerWeb">

                <div class="col-11 px-0 mx-auto sidebar">

                    <p class="col-12 mb-0 py-3 px-0 text-center" :class="{active : currentSection == 'personalInfo'}" @click="changeSection('personalInfo')"> Şəxsi Məlumatlar </p>
                    <p class="col-12 mb-0 py-3 px-0 text-center" :class="{active : currentSection == 'passwordSection'}"  @click="changeSection('passwordSection')"> Şifrəni dəyiş </p>

                </div>

            </div>


            <!--      Sidebar Mobile      -->
            <div class="col-12 sidebarMobile">

                <v-tabs
                    background-color="indigo"
                    center-active
                    dark
                    
                    >

                    <v-tab @click="changeSection('personalInfo')">Şəxsi Məlumatlar</v-tab>
                    <v-tab @click="changeSection('passwordSection')">Şifrəni dəyiş</v-tab>

                </v-tabs>

            </div>


            <!--      Right Section      -->
            <div class="col-12 col-lg-9 offset-lg-3 px-lg-5   rightSection">


                <!--      Personal Info      -->
                <div  v-show="currentSection == 'personalInfo'"  class="col-12 col-lg-11 mx-auto row no-gutters py-5 pr-lg-5 personalInfo">

                    <div class="col-12 col-lg-4 text-center">

                        <input class="profileImgInput" type="file" ref="imgInput" @input="getPreview">

                        <div v-if="profilePicture" class="mx-auto profileImage" :style="{backgroundImage : 'url(' +  profilePicture + ')' }"></div>
                        
                        <div v-else-if="profileData.profileImage" class="mx-auto profileImage" :style="{backgroundImage : 'url(' + api + 'images/' + profileData.profileImage + ')' }"></div>

                        <div v-else-if="!profileData.profileImage" class="mx-auto profileImage" :style="{backgroundImage : 'url(' + require('../../assets/images/default-profile.png') + ')' }"></div>
                        
                        <button class="col-8 col-xl-5 text-center mt-5 py-2 changeProfileImageBtn" @click="onChangeProfileImgButtonClick">Dəyişdir </button>
                    </div>

                    <div class="col-12 col-lg-8 mt-5 mt-lg-0 row no-gutters infoInputContainer">

                        <div class="col-12  col-lg-6 px-4 mb-3 mb-xl-5 ">

                            <v-text-field

                            hide-details

                            class="customPlaceholder"
                            solo
                            flat
                            label="Ad"
                            v-model="profileData.name"
                            ></v-text-field>

                        </div>

                        <div class="col-12 col-lg-6 px-4 mb-3 mb-xl-5 ">

                            <v-text-field

                            hide-details

                            class="customPlaceholder"
                            solo
                            flat
                            label="Soyad"
                            v-model="profileData.surname"
                            ></v-text-field>

                        </div>

                        <div class="col-12 col-lg-6 px-4 mb-3 mb-xl-5 ">

                            <v-text-field

                            hide-details

                            class="customPlaceholder"
                            solo
                            flat
                            label="Telefon"
                            v-model="profileData.phone"
                            ></v-text-field>

                        </div>

                        <div class="col-12 col-lg-6 px-4 mb-3 mb-xl-5 ">

                            <v-text-field

                            hide-details

                            class="customPlaceholder"
                            solo
                            flat
                            label="Ünvan"
                            v-model="profileData.address"
                            ></v-text-field>

                        </div>

                    </div>

                    <div class="col-12 pr-4 text-center text-lg-right" @click="changePersonalInfo">

                        <button class="col-auto px-4 py-2 saveButton">

                             <span v-show="buttonSpinnerIsActive" class="spinner-border loadingSpinner " role="status" aria-hidden="true"></span>  

                             Yadda saxla
                             
                         </button>
                    
                    </div>

                </div>


                <!--      Change Password      -->
                <div v-show="currentSection == 'passwordSection'" class="col-12 col-lg-8 mx-auto row no-gutters py-5  passwordSection">


                    <div class="col-12 col-lg-6 text-center mx-auto mt-5 row no-gutters infoInputContainer">



                        <div class="col-12 px-4 mb-3 ">

                            <v-text-field



                            class="customPlaceholder"
                            solo
                            flat
                            label="Hazırki şifrə"
                            v-model="passwordData.currentPassword"
                            :type="showCurrentPassword ? 'text' : 'password' " 
                            :append-icon="showCurrentPassword ? 'mdi-eye' : 'mdi-eye-off'" 
                            @click:append="showCurrentPassword = !showCurrentPassword"
                            :error-messages="currentPasswordError"
                            ></v-text-field>

                        </div>

                        <div class="col-12 px-4 mb-3 ">

                            <v-text-field



                            class="customPlaceholder"
                            solo
                            flat
                            label="Yeni şifrə"
                            v-model="passwordData.newPassword"
                            :type="showNewPassword ? 'text' : 'password' " 
                            :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'" 
                            @click:append="showNewPassword = !showNewPassword"
                            :error-messages="passwordError"
                            
                            ></v-text-field>

                        </div>

                        <div class="col-12 px-4 mb-5 ">

                            <v-text-field



                            class="customPlaceholder"
                            solo
                            flat
                            label="Şifrənin təsdiqi"
                            v-model="passwordData.newPasswordConfirm"
                            :type="showNewPasswordConfirm ? 'text' : 'password' " 
                            :append-icon="showNewPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'" 
                            @click:append="showNewPasswordConfirm = !showNewPasswordConfirm"
                            :error-messages="newPasswordConfirmError"
                            ></v-text-field>

                        </div>

                    </div>

                    <div class="col-12 mb-5 text-center" @click="changePassword">

                    

                        <button class="col-auto px-4 py-2 saveButton">
                            
                             <span v-show="buttonSpinnerIsActive" class="spinner-border loadingSpinner " role="status" aria-hidden="true"></span>   Yadda saxla
                             
                        </button>

                    </div>

                </div>


            </div>

        </div>

                    <!--      Snackbar Container      -->
                <div class="text-center">

                        <v-snackbar v-model="snackbarOpened" :timeout="2000" color="red accent-2" :class="currentSnackbarType">
                            
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


<style scoped src="./User-Profile.css"></style>

<script src="./User-Profile.js"></script>