import { mapMutations } from 'vuex';

export default{

    name : "Search",

    data : function(){

        return {

            selectDataCountry:[],
            selectDataCity:[],

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
                country:"",
                city:"",
                minPrice:"",
                maxPrice:"",
                tourStartDate:"",
                tourEndDate : ""
            }
        }
    },


    methods : {

        ...mapMutations([

            "closeMobileSearchPanel"
        ]),


        resetSearchStartDate : function(){

            this.searchData.tourStartDate = ""
        },

        resetSearchEndDate : function(){

            this.searchData.tourEndDate = ""
        },
    

        loadCitiesByCountry : async function(){

            const { [this.searchData.country]:countryCities } =  await import('@/constants/citiesByCountry.json');

            this.selectDataCity = countryCities;

        },

        sendData : function(){
            console.log(this.searchData)
        }

        

    },


    computed:{

        formatStartDate : {

            get : function(){

                if(this.searchData.tourStartDate.length > 1){

                    let startDate = this.searchData.tourStartDate
                    startDate = startDate.split("-") //11-05-2022 => [11.05,2022]

                    
                    startDate = `${startDate[2]} ${  this.monthNames[ Number( startDate[1] ) ] } ${ startDate[0] }`



                    return startDate

                }

            },

            set : function(newValue){

                return newValue

            }

        },

        formatEndDate : {


            get : function(){

                if(this.searchData.tourEndDate.length > 1){

                    let endDate = this.searchData.tourEndDate
                    endDate = endDate.split("-") //11-05-2022 => [11.05,2022]

                    
                    endDate = `${endDate[2]} ${  this.monthNames[ Number( endDate[1] ) ] } ${ endDate[0] }`



                    return endDate

                }

            },

            set : function(newValue){

                return newValue

            }

        },

    },


    async mounted() {
        const { default: countries } =  await import('@/constants/countries.json');


       this.selectDataCountry = countries;

    },



}