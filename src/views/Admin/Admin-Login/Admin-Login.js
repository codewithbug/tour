 
  const API = process.env.VUE_APP_APIURL;  
  
  import axios from 'axios';

  import { debounce } from 'debounce';
import { mapMutations } from 'vuex';

export default{

    name: "adminLogin",

    data:function(){

        return{

            currentSnackbarType : "success", // success/error

            snackbarMessage: "",

            snackbarOpened: false,

            buttonSpinnerIsActive:false,

            showPassword:false,

            userData : {

                username : "",

                password : "",

                rememberMe : false,
            }
        }
    },


    methods : {

        openSnackBar( message = "success" , type ) {

            this.currentSnackbarType = type;

            this.snackbarMessage = message;

            this.snackbarOpened = true;

        },

        activateButtonSpinner : function(){

            this.buttonSpinnerIsActive = true
        },

        deactivateButtonSpinner : function(){

            this.buttonSpinnerIsActive = false
        },


        sendData : async function(){

            this.activateButtonSpinner();

            this.debouncedSendData();

        },

        redirectAfterSuccessfullLogin : function(){

            this.$router.push("/admin")
        },

        ...mapMutations([

            "setUserInfo",
      
      
      
          ])


    },

    created(){

        this.debouncedSendData = debounce( async function(){

            try {

                let response = await axios.post( API + "user/admin/login" , this.userData , {withCredentials:true})
                

                let data = response.data;

                this.deactivateButtonSpinner();

                if( data.success ){



                    this.openSnackBar( "Giriş edildi ! Yönləndirilirsiz..." , "success");

                    this.setUserInfo(data.result);

                    this.redirectAfterSuccessfullLogin()

                }else{

                    this.openSnackBar( "Xəta Baş Verdi !" , "error")

                }

            }catch(error){


                let errorMsg = error.response.data.errors[0]

                
                this.deactivateButtonSpinner();

                this.openSnackBar( errorMsg , "error")

                
            }


        } , 500)

    },





}