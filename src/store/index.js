import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)



export default new Vuex.Store({
  state: {

    mobileSearchPanelIsActive : false,

    userInfo : "",


  },

  mutations: {


    
    toggleMobileSearchPanel(state){
      state.mobileSearchPanelIsActive = !state.mobileSearchPanelIsActive
    },
    
    closeMobileSearchPanel(state){
      state.mobileSearchPanelIsActive = false
    },

    setUserInfo( state , info ){

      state.userInfo = info
    },

    removeUserInfo ( state ){

      state.userInfo = ""
    },

    setUserProfileImage( state , image ){

      state.userInfo.profileImage = image
    }

  },


  getters : {
    

  },


  actions:{

  },



})
