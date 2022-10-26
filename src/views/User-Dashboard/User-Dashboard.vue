<template>

    <div class="col-12 mx-auto pt-5  mainContainer">

        <div class="col-12 px-0 row no-gutters">


            <!--      Sidebar      -->
            <div  class="col-3 sidebarContainerWeb">

                <div class="col-11 px-0 mx-auto sidebar">

                    <p class="col-12 mb-0 py-3 px-0 text-center" :class="{ active: activeTab == 'allTours'}" @click="activeTab  = 'allTours'"> Bütün Turlar </p>
                    <p class="col-12 mb-0 py-3 px-0 text-center" :class="{ active: activeTab == 'uploadedTours'}" @click="activeTab  = 'uploadedTours'"> Yüklədiyim Turlar </p>
                    
                    
                    <v-tooltip right>

                         <template v-slot:activator="{ on, attrs }">

                            <!-- <p v-bind="attrs" v-on="on" class="col-12 mb-0 py-3 px-0 text-center" :class="{ active: activeTab == 'reservedTours'}" @click="activeTab  = 'reservedTours'"> Gedəcəyim Turlar </p> -->
                            <p v-bind="attrs" v-on="on" class="col-12 mb-0 py-3 px-0 text-center" :class="{ active: activeTab == 'reservedTours'}" > Gedəcəyim Turlar </p>
                         
                         </template>
                         
                         <span> Tezliklə </span>
                    
                    </v-tooltip>
                    
                    <v-tooltip right>

                         <template v-slot:activator="{ on, attrs }">

                            <!-- <p v-bind="attrs" v-on="on" class="col-12 mb-0 py-3 px-0 text-center" :class="{ active: activeTab == 'completedTours'}" @click="activeTab  = 'completedTours'"> Getdiyim Turlar </p> -->
                            <p v-bind="attrs" v-on="on" class="col-12 mb-0 py-3 px-0 text-center" :class="{ active: activeTab == 'completedTours'}" > Getdiyim Turlar </p>
                         
                         </template>
                         
                         <span> Tezliklə </span>

                    </v-tooltip>
                    
                    <v-tooltip right>

                         <template v-slot:activator="{ on, attrs }">

                             <!-- <p v-bind="attrs" v-on="on" class="col-12 mb-0 py-3 px-0 text-center" :class="{ active: activeTab == 'expiredTours'}" @click="activeTab  = 'expiredTours'"> Vaxtı Bitmiş Turlar </p> -->
                             <p v-bind="attrs" v-on="on" class="col-12 mb-0 py-3 px-0 text-center" :class="{ active: activeTab == 'expiredTours'}" > Vaxtı Bitmiş Turlar </p>
                        
                        </template>

                        <span> Tezliklə </span>
                        
                    </v-tooltip>

                </div>

            </div>


            <!--      Sidebar Mobile      -->
            <div class="col-12 sidebarMobile">

                <v-tabs
                    background-color="indigo"
                    center-active
                    dark
                    
                    >

                    <v-tab>Bütün Turlar</v-tab>
                    <v-tab>Yüklədiyim Turlar</v-tab>
                    <v-tab>Gedəcəyim Turlar</v-tab>
                    <v-tab>Getdiyim Turlar</v-tab>
                    <v-tab> Vaxtı Bitmiş Turlar</v-tab>

                </v-tabs>

            </div>


            <!--      Right Section      -->
            <div class="col-12 col-lg-8 offset-lg-4 rightSection">



                <!--      User Balance Section -->

                <!-- <div class="col-12 px-0 userBalanceContainer">

                    <p class="col-auto px-0 userBalance my-5"> Balans : 15 <span class="manatSymbol"> ₼ </span> </p>

                    <button class="col-auto py-2  ml-3 increaseBalanceButton"> Balansı artır </button>


                </div> -->



                <!--      Search Section      -->
                <div class="col-12 row no-gutters justify-content-end py-4 px-lg-3 px-xl-5  mb-5 searchSection">

                    <div  class="col-6 col-lg-4 px-2 my-3 searchInput">

                        <v-text-field

                        hide-details

                        class="customPlaceholder"
                        solo
                        rounded
                        flat
                        clearable
                        label="Tur kodu"
                        
                        v-model="searchData.id"
                        
                        ></v-text-field>
                    </div>

                    <div  class="col-6 col-lg-4 px-2 my-3 searchInput">


                         <v-autocomplete v-model="searchData.country" :items="selectDataCountry" label="Ölkə" solo rounded flat clearable hide-details @input="loadCitiesByCountry" ></v-autocomplete>
                    </div>

                    <div  class="col-6 col-lg-4 px-2 my-3 searchInput">


                         <v-autocomplete :disabled="searchData.country.length < 1" :items="selectDataCity" label="Gediləcək şəhər" solo rounded flat clearable hide-details  v-model="searchData.city"></v-autocomplete>


                    </div>

                    <div  class="col-6 col-lg-4 px-2 my-3 searchInput">

                        <v-text-field

                        hide-details

                        class="priceContainer customPlaceholder"
                        solo
                        rounded
                        flat
                        clearable
                        label="Qiymət (min)"
                        suffix="₼"

                        v-model="searchData.minPrice"
                        
                        ></v-text-field>
                    </div>

                    <div  class="col-6 col-lg-4 px-2 my-3 searchInput">

                        <v-text-field

                        hide-details

                        class="priceContainer customPlaceholder"
                        solo
                        rounded
                        flat
                        clearable
                        label="Qiymət (max)"
                        suffix="₼"

                        v-model="searchData.maxPrice"
                        
                        ></v-text-field>
                    </div>

                    <div  class="col-6 col-lg-4 px-2 my-3 searchInput">

                        <v-menu  :close-on-content-click="false" transition="scale-transition" min-width="auto">
                        
                            <template v-slot:activator="{ on, attrs }">

                            <v-text-field  readonly v-bind="attrs" v-on="on" solo rounded flat clearable hide-details label="Tarix (gediş)" v-model="formatStartDate" @click:clear="resetSearchStartDate"></v-text-field>

                            </template>

                            
                            <v-date-picker show-adjacent-months v-model="searchData.startDate" > </v-date-picker>

                        </v-menu>


                    </div>

                    <div  class="col-6 col-lg-4 px-2 my-3 searchInput">

                        <!-- <v-text-field

                        hide-details

                        class="customPlaceholder"
                        solo
                        rounded
                        flat
                        label="Tarix (dönüş)"
                        
                        ></v-text-field> -->


                        <v-menu  :close-on-content-click="false" transition="scale-transition" min-width="auto">
                        
                            <template v-slot:activator="{ on, attrs }">

                            <v-text-field  readonly v-bind="attrs" v-on="on" solo rounded flat clearable hide-details label="Tarix (dönüş)" v-model="formatEndDate" @click:clear="resetSearchEndDate">></v-text-field>

                            </template>

                            
                            <v-date-picker show-adjacent-months v-model="searchData.endDate" > </v-date-picker>

                        </v-menu>


                    </div>

                    <div  class="col-6 col-lg-4 px-2 my-3 searchInput">

                        <!-- <v-text-field

                        hide-details

                        class="customPlaceholder"
                        solo
                        rounded
                        flat
                        label="Tur növü"
                        
                        ></v-text-field> -->

                        <v-select  solo rounded flat hide-details  label="Tur növü" v-model="searchData.type" :items="['Adi','VIP']"></v-select>


                    </div>

                    <div class="col-4 col-lg-4 px-2 my-3 searchButton">

                        <v-btn
                        class="col-12 px-0"
                        depressed
                        rounded
                        @click="onSearch"
                        > Axtar </v-btn>

                    </div>

                </div>


                <!--      Card Section      -->
                <div class="col-12 mt-5 pt-5 px-0 row no-gutters justify-content-between cardSection">

                    <div class="loadingOverlay" v-show="loadingSpinnerIsActive">

                        <div class="spinner-border text-success" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>

                    </div>

                        <h1 v-show="userTours.length < 1" class="col-12 text-center"> Tur tapılmadı ! </h1>

                    <div class="mb-5 cardContainer" v-for="tour in userTours" :key="tour.id">
                        <a :href="base + 'details/' + tour.id"  >
                            <Card v-bind="tour"/>
                        </a>

                        <a class="col-12 px-0 text-center py-3 editButton" :href="base + 'edit/' + tour.id"> Redaktə et </a>
                    </div>

                </div>

            </div>
        </div>




        <!--      Infinite Scroll      -->

        <infinite-loading v-if="userTours.length > 0" @infinite="infiniteHandler"></infinite-loading>




    </div>

</template>

<style scoped src="./User-Dashboard.css"></style>

<script src="./User-Dashboard.js"></script>