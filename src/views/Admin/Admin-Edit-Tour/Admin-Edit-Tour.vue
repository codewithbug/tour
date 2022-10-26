<template>

<div class="col-11 mx-auto pt-5 px-0 mainContainer">

    <div class="col-12 my-5 px-0 titleContainer">

        <h1 class="col-12 pl-2 ">Turu Redaktə  et</h1>
    
    </div>

    <div class="col-12 mb-3 px-0 rowContainer">

        <v-text-field  class="col-12 col-lg-3 px-2" solo label="Tur adı" v-model="tourData.name" :error-messages="tourTitleError"></v-text-field>

        <v-text-field  class="col-12 col-lg-3 px-2 priceContainer" solo label="Tur qiyməti" v-model="tourData.price" suffix="₼" :error-messages="tourPriceError"></v-text-field>
        
        <v-menu  :close-on-content-click="false" transition="scale-transition" min-width="auto">
          
            <template v-slot:activator="{ on, attrs }">

            <v-text-field  class="col-12 col-lg-3 px-2" readonly v-bind="attrs" v-on="on" solo label="Tur tarixi" v-model="formatTourStartDate" :error-messages="tourStartDateError"></v-text-field>

            </template>

            
            <v-date-picker show-adjacent-months v-model="tourData.tourStartDate" > </v-date-picker>

        </v-menu>
        
        <v-menu  :close-on-content-click="false" transition="scale-transition" min-width="auto">
          
            <template v-slot:activator="{ on, attrs }">

            <v-text-field  class="col-12 col-lg-3 px-2" readonly v-bind="attrs" v-on="on" solo label="Tur saatı" v-model="formatStartHour" :error-messages="tourStartHourError"></v-text-field>

            </template>

            
            <v-time-picker v-model="tourData.tourStartHour"   format="24hr" scrollable> </v-time-picker>
            
        </v-menu>

    </div>

    <div class="col-12 mb-3 px-0 rowContainer">

        <v-menu  :close-on-content-click="false" transition="scale-transition" min-width="auto">
          
            <template v-slot:activator="{ on, attrs }">

            <v-text-field  class="col-12 col-lg-3 px-2" readonly v-bind="attrs" v-on="on" solo label="Geri dönüş tarixi" v-model="formatTourEndDate" :error-messages="tourEndDateError"></v-text-field>

            </template>

            
            <v-date-picker show-adjacent-months v-model="tourData.tourEndDate" > </v-date-picker>

        </v-menu>

        <v-autocomplete class="col-12 col-lg-3 px-2" v-model="tourData.country" :items="selectDataCountry" label="Gediləcək ölkə" solo @input="loadCitiesByCountry" ></v-autocomplete>
       
        <v-autocomplete class="col-12 col-lg-3 px-2" :disabled="tourData.country.length < 1" :items="selectDataCity" label="Gediləcək şəhər" solo v-model="tourData.city"></v-autocomplete>
        
        <v-text-field  class="col-12 col-lg-3 px-2" solo label="Tur şirkəti" hint="Əgər mövcuddursa" persistent-hint v-model="tourData.company" > </v-text-field>

    </div>

    <div class="col-12 px-0 rowContainer">

        <v-text-field  class="col-12 col-lg-3 px-2" solo label="Ofis ünvanı" hint="Əgər mövcuddursa" persistent-hint v-model="tourData.officeAddress"></v-text-field>

        <div class="col-12 col-lg-3 px-2 mb-4 row align-items-start no-gutters">

            <vue-tel-input class="col-4 col-lg-5 col-xl-3 px-0 py-2" @country-changed="telChanged" v-model="tourData.countryCode" :autoDefaultCountry="false" :input-options="{showDialCode:true}" :dropdown-options="{showSearchBox:true , showFlags:true , showDialCodeInSelection:true , showDialCodeInList:true , width:'390px'}"></vue-tel-input>
           
            <v-text-field  hide-details="auto"  class="col-8 col-lg-7 col-xl-9 pl-2"  solo label="Telefon"  v-model="tourData.phoneNumber" :error-messages="phoneNumberError"></v-text-field>

        </div>

        <v-text-field  class="col-12 col-lg-3 px-2" solo label="Email" v-model="tourData.email" :error-messages="emailError"></v-text-field>

        <v-text-field  class="col-12 col-lg-3 px-2" solo label="Vebsayt" hint="Əgər mövcuddursa" persistent-hint v-model="tourData.website"></v-text-field>


    </div>

    <div class="col-12 mb-3 px-0 rowContainer">

        <v-text-field  class="col-12 col-lg-3 px-2" solo label="İnstagram" hint="Əgər mövcuddursa" persistent-hint v-model="tourData.instagram"></v-text-field>
        <v-text-field  class="col-12 col-lg-3 px-2" solo label="Facebook" hint="Əgər mövcuddursa" persistent-hint v-model="tourData.facebook"></v-text-field>
        <v-text-field  class="col-12 col-lg-3 px-2" solo label="Youtube" hint="Əgər mövcuddursa" persistent-hint v-model="tourData.youtube"></v-text-field>
        <v-text-field  class="col-12 col-lg-3 px-2" solo label="Whatsapp nömrəsi" v-model="tourData.whatsappNumber"></v-text-field>

    </div>

    <div class="col-12 mb-3 px-0 rowContainer">

        <div class="col-12 col-xl-6 px-2 descriptionContainer">
            
            <v-textarea class="col-12 col-xl-10 px-0" solo label="Tur haqqında məlumat" v-model="tourData.description" :error-messages="tourDescriptionError"></v-textarea>
            
        </div>

        <!--      Image Upload Section      -->

        <div class="col-12  col-xl-6 px-0 mt-5 mt-lg-0 imageContainer">

                <!--      hidden input for uploading imgs      -->
            <input type="file" id="imgInput" ref="imgInput" @input="getPreview" multiple>

            <!--      Add More Image Button      -->

            <div class="col-12 text-center mb-5 addImageButtonContainer" v-if="uploadedImages.length > 0">

                <v-btn  class="mx-2 addImageButton" fab dark color="indigo" @click="onUploadButtonClick">

                    <v-icon dark>
                        mdi-plus
                    </v-icon>
                
                </v-btn>

            </div>


            <div class="col-12 px-0 mb-5 thumbnails">

                <div class="col-6  col-lg-3 mb-3 thumbContainer" v-for="(images , index) in uploadedImages" :key="images.id">

                    <img :src="images.image" @click="makeMainImage(index)" class="col-12 px-0">

                    <!--      delete button      -->
                    <button class="deleteButton" @click="deleteImage(index)">
                            <font-awesome-icon icon="times"></font-awesome-icon>                        
                    </button>

                    <!------      main image icon (done icon)      -->
                    <v-btn class="mx-2 mainImageIcon" @click="makeMainImage(index)" :class="[ (mainImgIndex==index) ? 'isMainImage' : '']" small fab dark>

                        <v-icon  dark>
                            mdi-check
                        </v-icon>
                            
                    </v-btn>

                </div>



            </div>



            <!--      Upload Image Button      -->

            <div class="col-12 text-center" v-show="uploadedImages.length < 1">


                <button class="col-auto px-4 py-3 imgUpload" @click="onUploadButtonClick"> 
                    
                    <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" />  <span class="ml-2" > Şəkil yüklə </span> 
                    
                </button> 


            </div>
            
        </div>

        <div class="col-12  featuresContainer">

            <h1 class="col-12 text-center mb-5"> Tur özəllikləri: </h1>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Nəqliyyat" v-model="tourData['features[]']['Nəqliyyat']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Wifi" v-model="tourData['features[]']['Wifi']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Hovuz" v-model="tourData['features[]']['Hovuz']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Kondisioner" v-model="tourData['features[]']['Kondisioner']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Səhər yeməyi" v-model="tourData['features[]']['Səhər yeməyi']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Nahar" v-model="tourData['features[]']['Nahar']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Şam yeməyi" v-model="tourData['features[]']['Şam yeməyi']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Restoran" v-model="tourData['features[]']['Restoran']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Spa" v-model="tourData['features[]']['Spa']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Fitness mərkəzi" v-model="tourData['features[]']['Fitness mərkəzi']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Çimərlik" v-model="tourData['features[]']['Çimərlik']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Kabel TV" v-model="tourData['features[]']['Kabel TV']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Duş kabinəsi" v-model="tourData['features[]']['Duş kabinəsi']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Kombi" v-model="tourData['features[]']['Kombi']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Mətbəx" v-model="tourData['features[]']['Mətbəx']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Fotoqraf" v-model="tourData['features[]']['Fotoqraf']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox label="Bələdçi" v-model="tourData['features[]']['Bələdçi']">  </v-checkbox>

            </div>

            <div class="col-6 col-lg-2 mb-3 feature">

                  <v-checkbox  label="Parkinq" v-model="tourData['features[]']['Parkinq']">  </v-checkbox>

            </div>


        </div>

        <!--      Submit Tour Button      -->

        <div class="col-12 my-5 pt-5 text-center text-lg-right">

            <v-divider></v-divider>

            <button class="col-auto mt-5 px-5 py-2 mr-3 deleteTourButton" @click.stop="activateDeleteConfirmationDialog()"> Sil </button>

            <button class="col-auto mt-5 px-3 px-lg-5 py-2 mr-3 uploadButton" @click="sendData">
            
                <span v-show="saveButtonSpinnerIsActive" class="spinner-border mr-1 loadingSpinner " role="status" aria-hidden="true"></span>  

                Yadda Saxla
            
             </button>

            <button v-if="tourData.status != 'publish' " class="col-auto mt-5 px-5 py-2 mr-3 publishTourButton" @click="publishTour()"> 

                <span v-show="publishButtonSpinnerIsActive" class="spinner-border mr-1 loadingSpinner " role="status" aria-hidden="true"></span>  
                
                Yayımla 
                
            </button>

            <p v-show="formValidationHasError" class="col-auto mt-2 saveButtonErrorMessage"> Səhvləri Düzəldin ! </p>


        </div>


    </div>




    <!------  Delete Dialog  ------>

    <v-dialog v-model="deleteConfirmationDialogIsActive" class="px-0" max-width="500">


      <v-card>

        <v-card-title class="col-12 mb-3 deleteDialogTitle">

          Silinsin ?
          
        </v-card-title>

        <v-card-text class="col-12 deleteDialogText">
          "{{ tourData.name }}" - adlı tur silinəcək !
        </v-card-text>

        <v-card-actions>
            
          <v-spacer></v-spacer>

          <v-btn class="col-auto px-3 py-3 mr-3 cancelDeleteButton" text @click="deactivateDeleteConfirmationDialog()">
            Xeyr
          </v-btn>

          <v-btn class="col-auto px-3 py-3 confirmDeleteButton" text @click="deleteTour()">

            <span v-show="deleteButtonSpinnerIsActive" class="spinner-border mr-1 loadingSpinner " role="status" aria-hidden="true"></span>  
            
            Bəli

          </v-btn>

        </v-card-actions>

      </v-card>

    </v-dialog>




    <!------  Delete Response Dialog  ------>

    <v-dialog v-model="deleteResponseDialogIsActive" class="px-0" max-width="500">


      <v-card>

        <v-card-text class="col-12 py-5 deleteResponseDialogText">
           {{ deleteResponseMessage }}
        </v-card-text>


      </v-card>

    </v-dialog>



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

<style scoped src="./Admin-Edit-Tour.css"></style>

<script src="./Admin-Edit-Tour.js"></script>