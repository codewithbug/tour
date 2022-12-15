<template>

<div class="col-11 mx-auto pt-5 px-0 mainContainer">

    <div class="col-12 my-5 px-0 titleContainer">

        <h1 class="col-12 pl-2 ">Tur əlavə  et</h1>
    
    </div>

    <div class="col-12 mb-3 px-0 rowContainer">

        <v-text-field  class="col-12 col-lg-3 px-2" solo name="name" label="Tur adı" v-model="tourData.tourTitle" :error-messages="tourTitleError"></v-text-field>

        <v-text-field  class="col-12 col-lg-3 px-2 priceContainer" solo name="name" label="Tur qiyməti" v-model="tourData.tourPrice" suffix="₼" :error-messages="tourPriceError"></v-text-field>
        
        <v-menu  :close-on-content-click="false" transition="scale-transition" min-width="auto">
          
            <template v-slot:activator="{ on, attrs }">

            <v-text-field  class="col-12 col-lg-3 px-2" readonly v-bind="attrs" v-on="on" solo  label="Tur tarixi" v-model="tourData.tourStartDate" :error-messages="tourStartDateError"></v-text-field>

            </template>

            
            <v-date-picker show-adjacent-months v-model="tourData.tourStartDate" > </v-date-picker>

        </v-menu>
        
        <v-menu  :close-on-content-click="false" transition="scale-transition" min-width="auto">
          
            <template v-slot:activator="{ on, attrs }">

            <v-text-field  class="col-12 col-lg-3 px-2" readonly v-bind="attrs" v-on="on" solo label="Tur saatı" v-model="tourData.tourStartHour" :error-messages="tourStartHourError"></v-text-field>

            </template>

            
            <v-time-picker v-model="tourData.tourStartHour"   format="24hr" scrollable> </v-time-picker>
            
        </v-menu>

    </div>

    <div class="col-12 mb-3 px-0 rowContainer">

        <v-menu  :close-on-content-click="false" transition="scale-transition" min-width="auto">
          
            <template v-slot:activator="{ on, attrs }">

            <v-text-field  class="col-12 col-lg-3 px-2" readonly v-bind="attrs" v-on="on" solo label="Geri dönüş tarixi" v-model="tourData.tourEndDate" :error-messages="tourEndDateError"></v-text-field>

            </template>

            
            <v-date-picker show-adjacent-months v-model="tourData.tourEndDate" > </v-date-picker>

        </v-menu>

        <v-autocomplete class="col-12 col-lg-3 px-2" v-model="tourData.tourCountry" :items="selectDataCountry" label="Gediləcək ölkə" solo name="name" @input="loadCitiesByCountry" ></v-autocomplete>
       
        <v-autocomplete class="col-12 col-lg-3 px-2" :disabled="tourData.tourCountry.length < 1" :items="selectDataCity" label="Gediləcək şəhər" solo name="name" v-model="tourData.tourCity"></v-autocomplete>
        
        <v-text-field  class="col-12 col-lg-3 px-2" solo name="name" label="Tur şirkəti" hint="Əgər mövcuddursa" persistent-hint v-model="tourData.tourCompany" > </v-text-field>

    </div>

    <div class="col-12 px-0 rowContainer">

        <v-text-field  class="col-12 col-lg-3 px-2" solo name="name" label="Ofis ünvanı" hint="Əgər mövcuddursa" persistent-hint v-model="tourData.officeAddress"></v-text-field>

        <div class="col-12 col-lg-3 px-2 mb-4 row align-items-start no-gutters">

            <vue-tel-input class="col-4 col-lg-5 col-xl-3 px-0 py-2" name="name" v-model="tourData.countryCode" :input-options="{showDialCode:true}" :dropdown-options="{showSearchBox:true , showFlags:true , showDialCodeInSelection:true , showDialCodeInList:true , width:'390px'}"></vue-tel-input>
            
            <v-text-field  hide-details="auto"  class="col-8 col-lg-7 col-xl-9 pl-2"  solo name="name" label="Telefon"  v-model="tourData.phoneNumber" :error-messages="phoneNumberError"></v-text-field>

        </div>

        <v-text-field  class="col-12 col-lg-3 px-2" solo name="name" label="Email" v-model="tourData.email" :error-messages="emailError"></v-text-field>

        <v-text-field  class="col-12 col-lg-3 px-2" solo name="name" label="Vebsayt" hint="Əgər mövcuddursa" persistent-hint v-model="tourData.website"></v-text-field>


    </div>

    <div class="col-12 mb-3 px-0 rowContainer">

        <v-text-field  class="col-12 col-lg-3 px-2" solo name="name" label="İnstagram" hint="Əgər mövcuddursa" persistent-hint v-model="tourData.instagram"></v-text-field>
        <v-text-field  class="col-12 col-lg-3 px-2" solo name="name" label="Facebook" hint="Əgər mövcuddursa" persistent-hint v-model="tourData.facebook"></v-text-field>
        <v-text-field  class="col-12 col-lg-3 px-2" solo name="name" label="Youtube" hint="Əgər mövcuddursa" persistent-hint v-model="tourData.youtube"></v-text-field>
        <v-text-field  class="col-12 col-lg-3 px-2" solo name="name" label="Whatsapp nömrəsi" v-model="tourData.whatsappNumber"></v-text-field>

    </div>

    <div class="col-12 mb-3 px-0 rowContainer">

        <div class="col-12 col-xl-6 px-2 descriptionContainer">
            
            <v-textarea class="col-12 col-xl-10 px-0" solo name="name" label="Tur haqqında məlumat" v-model="tourData.tourDescription" :error-messages="tourDescriptionError"></v-textarea>
            
        </div>

        <!--      Image Upload Section      -->

        <div class="col-12  col-xl-6 px-0 mt-5 mt-lg-0 imageContainer">

                <!--      hidden input for uploading imgs      -->
            <input type="file" id="imgInput" ref="imgInput" @input="getPreview" multiple>

            <!--      Add More Image Button      -->

            <div class="col-12 text-center mb-5 addImageButtonContainer" v-if="uploadedImagesAsBinary.length > 0">

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

            <div class="col-12 text-center" v-show="uploadedImagesAsBinary.length < 1">


                <button class="col-auto px-4 py-3 imgUpload" @click="onUploadButtonClick"> 
                    
                    <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" />  <span class="ml-2" > Şəkil yüklə </span> 
                    
                </button> 


            </div>
            
        </div>

        <div class="col-12 pl-0 mb-5 pb-5 featuresContainer">

            <h1 class="col-12  mb-5"> Tur özəllikləri: </h1>

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

            <div class="col-auto mb-3 feature">

                  <v-checkbox  label="Parkinq" v-model="tourData['features[]']['Parkinq']">  </v-checkbox>

            </div>


        </div>


        <!--      Travel Planning Section      -->

    <div class="col-12 mb-3 mt-5  rowContainer travelPlanContainer">


        <div class="col-12 col-lg-4 px-0 mb-5">

            <div class="col-12 mb-5 travelPlanSectionTitle px-0">

                <h1 class="col-auto pl-0"> Tur planlaşdırma   </h1>

                <p class="col-auto pl-0 mb-0"> ( İstəyə bağlı ) </p>

            </div>



            <v-text-field  class="col-12  pr-2" solo name="name" label="Plan detalı" v-model="travelPlanData.planDetail" ></v-text-field>

            
            <v-menu  :close-on-content-click="false" transition="scale-transition" min-width="auto">
            
                <template v-slot:activator="{ on, attrs }">

                <v-text-field  class="col-12  pr-2" readonly v-bind="attrs" v-on="on" solo  label="Plan tarixi" v-model="travelPlanData.planDate" ></v-text-field>

                </template>

                
                <v-date-picker show-adjacent-months v-model="travelPlanData.planDate" > </v-date-picker>

            </v-menu>
            
            <v-menu  :close-on-content-click="false" transition="scale-transition" min-width="auto">
            
                <template v-slot:activator="{ on, attrs }">

                <v-text-field  class="col-12  pr-2" readonly v-bind="attrs" v-on="on" solo label="Plan saatı" v-model="travelPlanData.planHour" ></v-text-field>

                </template>

                
                <v-time-picker v-model="travelPlanData.planHour"   format="24hr" scrollable> </v-time-picker>
                
            </v-menu>

            <button  class="col-12  px-2 py-2 addTimelineButton" @click="addTravelPlan">  + Əlavə et </button>

        </div>

        <div class="col-12 col-lg-7 offset-lg-1 py-5 timelineContainer">

            <v-timeline  class="col-12" v-show="tourData.travelPlans && tourData.travelPlans.length > 0">
                

                <v-timeline-item small class="col-12" v-for="(plan , index) in tourData.travelPlans" :key="index"> 

                    <div class="col-12 row no-gutters flex-nowrap px-0">


                        <p class="col-auto px-2 py-2" >

                            <font-awesome-icon class="col-12 px-0 removeTimelineItemIcon"  icon="times" @click="removeTravelPlan(index)"></font-awesome-icon>
                        
                        </p>

                        <div class="col-auto  text-break">

                            <p class="col-auto px-0 mb-0 planDetailContainer">  {{ plan.planDetail }}  </p>                  

                            <p class="col-auto px-0  mt-4 planDateContainer"> {{ plan.planDate }} {{ plan.planHour }} </p>

                        </div>



                    </div>

                </v-timeline-item>


            </v-timeline>


        </div>

    </div>



            

        <!--      Submit Tour Button      -->

        <div class="col-12 my-5 pt-5 text-center text-lg-right">

            <v-divider></v-divider>

            <button class="col-auto mt-5 px-5 py-2 uploadButton" @click="sendData"> 
                
                 <span v-show="buttonSpinnerIsActive" class="spinner-border loadingSpinner " role="status" aria-hidden="true"></span>  
                 
                 Tur yüklə
                 
            </button>

            <p v-show="formValidationHasError" class="col-auto mt-2 sendButtonErrorMessage"> Səhvləri Düzəldin ! </p>

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

<style scoped src="./Upload.css"></style>

<script src="./Upload.js"></script>