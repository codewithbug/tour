const API = process.env.VUE_APP_APIURL;

export default{

    name: "Card",

    props : ["image" , "mainImage" , "name" , "tourStartDate" , "tourEndDate" , "country" , "city" , "features" , "price"],

    data : function(){

        return{

            api: API,

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


        }
    },

    methods : {

        getDiffAsDay : function( startDate , endDate ){

            let milliseconds = new Date(endDate) - new Date(startDate);

            let seconds = Math.trunc( milliseconds/1000 );

            let minutes = Math.trunc( seconds / 60 );

            let hours = Math.trunc( minutes / 60 );

            let days = Math.trunc( hours / 24 ) + 1;

            return days
        },

        formatDate : function( date ){

            date = new Date(date)

            let day = date.getDate();

            let month = this.monthNames[ date.getMonth() + 1 ];

            let year = date.getFullYear();

            return `${day} ${month} ${year}`

        },

        featureExists : function(feature){

            let featureArray = this.features.split("-")

            return featureArray.includes(feature)
        }

    }
}