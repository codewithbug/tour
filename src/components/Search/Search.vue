<template>

        
        <div class="col-11 col-lg-9 px-0 py-3 px-3 pb-lg-3 pt-5 pt-lg-3  px-xl-3 px-lg-5 mx-auto mainContainer row no-gutters">

            <div class="closeSearchMenuButton" @click="closeMobileSearchPanel">
                <font-awesome-icon icon="fas fa-times" />
            </div>

            <div class="col-12 col-lg-4 px-xl-2 px-lg-1 my-3 my-lg-2 mb-xl-3 searchInput">

                 <v-autocomplete v-model="searchData.country" :items="selectDataCountry" label="Ölkə" solo rounded flat hide-details clearable @input="loadCitiesByCountry" ></v-autocomplete>

            </div>

            <div class="col-12 col-lg-4 px-xl-2 px-lg-1 my-3 my-lg-2 mb-xl-3 searchInput">

                <v-autocomplete :disabled="searchData.country && searchData.country.length < 1" :items="selectDataCity" label="Gediləcək şəhər" solo rounded flat hide-details clearable v-model="searchData.city"></v-autocomplete>

            </div>

            <div class="col-12 col-lg-4 px-xl-2 px-lg-1 my-lg-2 mb-xl-3 searchInput">


                <v-menu  :close-on-content-click="false" transition="scale-transition" min-width="auto" >
                
                    <template v-slot:activator="{ on, attrs }">

                    <v-text-field  readonly v-bind="attrs" v-on="on" solo rounded flat hide-details clearable label="Tarix (gediş-gəliş)" v-model="formatRangedDate" @click:clear="resetSearchDate">

                    </v-text-field>

                    </template>

                    
                    <v-date-picker show-adjacent-months range v-model="searchData.tourDate" > </v-date-picker>

                </v-menu>


            </div>

            <div class="col-12 col-lg-4 px-xl-2 px-lg-1 my-3 my-lg-2 mb-xl-3 price searchInput">

                <v-text-field

                hide-details

                class="priceContainer customPlaceholder"
                solo
                rounded
                flat
                label="Qiymət (min) "
                suffix="₼"
                v-model="searchData.minPrice"
                clearable
                ></v-text-field>

            </div>

            <div class="col-12 col-lg-4 px-xl-2 px-lg-1 my-3 my-lg-2 mb-xl-3 price searchInput">

                <v-text-field

                hide-details

                class="priceContainer customPlaceholder"
                solo
                rounded
                flat
                label="Qiymət (max) "
                suffix="₼"
                v-model="searchData.maxPrice"
                clearable
                ></v-text-field>

            </div>

            <div class="col-lg-4 px-xl-2 px-lg-1 my-lg-2 mb-xl-3 searchButton" @click="$emit(`onSearchButtonClick` , searchData)">

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