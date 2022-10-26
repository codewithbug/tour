import Vue from 'vue'


import VueRouter from 'vue-router'




Vue.use(VueRouter)

  const API = process.env.VUE_APP_APIURL;  
  
  import axios from 'axios';

import Home from '@/views/Home/Home.vue'
import Details from '@/views/Details/Details.vue'
import userDashboard from '@/views/User-Dashboard/User-Dashboard.vue'
import userProfile from '@/views/User-Profile/User-Profile.vue'
import Upload from '@/views/Upload/Upload.vue'
import Login from '@/views/Login/Login.vue'
import SignUp from '@/views/SignUp/SignUp.vue'
import EditTour from '@/views/Edit-Tour/Edit-Tour.vue'
import Dashboard from '@/views/Admin/Admin-Dashboard/Admin-Dashboard.vue'
import AdminEditTour from '@/views/Admin/Admin-Edit-Tour/Admin-Edit-Tour.vue'
import EmailVerifySuccessfull from '@/views/Email-Verify-Successfull/Email-Verify-Successfull.vue'
import ResetPassword from '@/views/Reset-Password/Reset-Password.vue'
import SetNewPasswordAfterReset from '@/views/Set-New-Password-After-Reset/Set-New-Password-After-Reset.vue'
import adminLogin from '@/views/Admin/Admin-Login/Admin-Login.vue'
import AdminHome from '@/views/Admin/Admin-Home/Admin-Home.vue';
import AdminVipTours from '@/views/Admin/Admin-Vip-Tours/Admin-Vip-Tours.vue';


import store from '@/store';

const routes = [
  
  {
    path:"",
    component : Home,
    meta:{
      isHome:true
    }
  },

  {
    path:"/details/:tourId",
    component : Details
  },

  {
    path:"/dashboard/:userId",
    component : userDashboard,
    meta : {
      currentPageIsDashboard : true,
      requireAuth : true
    }
  },

  {
    path:"/profile/:userId",
    component : userProfile,
    meta : {requireAuth : true}
  },

  {
    path:"/upload",
    component : Upload,
  },

  {
    path:"/login",
    component : Login,
  },


  {
    path:"/signup",
    component : SignUp,
  },

  {
    path:"/resetPassword",
    component : ResetPassword,
  },

  {
    path:"/verifyEmail/:userId/:token",
    component : EmailVerifySuccessfull,
  },

  {
    path:"/setNewPassword/:userId/:token",
    component : SetNewPasswordAfterReset,
  },



  {
    path:"/edit/:tourId",
    component : EditTour,
    meta : {requireAuth : true}
  },






  {
    path:"/admin/login",
    component : adminLogin,
  },

  {
    path:"/admin/edit/:tourId",
    component : AdminEditTour,
    meta : {requireAuth : true, requireAdmin:true}
  },


  {
    path:"/admin",
    component : AdminHome,
    meta : {requireAuth : true, requireAdmin:true},

    children : [




      { 
        path : "",
        redirect : "dashboard",
        meta : {requireAuth : true, requireAdmin:true}
      },
      


      { 
        path : "dashboard",
        component : Dashboard,
        meta : {requireAuth : true, requireAdmin:true}
      },


      { 
        path : "vipTours",
        component : AdminVipTours,
        meta : {requireAuth : true, requireAdmin:true}
      }

    ]

  },



]

const checkIfUserAuth = async function(){

  if(store.state.userInfo){
    return
  }
      
  let response = await axios.post( API + "user/ifUserAuthenticated" , null , {withCredentials:true});


  let data = response.data;

  let userInfo = data.result.userInfo


  if( userInfo){

    console.log(userInfo)

    store.commit( "setUserInfo" , userInfo)
  }

  console.log(userInfo)

}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach( async (to,from,next)=>{




  console.log(to,from)
  
  await checkIfUserAuth();

  if( to.meta.requireAuth && to.meta.requireAdmin && ( !store.state.userInfo || store.state.userInfo.type !="admin" ) ){


    next("/");

    return;
  }

  if( to.meta.requireAuth && !store.state.userInfo){

    next("/login")
  }
  
  else{
    next()
  }

})

export default router
