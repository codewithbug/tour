const API = process.env.VUE_APP_APIURL;

import { Carousel, Slide } from 'vue-carousel';

import featureIcons from '@/constants/featureIcons';

import axios from "axios";

export default{

    name : "Details",

    data : function(){

        return {

            
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

            currentSlide : "",

            fullScreenIsActive : false,

            featureIcons : featureIcons,

            api:API,

            tourData : {}
        }
    },



    methods : {

        formatDateTime : function( dateTime ){

            if(!dateTime){
                return
            }

            dateTime = new Date(dateTime)

            console.log(dateTime)

            let day = dateTime.getDate();

            let month = this.monthNames[ dateTime.getMonth() + 1 ];

            let year = dateTime.getFullYear();

            let hours = dateTime.getHours() + "";

            hours = hours.padStart(2,0);

            let minutes = dateTime.getMinutes() + "";

            minutes = minutes.padStart(2,0)

            return `${day} ${month} ${year} , ${hours}:${minutes}`

        },

        formatTime : function( dateTime ){

            if(!dateTime){
                return
            }

            dateTime = new Date(dateTime)

            let hours = dateTime.getHours() + "";

            hours = hours.padStart(2,0);

            let minutes = dateTime.getMinutes() + "";

            minutes = minutes.padStart(2,0)

            return `${hours}:${minutes}`

        },

        formatDate : function( dateTime ){

            if(!dateTime){
                return
            }

            dateTime = new Date(dateTime)

            console.log(dateTime)

            let day = dateTime.getDate();

            let month = this.monthNames[ dateTime.getMonth() + 1 ];

            let year = dateTime.getFullYear();

            return `${day} ${month} ${year}`

        },

        

        selectSlide : function(event){

            if( event.target.classList.contains("sldOverlay") ) {

                console.log(event.target.nextElementSibling.src)

                this.currentSlide = event.target.nextElementSibling.src;
            }

        },

        fullScreenSlideToggle : function(){

            this.fullScreenIsActive = !this.fullScreenIsActive
        },

        formatTourData : function(tourData){

            
            tourData.images = tourData.images.split("*");

            tourData.features = tourData.features.split("-")

            this.currentSlide = this.api + 'images/' + tourData.images[0];

            return tourData
        },


        getCurrentTourData : async function(){

            let tourId = this.$route.params.tourId;

            let response = await axios.get(API + `tour/${tourId}`)

            let data = response.data.result;

            this.tourData = this.formatTourData ( data[0] );

        }



    },

    components : {
        Carousel,
        Slide
    },

    created(){

        this.getCurrentTourData()
    }

}