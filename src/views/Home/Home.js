import Search from "@/components/Search/Search.vue"
import Card from "@/components/Card/Card.vue"
import VipTourSlide from "@/components/Vip-Tour-Slide/Vip-Tour-Slide.vue";

const API = process.env.VUE_APP_APIURL;

const BASE = process.env.VUE_APP_BASEURL

import { debounce } from "debounce";

import {  mapMutations, mapState } from "vuex"

import axios from "axios";

axios.defaults.withCredentials = true


export default{



    name : "Home",

    data : function(){

        return{


            start : 0,
            limit : 20,

            searchStart : 0,
            searchLimit : 20,

            loadingSpinnerIsActive: false,

            base:BASE,

            searchData : "",

            resizeCounter : 0,

            intervalId : "",

            vipTourSlideData : {


                currentCardWidth : "",


                fullSlideWidth : "",

                newCardWidth : "",

                slideLimit : "",

                slideWidthPerCard : "",

                slideWidthRatioToNormal : "",


                cardPerSlide : function( screensize ){

                    if( screensize >= 993 ){

                        return 4
                    }

                    if( screensize >= 551 ){
                        return 2
                    }

                    return 1


                }
            },

            vipTourSlided : 0,

            tours : [],

            vipTours : []
        }
    },




    methods : {

        ...mapMutations([
            "toggleMobileSearchPanel"
        ]),

        activateLoadingSpinner : function(){

            this.loadingSpinnerIsActive = true
        },


        deactiveteLoadingSpinner : function(){

            this.loadingSpinnerIsActive = false;
        },

        emptyTourData : function(){

            this.tours = [];
        },

        emptySearchData : function(){

            this.searchData = ""
        },


        formatSearchData : function(searchData){

            searchData.startDate = searchData.tourDate[0] || "";

            searchData.endDate = searchData.tourDate[1] || ""; 

            for( let key in searchData){

                if( searchData[key] == null){

                    searchData[key] = ""
                }
            }

            return searchData
        },


        getAllTours : async function(){

            this.activateLoadingSpinner();

            let response = await axios.get( API + `tour?start=${this.start}&limit=${this.limit}` )

            let data = response.data.result;

            if( data && data.length > 0){

                this.start += 20;

                this.tours = data

                this.deactiveteLoadingSpinner();

                return;


            }


            if ( data && data.length < 1 ){

                this.deactiveteLoadingSpinner();

                return;
            }





        },


        getVipTours : async function(){


            let response = await axios.get( API + `tour/vipTour` );

            let data = response.data.result;

            if( data && data.length > 0){


                this.vipTours = data;





            }

        },


        onSearch : async function(data){

            this.$refs.cardSection.scrollIntoView();

            this.toggleMobileSearchPanel();

            this.emptyTourData();

            this.activateLoadingSpinner();

            this.debouncedSearch(data)
        },


        checkIfObjectIsNotEmpty : function( obj ){

            return Object.values( obj ).join("").split("").length; // [1,2,"",3] => 123 => [1,2,3].length
        },



        infiniteHandler : async function( $state ){


            if( this.searchData && this.checkIfObjectIsNotEmpty( this.searchData ) ){

                let searchData = this.searchData; 

                searchData = this.formatSearchData(searchData)
    
    
                searchData = new URLSearchParams(searchData).toString();
    
                let response =  await axios.get( API + `tour?` + searchData + `&start=${this.searchStart}&limit=${this.searchLimit} `);

                let searchResult = response.data.result;

                if( searchResult && searchResult.length > 0 ){
    
                    this.tours.push( ...searchResult );
    
                    this.searchStart += 20;

                    $state.loaded();

                }

                else {

                    $state.complete();

                }


            }

            else{



                    let response =  await axios.get( API + `tour?start=${this.start}&limit=${this.limit}` )

                    let data = response.data.result;


                    if ( data && data.length > 0) {

                        this.start+=20;
        
                        this.tours.push(...data);

                        $state.loaded();

                        
        
        
                    } else {

                        $state.complete();

                    }
                


            }


        },

        initVipTourSliderAfterRender : function(){

            this.vipTourSlideData.newCardWidth = 0;

            this.$nextTick( function(){

                this.initVipTourSlider()
            }) 
        },


        initVipTourSlider : function(){

            if( this.vipTours.length < 1 ){

                return
            }
            

            let screenSize = window.innerWidth;

            this.vipTourSlideData.slideAmount = Number( ( 100 / this.vipTours.length ) * this.vipTourSlideData.cardPerSlide(screenSize) ) ;

            

            this.vipTourSlideData.slideWidthPerCard = Math.trunc( Number( 100 / this.vipTourSlideData.cardPerSlide(screenSize) ) );

            this.vipTourSlideData.fullSlideWidth = this.vipTours.length * this.vipTourSlideData.slideWidthPerCard;

            if( this.vipTourSlideData.fullSlideWidth < 100 ){

                this.vipTourSlideData.fullSlideWidth = 100;
            }

            this.vipTourSlideData.slideWidthRatioToNormal =  this.vipTourSlideData.fullSlideWidth / 100;

            this.vipTourSlideData.slideWidthRatioToNormal = Number ( this.vipTourSlideData.slideWidthRatioToNormal.toFixed(2) );

            this.vipTourSlideData.currentCardWidth = Number ( window.getComputedStyle(this.$refs.vipTourCard[0]).flexBasis.slice(0,-1) );


            this.vipTourSlideData.newCardWidth = this.vipTourSlideData.currentCardWidth / this.vipTourSlideData.slideWidthRatioToNormal;

            this.vipTourSlideData.newCardWidth = Number( this.vipTourSlideData.newCardWidth.toFixed(2) );

            this.vipTourSlideData.slideLimit = 100 -  this.vipTourSlideData.slideAmount;


            let vipTourCarousel = this.$refs.vipTourCarousel;

            vipTourCarousel.style.flex = `0 0 ${this.vipTourSlideData.fullSlideWidth}%`;
            vipTourCarousel.style.maxWidth = `${this.vipTourSlideData.fullSlideWidth}%`;





            
        },


        startCarousel : function(){

            this.$nextTick( function(){


                if( this.vipTourSlided >= this.vipTourSlideData.slideLimit){

                    this.vipTourSlided = 0;

                    return;
                }

                if( this.vipTourSlided + this.vipTourSlideData.slideAmount  > this.vipTourSlideData.slideLimit ){

                    this.vipTourSlided = this.vipTourSlideData.slideLimit;

                    return;
                }


                this.vipTourSlided += this.vipTourSlideData.slideAmount;



            })
        }





    },

    computed: mapState([
        "mobileSearchPanelIsActive"
    ]),

    components : {
        Search,
        Card,
        VipTourSlide
    },


    async  mounted(){



        await this.getVipTours();

        if( this.vipTours.length > 0 ){

            this.initVipTourSlider()

            this.$nextTick( function(){
    
                window.addEventListener('resize', this.initVipTourSliderAfterRender);
    
                this.intervalId = setInterval( this.startCarousel , 2000)
    
    
            } )

        }





    },

    beforeDestroy() { 

        if( this.vipTours.length > 0 ){


            window.removeEventListener('resize', this.initVipTourSliderAfterRender);
            clearInterval(this.intervalId);

        }



    },



    
    created(){

        this.debouncedSearch = debounce( async function(data){

            this.searchStart = 0;

            this.searchData = data;  // preserve original searchData to check its emptiness on infinite scroll handler

            let searchData = this.formatSearchData(data)


            searchData = new URLSearchParams(searchData).toString();

            let response =  await axios.get( API + `tour?` + searchData + `&start=${this.searchStart}&limit=${this.searchLimit} `);

            let searchResult = response.data.result;

            if( searchResult ){



                this.tours = searchResult;

                this.searchStart += 20;

                this.deactiveteLoadingSpinner();



            }




        } , 1000)

        this.getAllTours();


    },





}