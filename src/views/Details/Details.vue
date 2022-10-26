<template>
    <div class="col-11 mx-auto mb-5 pt-5 px-0 mainContainer">

        <div class="col-12 px-0 mt-lg-5 pt-lg-5 mt-0 pt-0 row justify-content-between no-gutters topPart">
            

            <!--      SlideShow Web      -->
            <div class="col-lg-8 col-xl-9 px-0  slide">

                <!--      Current Slide      -->

                <div class="py-3 px-3 imageContainer">

                    <div class="fullScreenButtonContainer" @click="fullScreenSlideToggle">

                        <div class="fullScreenIcon">
                            <font-awesome-icon icon="fas fa-expand" />
                        </div>
                    </div>


                    <img v-show="currentSlide" :src=" currentSlide">
                </div>


                <!--      Thumbnail Slide Container      -->
                <div class="col-12 mt-5 carouselContainer">

                    <carousel :perPage=5 :navigationEnabled=true>
                        <slide class="sld" v-for="(image ,index) of tourData.images" :key="index">

                            <div class="sldOverlay" @click="selectSlide" ></div>                            
                            <img :src="api + 'images/' + image " >
                        </slide>



                    </carousel>
                
                </div>


                <!--      Full Screen Slide Mode      -->
                <div v-show="fullScreenIsActive" class="fullScreenSlide py-3 px-3">

                    <div class="closeButton" @click="fullScreenSlideToggle"> 
                        <font-awesome-icon icon="fas fa-times-circle" />
                    </div>

                    <div class="col-10 mx-auto sldContainer">
                        <carousel :perPage=1 :navigationEnabled=true>

                            <slide class="fullScreenSldItem" v-for="(image ,index) of tourData.images" :key="index">

                                <img :src="api + 'images/' + image " >
                            </slide>



                        </carousel>
                    </div>
                


                </div>


            </div>
            

            <!--      SlideShow Mobile     -->
            <div class="col-12 mt-5 mobileCarouselContainer">

                <carousel :perPage=1>
                    <slide class="mobileSld" v-for="(image ,index) of tourData.images" :key="index">

                        <img :src="api + 'images/' + image " >
                    </slide>

                </carousel>
            
            </div>



            <!--      Contacts      -->
            <div class="col-12 col-lg-4 col-xl-3 pl-lg-5 contactsContainer">
                
                <div class="col-12 py-5 px-5 contacts">

                    <p class="col-12 px-0 mb-4 title"> Əlaqə </p>

                    <div class="col-12 px-0 row no-gutters contact-data" v-show="tourData.id"> 
                        
                       <p class="col-1  px-0" > <font-awesome-icon icon="fas fa-hashtag" /> </p>
                    
                       <p  class="col-11 col-lg-10 pl-2 pl-lg-0 px-0"> {{ tourData.id }} </p> 
                        
                    </div>

                    <div class="col-12 px-0 row no-gutters contact-data" v-show="tourData.officeAddress"> 
                        
                       <p class="col-1  px-0" > <font-awesome-icon icon="fas fa-map-marker-alt" /> </p>
                    
                       <p  class="col-11 col-lg-10 pl-2 pl-lg-0 px-0"> {{ tourData.officeAddress }} </p> 
                        
                    </div>

                    <div class="col-12 px-0 row no-gutters contact-data" v-show="tourData.phoneNumber"> 
                        
                       <p class="col-1  px-0" > <font-awesome-icon icon="fas fa-phone" /> </p>
                    
                       <p  class="col-11 col-lg-10 pl-2 pl-lg-0 px-0"> {{ tourData.phoneNumber }} </p> 
                        
                    </div>

                    <div class="col-12 px-0 row no-gutters contact-data" v-show="tourData.email"> 
                        
                       <p class="col-1  px-0" > <font-awesome-icon icon="fas fa-envelope" /> </p>
                    
                       <p  class="col-11 col-lg-10 pl-2 pl-lg-0 px-0"> {{ tourData.email }} </p> 
                        
                    </div>

                    <div class="col-12 px-0 row no-gutters contact-data" v-show="tourData.website"> 
                        
                       <p class="col-1 mb-0  px-0" > <font-awesome-icon icon="fas fa-globe" /> </p>
                    
                       <p  class="col-11 col-lg-10 pl-2 pl-lg-0 mb-0 px-0"> {{ tourData.website }} </p> 
                        
                    </div>

                    <div class="col-12 px-0 mt-5 row no-gutters socialLinks"> 
                        
                        <a class="col-auto mr-3 mb-0 facebook" :href="tourData.facebook" target="_blank"> <font-awesome-icon icon="fa-brands fa-facebook" /> </a>
                        
                        <a class="col-auto mr-3 mb-0 instagram" :href="tourData.instagram" target="_blank">

                            <svg width="0" height="0">
                                <radialGradient id="instaColor" r="150%" cx="30%" cy="107%">
                                    <stop stop-color="#fdf497" offset="0" />
                                    <stop stop-color="#fdf497" offset="0.05" />
                                    <stop stop-color="#fd5949" offset="0.45" />
                                    <stop stop-color="#d6249f" offset="0.6" />
                                    <stop stop-color="#285AEB" offset="0.9" />
                                </radialGradient>
                            </svg>      

                            <svg  data-v-ae5eb30c="" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="socialIcon instagramIcon svg-inline--fa fa-instagram fa-w-14"><path class="instagramIcon" data-v-ae5eb30c="" fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" ></path></svg> 
                            
                        </a>
                        
                        <a class="col-auto mr-3 mb-0 youtube" :href="tourData.youtube" target="_blank"> <font-awesome-icon icon="fa-brands fa-youtube" /> </a>
                        
                        <a class="col-auto mr-3 mb-0 whatsapp" :href=" 'https://wa.me/' + tourData.whatsappNumber" target="_blank"> <font-awesome-icon icon="fa-brands fa-whatsapp" /> </a>

                        
                    </div>


                </div>
            </div>


        </div>

        <div class="col-12 col-lg-9 px-0 mt-5 tourInfo">

            <h1 class="col-12 px-0  tourTitle"> {{ tourData.name }} </h1>

            <div class="col-12 mt-3 pb-5 px-0 align-items-center row no-gutters location">
                
                 <font-awesome-icon icon="fas fa-map-marker-alt" />  
                 
                 <p class="col-auto px-0 ml-2 mb-0"> {{ tourData.country }} , {{ tourData.city }}  </p>

                 <p class="col-auto ml-0 ml-lg-3 mt-2  mt-lg-0 px-0 mb-0"> 
                    
                 <font-awesome-icon icon="far fa-calendar-alt" class="dateIcon" />   {{ this.formatDate(tourData.tourStartDate) }} ,

                 <!-- <font-awesome-icon icon="far fa-clock" class="ml-2 timeIcon"/>  -->
                 
                     {{ formatTime(tourData.tourStartDate) }}
                 
                  <font-awesome-icon icon="fas fa-long-arrow-alt-right" class="mx-2" />   <font-awesome-icon icon="far fa-calendar-alt" class="dateIcon" /> {{ formatDate( tourData.tourEndDate ) }}
                    
                 </p>
                
                 <!-- <p class="col-auto px-4 pt-3 pb-2 mb-0 vipLabel">VIP</p> -->
                 
            </div>


            <p class="col-12 px-0 mt-5 aboutTour"> Tur Haqqında Məlumat </p>

            <p  class="col-12 px-0 tourDescription">

                {{tourData.description}}

            </p>

            <div class="col-12 px-0 mt-5 row no-gutters tourFeatures">

                <p class="col-12 col-lg-3 px-0 feature" v-for="(feature , index) of tourData.features" :key="index"> <font-awesome-icon icon="fas fa-check-circle" />  <span class="ml-3"> {{feature}} </span>  </p>

            </div>

        </div>



    </div>

</template>

<style scoped src="./Details.css" ></style>

<script src="./Details.js"></script>