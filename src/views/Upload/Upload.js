

const VueTelInput = () =>Promise.all([

  import(/* webpackChunkName: "chunk-vue-tel-input" */ 'vue-tel-input'),
  import(/* webpackChunkName: "chunk-vue-tel-input" */ 'vue-tel-input/dist/vue-tel-input.css'),

]).then( ([{ VueTelInput } ]  )  => VueTelInput );

const API = process.env.VUE_APP_APIURL;


import makeFormdata from '@/utils/formdataMaker';
import axios from 'axios';

import { debounce } from "debounce";


import { validations } from '@/utils/validations';

import { mapState } from 'vuex';

export default {

    name : "Upload",
    

    validations: validations,

    data:function(){

        return {

            formValidationHasError : false,

            buttonSpinnerIsActive:  false,

            currentSnackbarType : "success", // success/error

            snackbarMessage: "",

            snackbarOpened: false,

            mainImgIndex : -1,

            mainImg: "",

            imageId: 0, // to add into array for using in the :key attribute

            uploadedImages: [],

            uploadedImagesAsBinary: [],

            

            tourData : {
                userId : "",
                tourTitle:"",
                tourPrice:"",
                tourStartHour:"",
                tourStartDate:"",
                tourEndDate:"",
                tourCity:"",
                tourCountry:"",
                tourCompany:"",
                officeAddress:"",
                phoneNumber:"",
                email:"",
                website:"",
                instagram:"",
                facebook:"",
                youtube:"",
                whatsappNumber:"",
                tourDescription:"",
                countryCode:"",

                "features[]":{
                    Nəqliyyat:false,
                    Wifi:false,
                    Hovuz:false,
                    Kondisioner:false,
                    'Səhər yeməyi':false,
                    Nahar:false,
                    'Şam yeməyi':false,
                    Restoran:false,
                    Spa:false,
                    'Fitness mərkəzi':false,
                    Çimərlik:false,
                    'Kabel TV':false,
                    'Duş kabinəsi':false,
                    Kombi:false,
                    Mətbəx:false,
                    Fotoqraf:false,
                    Bələdçi:false,
                    Parkinq:false,
                },

                travelPlans:[]

            },

            travelPlanData : {

                planDetail : "",
                planDate : "",
                planHour : ""
            },

            selectDataCountry : [],
            selectDataCity : [],
            country : "Azerbaijan"


        }
    },

    methods : {

        addTravelPlan : function(){

            this.tourData.travelPlans.push({...this.travelPlanData})

        },

        removeTravelPlan : function(index){

            this.tourData.travelPlans.splice(index,1)
        },

        saveFieldsData : function(){

            localStorage.setItem("fieldsData" , JSON.stringify( this.tourData ));
        },

        loadFieldsData : function(){

            let fieldsData = localStorage.getItem("fieldsData");

            if( fieldsData ){

                let  fieldsDataParsed = JSON.parse( fieldsData );

                fieldsDataParsed.countryCode = "";

                this.tourData = Object.assign( {} , this.tourData , fieldsDataParsed )
            }
        },

        removeFieldData : function(){

            localStorage.removeItem("fieldsData");
        },

        setUserId : function(){

            this.tourData.userId = this.userInfo ? this.userInfo.id : "" 
        },

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


        trimTourData : function(){

            Object.keys(this.tourData).forEach( key => this.tourData[key] = typeof this.tourData[key] == "string" ? this.tourData[key].trim() : this.tourData[key])

        },


        isoDateWithoutTimeZone : function(date) {

            if (date == null) return date;

            var timestamp = date.getTime() - date.getTimezoneOffset() * 60000;

            var correctDate = new Date(timestamp);

            return correctDate.toISOString();

          },

        formatDataToSend : function (tourData){
            
            
            let tourDataFormatted  = Object.assign({} ,  tourData);


            let startHour = tourDataFormatted.tourStartHour.split(":")[0] // 12:44 => [12,44] => 12

            let startMinute = tourDataFormatted.tourStartHour.split(":")[1]
            
            tourDataFormatted.tourStartDate = new Date(tourDataFormatted.tourStartDate)

            tourDataFormatted.tourStartDate.setHours(startHour)

            tourDataFormatted.tourStartDate.setMinutes(startMinute)

            tourDataFormatted.tourStartDate = this.isoDateWithoutTimeZone( tourDataFormatted.tourStartDate )

            let keys = Object.keys(tourDataFormatted["features[]"] );

            let features = [];

            tourDataFormatted.phoneNumber = tourDataFormatted.countryCode + tourDataFormatted.phoneNumber;

            tourDataFormatted.images = this.uploadedImagesAsBinary;

            tourDataFormatted.mainImage = this.mainImg;

            keys.map( key => {

                if(tourDataFormatted["features[]"][key]){
                    features.push(key)
                }
            })

            features = features.join("-");

            tourDataFormatted["features[]"] = features;  


            tourDataFormatted.travelPlans = JSON.stringify( tourDataFormatted.travelPlans );

            return tourDataFormatted;

        },

        loadCitiesByCountry : async function(){

            const { [this.tourData.tourCountry]:countryCities } =  await import('@/constants/citiesByCountry.json');

            this.selectDataCity = countryCities;

        },


/*      Image Upload Functions      */

        // when clicked on upload button trigger a click event on file input

        onUploadButtonClick: function() {

            this.$refs.imgInput.click();

        },

        resetImgInput() {

            this.$refs.imgInput.value = "";
        },

        resetPreview() {
            this.uploadedImages = [];
        },

        resetBinaryImgList() {
            this.uploadedImagesAsBinary = [];
        },



        // method to extract image as binary to send to back-end side
        // we store binary file as a seperate array because otherwis we couldn't edit files as FileList is readonly
        extractImagesBinary(imgInput) {

            for( let img of imgInput.files){
                this.uploadedImagesAsBinary.push(img);
            }


        },

        // method to extract preview of uploaded image
        getPreview: function(event) {


            var self = this;

            // hidden input file

            var input = event.target;


            var filesLength = event.target.files.length;

            for (var x = 0; x < filesLength; x++) {

                var reader = new FileReader();

                reader.onload = function(e) {

                    // add image to array for showing it as a preview
                    self.addToUploadedImages(e.target.result);

                };

                // read the image file as a data URL.
                reader.readAsDataURL(input.files[x]);
            }


            this.extractImagesBinary(input);

            this.makeMainImage(0);

        },


        makeMainImage: function(imgIndex) {
            this.mainImgIndex = imgIndex;
            this.mainImg = this.uploadedImagesAsBinary[imgIndex];
            // this.openSnackBar("Əsas şəkil seçildi !");

        },


        // method to add extracted image into array in order to read and show it from there

        addToUploadedImages: function(image) {

            var imageData = { id: 0, image: "" };

            imageData.id = this.imageId;

            imageData.image = image; // add extracted image to the object

            this.uploadedImages.push(imageData);

            this.imageId++;

            this.resetImgInput();

        },


        deleteImage: function(imgIndex) {

            this.uploadedImages.splice(imgIndex, 1);
            this.uploadedImagesAsBinary.splice(imgIndex,1)
            this.mainImgIndex = -1
            this.mainImg = "";

        },


/*      Image Upload Functions  Ends    */



        sendData : function(){

            this.trimTourData();

            this.$v.$touch();

            
            if (this.$v.$invalid) {

                this.formValidationHasError = true;

                return;
            }

            this.formValidationHasError = false;

            this.activateBtnSpinner();
            
            this.debouncedSendData()

        }

    },

    components:{VueTelInput},


    async mounted() {

        console.log(this.tourData);

        this.setUserId();

        const { default: countries } =  await import('@/constants/countries.json');


       this.selectDataCountry = countries;

    },

    created(){

        this.setUserId();

        this.loadFieldsData();

        this.debouncedSendData = debounce( async function(){


            try{



                let tourData  = this.formatDataToSend(this.tourData);



                let formData = makeFormdata(tourData);

                let response = await axios.post( API + "tour" , formData )

                let data = response.data;

                this.$v.$reset();

                if( data.success ){

                    this.deactivateBtnSpinner();

                    this.removeFieldData();

                    this.openSnackBar("Tur Uğurla Yükləndi !" , "success")



                }else{

                    this.deactivateBtnSpinner()
                    
                    this.openSnackBar("Xəta Oldu !" , "error")
                }

            }catch(err){

                let errorMsg = err.response.data.errors[0];

                this.deactivateBtnSpinner()
                    
                this.openSnackBar(errorMsg , "error")

            }


        } , 500)


    },

    computed : {

        ...mapState([
            "userInfo"
        ]),

        tourTitleError() {
            const errors = [];
            if (!this.$v.tourData.tourTitle.$dirty) return errors;
            !this.$v.tourData.tourTitle.required && errors.push('Başlıq boş ola bilməz !.')
            return errors
        },

        tourDescriptionError() {
            const errors = [];
            if (!this.$v.tourData.tourDescription.$dirty) return errors;
            !this.$v.tourData.tourDescription.required && errors.push('Məlumat boş ola bilməz !.')
            return errors
        },

        tourPriceError() {
            const errors = [];
            if (!this.$v.tourData.tourPrice.$dirty) return errors;

            if ( !this.$v.tourData.tourPrice.required ){

                errors.push('Qiymət boş ola bilməz !.')
                return errors

            }

            if( !this.$v.tourData.tourPrice.numeric ){

                
                errors.push('Qiymət yalnız rəqəm ola bilər !.')
                return errors

            }
        },


        tourStartDateError() {
            const errors = [];
            if (!this.$v.tourData.tourStartDate.$dirty) return errors;
            !this.$v.tourData.tourStartDate.required && errors.push('Tur tarixi boş ola bilməz !.')
            return errors
        },

        tourStartHourError() {
            const errors = [];
            if (!this.$v.tourData.tourStartHour.$dirty) return errors;
            !this.$v.tourData.tourStartHour.required && errors.push('Tur saatı boş ola bilməz !.')
            return errors
        },

        tourEndDateError() {
            const errors = [];
            if (!this.$v.tourData.tourEndDate.$dirty) return errors;
            !this.$v.tourData.tourEndDate.required && errors.push('Dönüş tarixi boş ola bilməz !.')
            return errors
        },

        phoneNumberError() {


            const errors = [];
            if (!this.$v.tourData.phoneNumber.$dirty) return errors;

            if( !this.$v.tourData.phoneNumber.required ){

                errors.push('Telefon boş ola bilməz !.')

                return errors

            }


            if( !this.$v.tourData.phoneNumber.validatePhoneNumber ){

                errors.push('Yanlış Nömrə Formatı, Boşsluq Olmaz !')

                return errors

            }


        },

        emailError() {
            const errors = [];
            if (!this.$v.tourData.email.$dirty) return errors;

            if( !this.$v.tourData.email.required ){

                errors.push('email boş ola bilməz !.')

                return errors
                
            }

            if(  !this.$v.tourData.email.email ){

                errors.push('email formatı yanlışdır !.')

                return errors
            }



        },




    },

    watch: {

        tourData : {

            handler : function(){

                this.saveFieldsData();
            },

            deep : true,


        }
        

    }

    
}

