import Card from "../Card/Card.vue"
import { Carousel, Slide } from 'vue-carousel';

import InfiniteSlideBar from 'vue-infinite-slide-bar'

const BASE = process.env.VUE_APP_BASEURL

export default {

    name : "VipTourSlide",

    data : function(){

        return {

            base : BASE
        }
    },

    props : ["vipTours"],

    components : {Card ,  Carousel, Slide , InfiniteSlideBar}
}