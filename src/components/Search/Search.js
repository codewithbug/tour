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
                tourDate:[],
            }
        }
    },


    methods : {

        ...mapMutations([

            "closeMobileSearchPanel"
        ]),


        resetSearchDate : function(){

            this.searchData.tourDate = []
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

        formatRangedDate : function(){

            if(this.searchData.tourDate.length > 1){

                let firstDate = this.searchData.tourDate[0];
                let secondDate = this.searchData.tourDate[1];
                firstDate = firstDate.split("-") //11-05-2022 => [11.05,2022]
                secondDate = secondDate.split("-")

                
                firstDate = `${firstDate[2]} ${  this.monthNames[ Number( firstDate[1] ) ] } ${ firstDate[0] }`
                secondDate = `${secondDate[2]} ${  this.monthNames[ Number( secondDate[1] ) ] } ${ secondDate[0] }`



                return `${firstDate} - ${secondDate}`

            }

        }
    },


    async mounted() {
        const { default: countries } =  await import('@/constants/countries.json');


       this.selectDataCountry = countries;

    },



}