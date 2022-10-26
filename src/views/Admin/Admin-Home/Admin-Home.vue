<template>
    
    <div class="col-12 mx-auto pt-5 px-0 mainContainer">

    <div class="col-12 px-0 row no-gutter">

        <div class="col-3 px-0 leftPart">
            <AdminSidebar />
        </div>

        <div class="col-9 offset-3 pl-5 rightPart">


            <router-view></router-view>
            
        </div>

    </div>

    </div>

</template>

<style scoped src="./Admin-Home.css"></style>
<script src="./Admin-Home.js"></script>