const API = process.env.VUE_APP_APIURL;  
  
import axios from 'axios';

export default{

    name : "emailVerifySuccessfull",

    data : function(){
        
        return {

            successDialogIsActive : false,
            emailChecked : false


        }

    },


    methods  : {

        showSucessDialog : function(){

            this.successDialogIsActive = true;
        },

        setEmailCheckedTrue : function(){

            this.emailChecked = true
        },


        verifyEmail : async function(){

            let verifyData = {

                id : this.$route.params.userId,

                token : this.$route.params.token
            }

            try{

                let response = await axios.post( API + "user/verifyEmail" , verifyData )
                    

                let data = response.data;

                if( data.success ){

                    this.setEmailCheckedTrue();

                    this.showSucessDialog();

                    
                }else{

                    this.setEmailCheckedTrue();
                }
            
            }catch(err){
                
                this.setEmailCheckedTrue();

            }


        } 
        

    },

    created(){

        setTimeout( this.verifyEmail , 1000);
    }

}