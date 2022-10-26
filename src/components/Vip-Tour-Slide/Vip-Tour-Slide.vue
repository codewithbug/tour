<template>

    <div class="col-12 px-0  row no-gutters justify-content-between cardSection">

        <!-- <carousel :perPageCustom="[ [1,1] , [551 , 2] , [993,4] ]"  autoplay :loop="true" :mouseDrag="false"> -->
            
            <!-- <slide   v-for="(tour,index) in vipTours" :key="tour.id" class="cardContainer" :class="{ 'leftPadding' : (index + 1) % 4 == 0 , 'rightPadding' : index % 4 == 0  , 'bothPadding' : (index + 1) % 4 != 0 &&  index % 4 != 0   }"> -->
            <!-- <slide   v-for="(tour , index) in vipTours" :key="tour.id" class="cardContainer" :class="{'noRightMargin' : (index + 1)  % 4 ==0  , 'noRightMarginForSecond' : (index + 1) % 2 ==0 }"> -->
                
                    
                    <div v-for="(tour ) in vipTours" :key="tour.id" class="cardContainer">
                        <a :href="base + 'details/' + tour.tourId" class="slide">
                        
                            <Card v-bind="tour"/>
                        </a>

                    </div>




            <!-- </slide> -->

        <!-- </carousel> -->

    </div>

</template>

<style scoped src="./Vip-Tour-Slide.css"></style>
<script src="./Vip-Tour-Slide.js"></script>
