<template>



    <div class="col-12 px-0 adminSidebar"   >

        <p class="col-12 py-4 mb-0 text-center title"> Admin Panel </p>

        <hr class="my-0">
        
        <router-link @click.native="currentSection = 'dashboard'" class="py-3" :class="{ 'currentSection' : currentSection == 'dashboard'}" to="/admin/dashboard">Dashboard</router-link>


        <router-link @click.native="currentSection = 'vipTours'" class="py-3" :class="{ 'currentSection' : currentSection == 'vipTours'}" to="/admin/vipTours">Vip Tours</router-link>


    </div>




</template>

<style scoped src="./Admin-Sidebar.css"></style>
<script src="./Admin-Sidebar.js"></script>