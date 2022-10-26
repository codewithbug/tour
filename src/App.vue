<template>
<div>
  
  <div class="container-fluid px-0">
    
    <div class="col-12  mx-auto py-2 py-lg-2 py-xl-3 navbarContainer">
      <Navbar />
    </div>



      <router-view data-app></router-view>


    
  </div>



</div>
</template>


<style scoped>

.navbarContainer{

  background:#2962FF;
  color: white;
  padding-left: 10px !important;
  padding-right: 10px !important;
  box-shadow: 0 0 5px 0 #d3d3d3;
  position: fixed;
  z-index: 5;
  top: 0;
}

</style>

<script>


import Navbar from '@/components/Navbar/Navbar.vue'

export default {



  



  name: 'App',



  components : {
    Navbar
  },






}

</script>