import Card from "@/components/Card/Card.vue"


const API = process.env.VUE_APP_APIURL;

const BASE = process.env.VUE_APP_BASEURL

import { debounce } from "debounce";

import axios from 'axios';


export default {

    name : "userDashboard",

    data :function(){

        return {

            userId : "",


            start : 0,
            limit : 20,

            searchStart : 0,
            searchLimit : 20,

            base:BASE,
            
            selectDataCountry:[],
            selectDataCity:[],

            activeTab : "allTours",

            loadingSpinnerIsActive: false,

            monthNames : {
                1:"Yanvar",
                2:"Fevral",
                3:"Mart",
                4:"Aprel",
                5:"May",
                6:"İyun",
                7:"İyul",
                8:"Avqust",
                9:"Sentyabr",
                10:"Oktyabr",
                11:"Noyabr",
                12:"Dekabr"
            },

            searchData : {

                id:"",
                type:"",
                country : "",
                city:"",
                startDate : "",
                endDate : "",
                minPrice : "",
                maxPrice : ""

        },


            userTours : []


    }

},

    methods : {

        getUserId : function(){
            this.userId = this.$route.params.userId;
        },

        resetSearchStartDate : function(){

            this.searchData.startDate = ""
        },

        resetSearchEndDate : function(){


            this.searchData.endDate = ""
        },

        activateLoadingSpinner : function(){

            this.loadingSpinnerIsActive = true
        },


        deactiveteLoadingSpinner : function(){

            this.loadingSpinnerIsActive = false;
        },

        emptyTourData : function(){

            this.userTours = [];
        },

        loadCitiesByCountry : async function(){

            const { [this.searchData.country]:countryCities } =  await import('@/constants/citiesByCountry.json');

            this.selectDataCity = countryCities;

        },


        getAllUserTours : async  function(){



            this.activateLoadingSpinner();

            let response = await axios.get( API + 'tour/user/' + this.userId + `?start=${this.start}&limit=${this.limit}` );

            let data = response.data.result;

            this.deactiveteLoadingSpinner()

            if( data && data.length > 0){

                this.start += 20;

                this.userTours = data;


            }
            
        },


        formatSearchData : function(searchData){

            for( let key in searchData){

                if( searchData[key] == null){

                    searchData[key] = ""
                }
            }

            return searchData
        },




        onSearch : function(){

            this.emptyTourData();

            this.activateLoadingSpinner();

            this.debouncedSearch()
        },




        checkIfObjectIsNotEmpty : function( obj ){

            return Object.values( obj ).join("").split("").length; // [1,2,"",3] => 123 => [1,2,3].length
        },



        infiniteHandler : async function( $state ){


            if( this.searchData && this.checkIfObjectIsNotEmpty( this.searchData ) ){

                console.log(this.searchData)

                let searchData = this.searchData; 

                searchData = this.formatSearchData(searchData)
    
    
                searchData = new URLSearchParams(searchData).toString();
    
                let response =  await axios.get( API + `tour/user/${this.userId}?` + searchData + `&start=${this.searchStart}&limit=${this.searchLimit} `);

                let searchResult = response.data.result;

                if( searchResult && searchResult.length > 0 ){
    
                    this.userTours.push( ...searchResult );
    
                    this.searchStart += 20;

                    $state.loaded();

                }

                else {

                    $state.complete();

                }


            }

            else{



                    let response =  await axios.get( API + `tour/user/${this.userId}?start=${this.start}&limit=${this.limit}` )

                    let data = response.data.result;


                    if ( data && data.length > 0) {

                        this.start+=20;
        
                        this.userTours.push(...data);

                        $state.loaded();

                        
        
        
                    } else {

                        $state.complete();

                    }
                


            }


        }




    },

    components : {
        Card
    },


    async mounted() {
        const { default: countries } =  await import('@/constants/countries.json');


       this.selectDataCountry = countries;

    },

    computed:{




        formatEndDate : function(){


            
            if(this.searchData.endDate.length > 1){

                let date = this.searchData.endDate;
                date = date.split("-") //11-05-2022 => [11.05,2022]

                
                date = `${date[2]} ${  this.monthNames[ Number( date[1] ) ] } ${ date[0] }`



                return date

            }


        },


        formatStartDate : function(){


            
            if(this.searchData.startDate.length > 1){

                let date = this.searchData.startDate;
                date = date.split("-") //11-05-2022 => [11.05,2022]

                
                date = `${date[2]} ${  this.monthNames[ Number( date[1] ) ] } ${ date[0] }`



                return date

            }


        }


    },


    created(){

        this.getUserId();

        this.debouncedSearch = debounce( async function(){

            this.searchStart = 0;

            let searchData = this.formatSearchData(this.searchData)

            console.log(searchData)

            searchData = new URLSearchParams(searchData).toString();

            let response =  await axios.get( API + `tour/user/${this.userId}?` + searchData + `&start=${this.searchStart}&limit=${this.searchLimit} `);

            let searchResult = response.data.result;

            if( searchResult ){


                this.userTours = searchResult;

                this.searchStart += 20;

                this.deactiveteLoadingSpinner();
    


            }



        } , 300)

        this.getAllUserTours();
    }



}