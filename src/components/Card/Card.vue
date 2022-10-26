<template>
    <div class="rootElement">

        <div class="col-12 px-0 mainContainer"> 

            <div class="col-12 px-0 imgContainer" :style="{backgroundImage : 'url(' + api + `images/${mainImage}` + ')' }"></div>

            <div class="col-12 px-0 info">

                <p class="col-12 pl-3 mt-4 title" :title="name"> {{name}} </p>


                <div class="col-12 px-3 row my-2  justify-content-between no-gutters  features">

                    <p class="col-7 px-0 mb-4 feature" > <font-awesome-icon icon="far fa-clock" /> {{ getDiffAsDay( tourStartDate , tourEndDate ) }} günlük</p>
                    <p class="col-5 px-0 mb-4 feature" > <font-awesome-icon icon="far fa-calendar-alt" /> {{ formatDate(tourStartDate) }}</p>
                    <p class="col-7 px-0 mb-4 feature" > <font-awesome-icon icon="fas fa-map-marker-alt" /> {{country}} , {{city}}</p>
                    <p class="col-5 px-0 mb-4 feature" > <font-awesome-icon icon="fas fa-wifi" /> Wifi: <span class="wifiValue"> {{ featureExists('wifi') ? 'Var' : 'Yox' }} </span> </p>


                </div>

                <p class="col-12 px-0 mb-0 py-2 text-center  priceContainer"> {{price}} <span class="manatSymbol"> ₼ </span> </p>
                    


            </div>

        </div>
    </div>
</template>

<style scoped src="./Card.css"></style>

<script src="./Card.js"></script>