<template>

<div class="col-12 px-0 mainContainer">
    
    <!--      Navbar Web Version      -->

    <div class="navbarWeb">

        <!--      links on navbar      -->
        <div class="col-auto px-0 links">

            <p class="col-auto px-0 mb-0 mr-5 logo" @click="onMobileMenuClick('/')"> Tripy.az </p>
            <p class="col-auto px-0 mb-0 mr-3" @click="onMobileMenuClick('/')"> Əsas </p>
            <p class="col-auto px-0 mb-0 mr-3"> Haqqımızda </p>
            <p class="col-auto px-0 mb-0 mr-3"> Əlaqə </p>

        </div>

        <!--      navbar right side (button , profile icon etc.)      -->
        <div class="col-auto rightPart">

            <button class="col-auto text-center px-4 py-1 addNewTourButton" @click="onMobileMenuClick('/upload')"> Yeni tur +</button>

            <div class="col-auto mb-0 avatar" v-if="userInfo" >

                <div class="avatarOverlay" v-click-outside="{
                    
                handler: closeDropdown,

                include:clickOutsideInclude
                    
                }"  @click="toggleDropdown"  ></div>

                <font-awesome-icon v-if="!userInfo.profileImage" class="avatarIcon" icon="fas fa-user-circle" />

                <div class="profileImgContainer" v-if="userInfo.profileImage"  :style="{backgroundImage : 'url(' + api + `images/${userInfo.profileImage}` + ')' }">


                </div>

                <div v-show="dropdownIsActive" class="dropdownMenu py-0 px-0">

                    <div class="arrowUp"></div>

                    <div class="px-0 dropdownLinks">

                        <router-link class="col-12 my-0 py-2  text-center" :to=" `/dashboard/${userInfo.id}` "> Turlarım </router-link>

                        <router-link class="col-12 my-0 py-2  text-center" :to=" `/profile/${userInfo.id}` "> Profil </router-link>

                        <div class="col-12 my-0 py-2  text-center logout"  @click="onLogout">

                            <div class="logoutOverlay"></div>

                            <span v-show="logoutSpinner" class="spinner-border loadingSpinner mr-2" role="status" aria-hidden="true"></span>  

                             Çıxış 
                             
                        </div>

                    </div>

                </div>
            </div>

            <div class="col-auto mb-0 avatar" v-if="!userInfo" @click="$router.push('/login')">

                <div class="avatarOverlay" ></div>

                <font-awesome-icon class="avatarIcon" icon="fas fa-user-circle" />


            </div>

        </div>
        
    </div>


    <!--     Navbar Mobile Version      -->

    <div class="navbarMobile" :class="{ menuIsActive : mobileMenuIsActive }">


        <!--      Menu Overlay      -->
        <div class="mobileMenuOverlay" @click="toggleMenu"></div>


        <!--      Menu      -->
        <div class="col-9 px-0 menuContainer">
            
            <div class="col-12 px-0 py-5 text-center upperPart">


                <button class="col-8 mb-auto text-center px-4 py-2 addNewTourButtonMobile" @click="onMobileMenuClick('/upload')"> Yeni tur +</button>
            </div>

            <div class="col-12 px-0 py-3 text-center linksMobile">

                <p class="col-12 text-center" @click="onMobileMenuClick('/')"> Əsas </p>
                <p class="col-12 text-center"> Haqqımızda </p>
                <p class="col-12 text-center"> Əlaqə </p>

            </div>

        </div>

        
        <div class="col-auto menuButton" @click="toggleMenu">
            <font-awesome-icon icon="fa-solid fa-bars" />
        </div>

        <div class="col-auto logoContainer" @click="$router.push('/')">
            <p class="mb-0 logoMobile"> Tripy.az </p>
        </div>


        <!-- <div class="col-auto searchButtonContainer" v-show="currentPageIsHome">
            
            <button class="px-4 py-1 searchButtonMobile" @click="mobileSearchPanelSwitch" >
                
                 <span v-show="!mobileSearchIsActive"> Axtar </span> 

                 <span v-show="mobileSearchIsActive"> Bağla </span> 
                 
            </button>

        </div> -->

        <div class="col-auto mb-0 avatarMobile">
            <font-awesome-icon class="mobileSearchIcon mr-4" icon="fas fa-search" v-show="currentPageIsHome"  @click="mobileSearchPanelSwitch" />

            <div class="avatarIconContainer" v-if="!userInfo" @click="$router.push('/login')">
                <div class="avatarOverlay" ></div>
                <font-awesome-icon icon="fas fa-user-circle" />



            </div>

            <div class="avatarIconContainer" v-if="userInfo" >
                <div class="avatarOverlay" v-click-outside="{
                    
                handler: closeMobileDropdown,

                include:clickOutsideInclude
                    
                }" @click="toggleMobileDropdown"  ></div>
                <!-- <font-awesome-icon icon="fas fa-user-circle"  /> -->

                <div class="profileImgContainerMobile" v-if="userInfo.profileImage"  :style="{backgroundImage : 'url(' + api + `images/${userInfo.profileImage}` + ')' }">


                </div>

            </div>

                <div v-show="mobileDropdownIsActive" class="mobileDropdownMenu py-0 px-0" >

                    <div class="arrowUp"></div>

                    <div class="px-0 dropdownLinks">
                        
                        
                        <router-link class="col-12 my-0 py-2  text-center" :to=" `/dashboard/${userInfo.id}` "> Turlarım </router-link>

                        <router-link class="col-12 my-0 py-2  text-center" :to=" `/profile/${userInfo.id}` "> Profil </router-link>

                        <div class="col-12 my-0 py-2  text-center"  @click="onLogout"> 

                            <div class="logoutOverlay"></div>

                            <span v-show="logoutSpinner" class="spinner-border loadingSpinner mr-2" role="status" aria-hidden="true"></span>  
                            
                            Çıxış 
                            
                        </div>

                    </div>

                </div>

        </div>

    </div>

</div>

</template>

<style scoped src="./Navbar.css"></style>

<script src="./Navbar.js"></script>