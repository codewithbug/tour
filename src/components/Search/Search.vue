<template>

        
        <div class="col-11 col-lg-12 px-0 py-3 px-0 pb-lg-0 pt-5 pt-lg-0  pr-xl-2 pl-xl-3 px-lg-0 mx-auto mainContainer row no-gutters">

            <div class="closeSearchMenuButton" @click="closeMobileSearchPanel">
                <font-awesome-icon icon="fas fa-times" />
            </div>

            <div class="px-xl-2 px-lg-1 my-3 my-lg-2 mb-xl-2 searchInput countrySearchInput">

                 <v-autocomplete  v-model="searchData.country" :items="selectDataCountry" label="Ölkə" solo rounded flat hide-details clearable @input="loadCitiesByCountry" >
                    <font-awesome-icon :icon="['fas', 'globe']" slot="prepend-inner"/>
                 </v-autocomplete>

            </div>

            <div class="px-xl-2 px-lg-1 my-3 my-lg-2 mb-xl-2 searchInput">

                <v-autocomplete :disabled="searchData.country && searchData.country.length < 1" :items="selectDataCity" label="Şəhər" solo rounded flat hide-details clearable v-model="searchData.city">
                    <font-awesome-icon :icon="['fas', 'map-marker-alt']" slot="prepend-inner"/>
                </v-autocomplete>

            </div>

            <div class="px-xl-2 px-lg-1 my-lg-2 mb-xl-2 searchInput">


                <v-menu  :close-on-content-click="false" transition="scale-transition" min-width="auto" >
                    
                
                    <template v-slot:activator="{ on, attrs }">
                        

                    <v-text-field  readonly v-bind="attrs" v-on="on" solo rounded flat hide-details clearable label="Gediş" v-model="formatStartDate" @click:clear="resetSearchStartDate">
                        
                                                <font-awesome-icon :icon="['far', 'calendar-alt']" slot="prepend-inner"/>

                    </v-text-field>

                    </template>

                    
                    <v-date-picker show-adjacent-months  v-model="searchData.tourStartDate" >
                        

                     </v-date-picker>

                </v-menu>


            </div>

            <div class="px-xl-2 px-lg-1 my-lg-2 mb-xl-2 searchInput">


                <v-menu  :close-on-content-click="false" transition="scale-transition" min-width="auto" >
                
                    <template v-slot:activator="{ on, attrs }">

                    <v-text-field  readonly v-bind="attrs" v-on="on" solo rounded flat hide-details clearable label="Gəliş" v-model="formatEndDate" @click:clear="resetSearchEndDate">

                                                <font-awesome-icon :icon="['far', 'calendar-alt']" slot="prepend-inner"/>

                    </v-text-field>

                    </template>

                    
                    <v-date-picker show-adjacent-months  v-model="searchData.tourEndDate" > </v-date-picker>

                </v-menu>


            </div>

            <div class="px-xl-2 px-lg-1 my-3 my-lg-2 mb-xl-2 price searchInput">

                <v-text-field

                hide-details

                class="priceContainer customPlaceholder"
                solo
                rounded
                flat
                label="Qiymət (min) "
                v-model="searchData.minPrice"
                clearable
                >

                                                <font-awesome-icon :icon="['fas', 'coins']" slot="prepend-inner"/>

                </v-text-field>

            </div>

            <div class="px-xl-2 px-lg-1 my-3 my-lg-2 mb-xl-2 price searchInput">

                <v-text-field

                hide-details

                class="priceContainer customPlaceholder"
                solo
                rounded
                flat
                label="Qiymət (max) "
                v-model="searchData.maxPrice"
                clearable
                >

                                                <font-awesome-icon :icon="['fas', 'coins']" slot="prepend-inner"/>
                </v-text-field>

            </div>

            <div class=" px-xl-0 px-lg-0 my-lg-2 mb-xl-2 searchButton" @click="$emit(`onSearchButtonClick` , searchData)">

                <v-btn
                class="col-12 px-0"
                depressed
                rounded
                > Axtar </v-btn>

            </div>

        </div>

</template>

<style scoped src="./Search.css"></style>

<script src="./Search.js"></script>