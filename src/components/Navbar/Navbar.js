import { mapMutations, mapState } from "vuex";

const BASE = process.env.VUE_APP_BASEURL

const API = process.env.VUE_APP_APIURL;  
  
import axios from 'axios';

import { debounce } from 'debounce';

// import ClickOutside from 'vue-click-outside'

export default{

    name : "Navbar",

    data : function(){

        return {

            base:BASE,

            api : API,

            dropdownIsActive : false,
            

            mobileDropdownIsActive : false,

            mobileMenuIsActive : false,
            mobileSearchIsActive : false,

            logoutSpinner : false,
        }
    },

    methods : {

        activateLogoutSpinner : function(){

            this.logoutSpinner = true
        },

        deactivateLogoutSpinner : function(){

            this.logoutSpinner = false
        },

        clickOutsideInclude : function(){

           return [ ...document.querySelectorAll(".logoutOverlay" )]
        },

        toggleDropdown : function(){


            this.dropdownIsActive = !this.dropdownIsActive

        },

        closeDropdown : function(){



            this.dropdownIsActive = false;
        },

        toggleMobileDropdown : function(){


            this.mobileDropdownIsActive = !this.mobileDropdownIsActive

        },

        closeMobileDropdown : function(){

            this.mobileDropdownIsActive = false;
        },


        onMobileMenuClick:function(route){

            this.$router.push(route);
            this.toggleMenu();
        },

        toggleMenu : function(){
            this.mobileMenuIsActive = !this.mobileMenuIsActive;
        },



        mobileSearchPanelSwitch : function(){

            this.mobileSearchIsActive = !this.mobileSearchIsActive;

            this.toggleMobileSearchPanel();
        },

        onLogout : function(){


            this.activateLogoutSpinner();

            this.debouncedLogout();
            


        },
        

        ...mapMutations([

            "toggleMobileSearchPanel",
            "removeUserInfo"
        ])
    },

 

    computed:{

        currentPageIsHome:function(){
            console.log(this.$route.meta);

            return this.$route.meta.isHome;
        },

        ...mapState([

            "userInfo"
        ])

    },

    

    created(){

        this.debouncedLogout = debounce( async function(){

            let response = await axios.post( API + "user/logout");

            let data = response.data;

            if( data.success ){

                this.deactivateLogoutSpinner();

                this.closeDropdown();

                this.closeMobileDropdown();

                this.removeUserInfo();

                this.$router.push("/");
            }

        } , 500)
    }





}