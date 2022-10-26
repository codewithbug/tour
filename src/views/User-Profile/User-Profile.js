const API = process.env.VUE_APP_APIURL;

import makeFormdata from '@/utils/formdataMaker';
  
import axios from 'axios';

import { debounce } from "debounce";

import { validations } from '@/utils/changePasswordValidation';
import { mapMutations, mapState } from 'vuex';

export default{

    validations : validations,

    name : "userProfile",

    data : function(){

        return {

            showCurrentPassword : false,
            showNewPassword : false,
            showNewPasswordConfirm : false,

            buttonSpinnerIsActive : false,

            currentSnackbarType : "success", // success/error

            snackbarMessage: "",

            snackbarOpened: false,

            api : API,

            currentSection : "personalInfo",

            profilePicture:"",

            profileData:{

                name:"",
                surname:"",
                phone:"",
                address:"",
                profileImage : ""

            },

            passwordData: {

                currentPassword:"",
                newPassword:"",
                newPasswordConfirm:""

            }

        }
    },

    methods : {





        activateBtnSpinner : function(){

            this.buttonSpinnerIsActive = true;
        },

        deactivateBtnSpinner : function(){

            this.buttonSpinnerIsActive = false;
        },

        openSnackBar( message = "success" , type ) {

            this.currentSnackbarType = type;

            this.snackbarMessage = message;

            this.snackbarOpened = true;

        },

        getPreview: function(event) {


            var self = this;

            // hidden input file

            var input = event.target;

            console.log(input);

            var filesLength = event.target.files.length;

            for (var x = 0; x < filesLength; x++) {

                var reader = new FileReader();

                reader.onload = function(e) {

                    // add image to array for showing it as a preview
                    self.profilePicture = e.target.result;

                };

                // read the image file as a data URL.
                reader.readAsDataURL(input.files[x]);
            }

            this.profileData.profileImage = input.files[0];


        },

        changeSection(section){

            this.currentSection = section
        },

        onChangeProfileImgButtonClick: function(){

            this.$refs.imgInput.click()
        },


        loadCurrentUserInfo : async function(){

            let userId = this.$route.params.userId;

            let response = await axios.get(API + `user/${userId}`)

            let data = response.data.result[0];

            this.profileData = data

            console.log(this.profileData)



        },


        changePersonalInfo: async function(){


            this.activateBtnSpinner();

            this.debouncedChangePersonalInfo()

        },



        changePassword: async function(){


            this.$v.$touch();

            if (this.$v.$invalid) {

                return;
            }

            this.activateBtnSpinner();

            this.debouncedChangePassword();


        },


        ...mapMutations(["setUserProfileImage"])


    },


    created(){

        this.loadCurrentUserInfo(),


        this.debouncedChangePersonalInfo = debounce( async function(){


            let userId = this.$route.params.userId;

            let formData = makeFormdata(this.profileData)

            let response = await axios.put( API + "user/" + userId , formData).catch(  (error) =>{

                let response = error.response

                let errorData = response.data.errors[0]


                this.openSnackBar( errorData, "error")


            })

            this.deactivateBtnSpinner();

            if( !response){
                return
            }

            let  data = response.data;



            if( data.success){

                this.setUserProfileImage(data.result[0].profileImage);

                this.openSnackBar("Uğurla Dəyişildi !" , "success")

            }else{

                this.openSnackBar( "Xəta !" , "error")

            }



        },  500),


        this.debouncedChangePassword = debounce( async function(){

            let userId = this.$route.params.userId;

            this.passwordData.userId = userId;

            let response = await axios.put( API + "user/" + userId + "/changePassword"  , this.passwordData).catch(  (error) =>{

                let response = error.response

                let errorData = response.data.errors[0]


                this.openSnackBar( errorData, "error")


            })

            this.deactivateBtnSpinner();

            if( !response){

                return
            }

            let  data = response.data;



            if( data.success){



                this.openSnackBar("Uğurla Dəyişildi !" , "success")

            }else{

                this.openSnackBar( "Xəta !" , "error")

            }

            
        }, 500)

    },

    computed : {


        ...mapState(["userInfo"]),

        currentPasswordError() {

            const errors = [];
            if (!this.$v.passwordData.currentPassword.$dirty) return errors;

            if( !this.$v.passwordData.currentPassword.required ){

                errors.push('Şifrə boş ola bilməz !.')

                return errors
                
            }


        },

        passwordError() {

            const errors = [];
            if (!this.$v.passwordData.newPassword.$dirty) return errors;

            if( !this.$v.passwordData.newPassword.required ){

                errors.push('Şifrə boş ola bilməz !.')

                return errors
                
            }

            if( !this.$v.passwordData.newPassword.strongPassword ){

                errors.push('Ən az 1 kiçik və 1 böyük hərf , 1 rəqəm , 1 simvol olmalıdır !.')

                return errors
            }


            
            if( !this.$v.passwordData.newPassword.validPasswordLength){

                
                errors.push('Uzunluq  6-20 arası olmalıdır !.')

                return errors

            }


        },

        newPasswordConfirmError() {

            const errors = [];
            if (!this.$v.passwordData.newPasswordConfirm.$dirty) return errors;

            if( !this.$v.passwordData.newPasswordConfirm.required ){

                errors.push('Şifrə boş ola bilməz !.')

                return errors
                
            }

            if(  !this.$v.passwordData.newPasswordConfirm.passwordsAreSame ){

                errors.push(' Şifrə eyni deyil !.')

                return errors
            }

            if( !this.$v.passwordData.newPasswordConfirm.strongPassword ){

                errors.push('Ən az 1 kiçik və 1 böyük hərf , 1 rəqəm , 1 simvol olmalıdır !.')

                return errors
            }


            
            if( !this.$v.passwordData.newPasswordConfirm.validPasswordLength){

                
                errors.push('Uzunluq  6-20 arası olmalıdır !.')

                return errors

            }



        },

    }

}