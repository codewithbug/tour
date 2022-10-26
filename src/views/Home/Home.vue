<template>


<div class="col-11 mx-auto pt-5 px-0 mainContainer">



    <!--      Search      -->
    <div class="col-12 py-3 px-0 searchContainer" :class="{ searchContainerIsActive : mobileSearchPanelIsActive }">
        <Search  @onSearchButtonClick="onSearch"/>
    </div>


    <div class="col-12 px-0 my-5 pt-5">

        <div class="col-12 px-0 mb-5 vipTourTitle">

            <p class="col-12 text-center py-2"> Vip Turlar  </p>
        </div>

        <!-- <VipTourSlide :vipTours="vipTours" /> -->


            <div class="vipTourCarouselContainer">

                <div class="VipTourCarousel cardSection"  ref="vipTourCarousel" :style="{ transform :  `translateX(-${vipTourSlided}%)`  }">

                <a :href="base + 'details/' + tour.tourId" class="mb-5 cardContainer "  :style="{ flexBasis: (vipTourSlideData.newCardWidth > 0) ? vipTourSlideData.newCardWidth + '% !important' : '' }"  v-for="tour in vipTours" ref="vipTourCard"  :key="tour.id"  >
                    <Card v-bind="tour"/>
                </a>

                </div>


            </div>
    </div>


    <!--      Cards      -->

    <div class="col-12 px-0 mt-5 pt-5 row no-gutters justify-content-between cardSection" ref="cardSection">

    <div class="loadingOverlay" v-show="loadingSpinnerIsActive">

        <div class="spinner-border text-success" role="status">
            <span class="sr-only">Loading...</span>
        </div>

    </div>

    <p class="col-12 text-center my-5 py-2 ordinaryToursTitle" > Bütün Turlar  </p>

    <h1 v-show="tours.length < 1" class="col-12 text-center"> Tur tapılmadı ! </h1>
       
       <a :href="base + 'details/' + tour.id" class="mb-5 cardContainer" v-for="tour in tours" :key="tour.id">
           <Card v-bind="tour"/>
       </a>




    </div>



        <!--      Infinite Scroll      -->

        <infinite-loading v-if="tours.length > 0" @infinite="infiniteHandler"></infinite-loading>

    
</div>


</template>

<style scoped src="./Home.css"></style>

<script src="./Home.js"></script>