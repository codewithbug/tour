

const VueTelInput = () =>Promise.all([

    import(/* webpackChunkName: "chunk-vue-tel-input" */ 'vue-tel-input'),
    import(/* webpackChunkName: "chunk-vue-tel-input" */ 'vue-tel-input/dist/vue-tel-input.css'),
  
  ]).then( ([{ VueTelInput } ]  )  => VueTelInput );
  
  const API = process.env.VUE_APP_APIURL;

  
  
  import makeFormdata from '@/utils/formdataMaker';
  import axios from 'axios';
  
  import { debounce } from "debounce";

  import { validations } from '@/utils/validations';

  export default {
  
      name : "adminEditTour",

      validations: validations,
  
      data:function(){
  
          return {

            formValidationHasError : false,

            currentSnackbarType : "success", // success/error

            snackbarMessage: "",

            snackbarOpened: false,

            publishButtonSpinnerIsActive : false,

            saveButtonSpinnerIsActive : false,

            deleteButtonSpinnerIsActive : false,

            deleteResponseMessage : "",

            deleteResponseDialogIsActive : false,   // message dialog after delete operation is successfull or failed

            deleteConfirmationDialogIsActive : false,

            currentCountryCode : "",

            tourStartDateToPreview:"",

            tourEndDateToPreview:"",

             newUploadedImageCount : 0,

              mainImgIndex : -1,
  
              mainImg: "",
  
              imageId: 0, // to add into array for using in the :key attribute
  
              uploadedImages: [],
  
              uploadedImagesAsBinary: [],

              imagesToDeleteFromServer: [],


              monthNames : {
                1:"Yanvar",
                2:"Fevral",
                3:"Mart",
                4:"Aprel",
                5:"May",
                6:"İyun",
                7:"İyul",
                8:"Avqust",
                9:"Sentyabr",
                10:"Oktyabr",
                11:"Noyabr",
                12:"Dekabr"
            },
  
              
  
              tourData : {
                  name:"",
                  price:"",
                  startHour:"",
                  tourStartDate:"",
                  tourEndDate:"",
                  city:"",
                  country:"",
                  company:"",
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

                  travelPlans : []
  
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

        openSnackBar( message = "success" , type ) {

            this.currentSnackbarType = type;

            this.snackbarMessage = message;

            this.snackbarOpened = true;

        },

        addTravelPlan : function(){

            this.tourData.travelPlans.push({...this.travelPlanData})

        },

        removeTravelPlan : function(index){

            this.tourData.travelPlans.splice(index,1)
        },


        activatePublishButtonSpinner : function(){

            this.publishButtonSpinnerIsActive = true
        },

        deactivatePublishButtonSpinner : function(){

            this.publishButtonSpinnerIsActive = false
        },

        activateSaveButtonSpinner : function(){

            this.saveButtonSpinnerIsActive = true;
        },

        deactivateSaveButtonSpinner : function(){

            this.saveButtonSpinnerIsActive = false;
        },



        activateDeleteButtonSpinner : function(){

            this.deleteButtonSpinnerIsActive = true;
        },

        deactivateDeleteButtonSpinner : function(){

            this.deleteButtonSpinnerIsActive = false;
        },



        activateDeleteResponseDialog : function(){

            this.deleteResponseDialogIsActive = true;
        },

        deactivateDeleteResponseDialog : function(){

            this.deleteResponseDialogIsActive = false
        },

        activateDeleteConfirmationDialog : function(){

            this.deleteConfirmationDialogIsActive = true;
        },

        deactivateDeleteConfirmationDialog : function(){

            this.deleteConfirmationDialogIsActive = false;

        },


        telChanged : function(obj){
            
            this.currentCountryCode = "+" + obj.dialCode
        },

         getMainImageIndex : function(mainImage , images){

            return images.indexOf(mainImage)

         },

         isoDateWithoutTimeZone : function(date) {

            if (date == null) return date;

            var timestamp = date.getTime() - date.getTimezoneOffset() * 60000;

            var correctDate = new Date(timestamp);

            return correctDate.toISOString();

          },
  
          formatDataToSend : function (tourData){
              
              
              let tourDataFormatted  = Object.assign({} ,  tourData);

              let startHour = tourDataFormatted.tourStartHour ? tourDataFormatted.tourStartHour.split(":")[0] : new Date(this.tourStartDateToPreview).getHours() // 12:44 => [12,44] => 12

              let startMinute =  tourDataFormatted.tourStartHour ? tourDataFormatted.tourStartHour.split(":")[1] : new Date(this.tourStartDateToPreview).getMinutes()

              console.log(startHour)

              
              tourDataFormatted.tourStartDate = new Date(tourDataFormatted.tourStartDate)


  
              tourDataFormatted.tourStartDate.setHours(startHour)
  
              tourDataFormatted.tourStartDate.setMinutes(startMinute)

              console.log(tourDataFormatted.tourStartDate)

              tourDataFormatted.tourStartDate = this.isoDateWithoutTimeZone( tourDataFormatted.tourStartDate )

  
  
              let keys = Object.keys(tourDataFormatted["features[]"] );
  
              let features = [];

              tourDataFormatted.tourTitle = tourDataFormatted.name;

              tourDataFormatted.tourCountry = tourDataFormatted.country;

              tourDataFormatted.tourCity = tourDataFormatted.city;

              tourDataFormatted.tourCompany = tourDataFormatted.company;


              delete tourDataFormatted.name;
              delete tourDataFormatted.country;
              delete tourDataFormatted.city;
              delete tourDataFormatted.company;



              tourDataFormatted.tourDescription = tourDataFormatted.description;

              tourDataFormatted.tourPrice = tourDataFormatted.price;

             
              tourDataFormatted.countryCode = this.currentCountryCode

              tourDataFormatted.phoneNumber = this.currentCountryCode + tourDataFormatted.phoneNumber
  
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
              
              tourDataFormatted["imagesWillBeDeleted[]"] = this.imagesToDeleteFromServer;
  
  
              return tourDataFormatted;
  
          },
  
          loadCitiesByCountry : async function(){
  
              const { [this.tourData.country]:countryCities } =  await import('@/constants/citiesByCountry.json');
  
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

                      self.newUploadedImageCount++;
  
                  };
  
                  // read the image file as a data URL.
                  reader.readAsDataURL(input.files[x]);
              }
  
  
              this.extractImagesBinary(input);
  
  
          },
  
  
          makeMainImage: function(imgIndex) {


              this.mainImgIndex = imgIndex;

              let allImagesLength = this.uploadedImages.length;

              let imageCountFromServer = allImagesLength - this.newUploadedImageCount; // count of already uploaded images on the server side

              let realImgIndex = imgIndex - imageCountFromServer;


              if( this.uploadedImagesAsBinary.length > 0 && realImgIndex > -1 ){

                console.log(realImgIndex)

                this.mainImg = this.uploadedImagesAsBinary[realImgIndex];

              }else{

                console.log(imgIndex)

                let imgPath = this.uploadedImages[imgIndex].image;

                let indexOfImagesFolder = imgPath.indexOf("images/");

                let sliceStartIndex = indexOfImagesFolder + 7 //lengt of 'images/' string
    
                imgPath = imgPath.slice(sliceStartIndex)

                this.mainImg = imgPath;  // when assign main image fron already uploaded images on page load

              }
             
              this.openSnackBar("Əsas şəkil seçildi !" , "success");
  
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


          addToDeletedImagesList : function(imgPath){

            let indexOfImagesFolder = imgPath.indexOf("images/");

            let sliceStartIndex = indexOfImagesFolder + 7 //lengt of 'images/' string

            imgPath = imgPath.slice(sliceStartIndex)

            this.imagesToDeleteFromServer.push(imgPath)

          },
  
  
          deleteImage: function(imgIndex) {

            console.log( this.uploadedImages[imgIndex] )

            let allImagesLength = this.uploadedImages.length;

            let imageCountFromServer = allImagesLength - this.newUploadedImageCount; // count of already uploaded images on the server side

            if( imgIndex < imageCountFromServer  ){

                // if deleted image is string , it means that image is already uploaded before so add it to list to delete it on the server-side 

                this.addToDeletedImagesList( this.uploadedImages[imgIndex].image );


            }else{
                let realImgIndex = imgIndex - imageCountFromServer;
                this.uploadedImagesAsBinary.splice(realImgIndex,1)
                this.newUploadedImageCount--;
            }
  
              this.uploadedImages.splice(imgIndex, 1);
              this.mainImgIndex = -1
              this.mainImg = "";
  
          },
  
  
  /*      Image Upload Functions  Ends    */


        

            // formatDateTime used to make dateTimePicker work. it works only with yyyy-mm-dd format

            formatDateTime : function( dateTime ){

                if(!dateTime){
                    return
                }

                console.log(dateTime)

                dateTime = new Date(dateTime)

                console.log(dateTime)

                let day = dateTime.getDate();

                day+="";

                day = day.padStart(2,0)

                let month = dateTime.getMonth() + 1

                month +=""

                month = month.padStart(2,0)

                let year = dateTime.getFullYear();



                return `${year}-${month}-${day}`

            },

            extractTime : function(datetime){


                let dateTime = new Date(datetime)

                let hours = dateTime.getHours() + "";

                hours = hours.padStart(2,0);
    
                let minutes = dateTime.getMinutes() + "";
    
                minutes = minutes.padStart(2,0);

                return `${hours}:${minutes}`
            },

            formatDate : function( date ){

                date = new Date(date)

                let day = date.getDate();

                let month = this.monthNames[ date.getMonth() + 1 ];

                let year = date.getFullYear();

                return `${day} ${month} ${year}`

            },


            formatDataToPreview : function(data){

                
                let countryCodeEndIndex =  data[0].phoneNumber.indexOf( data[0].countryCode)

                let countryCodeLength =  data[0].countryCode.length;


                // to set vue-tel-input country code

                data[0].countryCode = data[0].phoneNumber



                countryCodeEndIndex += countryCodeLength
 
                data[0].phoneNumber =  data[0].phoneNumber.slice(countryCodeEndIndex)
                
                this.currentCountryCode = data[0].countryCode



                this.tourStartDateToPreview = data[0].tourStartDate;

                this.tourEndDateToPreview = data[0].tourEndDate

                data[0].tourStartDate = this.formatDateTime(data[0].tourStartDate)

                data[0].tourEndDate = this.formatDateTime(data[0].tourEndDate)



                data[0].tourStartHour = this.extractTime(this.tourStartDateToPreview) // for form validation else form validaiton will fail

                data[0].tourDescription = data[0].description; // for form validation else form validaiton will fail

                data[0].tourPrice = data[0].price; // for form validation else form validaiton will fail

                data[0].tourTitle = data[0].name; // for form validation else form validaiton will fail

                

                data[0].images = data[0].images.split("*");

                data[0].images.map(img => this.addToUploadedImages( API + 'images/' +  img))

                this.makeMainImage( this.getMainImageIndex( data[0].mainImage , data[0].images  ) )



                data[0]["features[]"] = this.tourData["features[]"]

                data[0].features = data[0].features.split("-");

                data[0].features.map( feature => data[0]["features[]"][feature] = true )

                delete data[0].features;


                data[0].travelPlans = JSON.parse( data[0].travelPlan )

                delete data[0].travelPlan

                return data[0]


            },
          

            getCurrentTourData : async function(){

                
                let tourId = this.$route.params.tourId;

                let apiUrl = "";

                let tourStatus = this.$route.query.status;

                if( tourStatus == "draft"){

                    apiUrl = API + `tour/${tourId}?status=draft`
                }else{
                    
                    apiUrl = API + `tour/${tourId}?status=publish`
                }

                let response = await axios.get(apiUrl)

                let data = response.data.result;

                


                this.tourData =  this.formatDataToPreview(data);

            },


        
            redirectAfterSuccessfullDelete : function(){

                setTimeout( () => this.$router.push( "/admin" ) , 1000 )
            },


        
          publishTour : function(){

            this.activatePublishButtonSpinner();

            this.debouncedPublishTour();

          },
  
  
          sendData : function(){

            this.$v.$touch();

            console.log(this.$v.$invalid);
            
            if (this.$v.$invalid) {

                this.formValidationHasError = true;

                return;
            }

            this.formValidationHasError = false;

            this.activateSaveButtonSpinner();

            this.debouncedSendData()
          },



        deleteTour : function(){

            this.activateDeleteButtonSpinner();

            this.debouncedDeleteTour();
        }

        



  
      },

  
      components:{VueTelInput},


      computed : {

        formatTourEndDate : function(){

            if(this.tourEndDateToPreview){

                return  this.formatDate(this.tourEndDateToPreview)
            }

        },



        formatTourStartDate : function(){

            if(this.tourStartDateToPreview){

                return  this.formatDate(this.tourStartDateToPreview)
            }

        },


        formatStartHour : function(){

            if(this.tourStartDateToPreview){

                return  this.extractTime(this.tourStartDateToPreview)
            }

        },


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
            !this.$v.tourData.phoneNumber.required && errors.push('Telefon boş ola bilməz !.')
            return errors
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
  
  
      async mounted() {
          const { default: countries } =  await import('@/constants/countries.json');
  
  
         this.selectDataCountry = countries;
  
      },


      created(){


          this.getCurrentTourData()

          this.debouncedDeleteTour = debounce( async function(){

            let apiUrl = "";

            let tourId = this.$route.params.tourId;

            let tourStatus = this.$route.query.status;

            if( tourStatus == "draft"){

                apiUrl = API + `tour/draft/${tourId}` 
            }else{
                
                apiUrl = API + `tour/${tourId}` 
            }

            let response = await axios.delete( apiUrl );

            let data = response.data;

            if( data.success ){

                this.deactivateDeleteButtonSpinner();

                this.deactivateDeleteConfirmationDialog();

                this.deleteResponseMessage = "Tur Uğurla silindi ! Yönləndirilir...."

                this.activateDeleteResponseDialog();

                this.redirectAfterSuccessfullDelete();


            }else{

                this.deactivateDeleteButtonSpinner();

                this.deactivateDeleteConfirmationDialog();

                this.deleteResponseMessage = "Tur Silinərkən Xəta Baş Verdi !";

                this.activateDeleteResponseDialog();
            
            }


        } , 500),


        this.debouncedSendData = debounce( async function(){
  
            let tourData  = this.formatDataToSend(this.tourData);

            let apiUrl = "";

            let tourId = this.$route.params.tourId;
            
            let tourStatus = this.$route.query.status;

            if( tourStatus == "draft"){

                apiUrl = API + `tour/draft/${tourId}` 
            }else{
                
                apiUrl = API + `tour/${tourId}`
            }


            let formData = makeFormdata(tourData);

            let response = await axios.put( apiUrl , formData )

            let data = response.data;

            this.deactivateSaveButtonSpinner();

            if( data.success ){

                this.openSnackBar( "Uğurla Dəyişildi !" , "success")

            }else{

                this.openSnackBar( "Xəta !" , "error")

            }
            
            }, 500 ),



        this.debouncedPublishTour = debounce ( async function(){

            
            let tourId = this.$route.params.tourId;

            let response = await axios.post( API + `tour/publish/${tourId}` );

            let data = response.data;

            if( data.success ){

                this.deactivatePublishButtonSpinner();

                this.openSnackBar( "Uğurla Paylaşıldı !" , "success")

                setTimeout( () => this.$router.push("/admin") , 1000 )


            }else{

                this.deactivatePublishButtonSpinner();

                this.openSnackBar( "Xəta Oldu !" , "error")
            
            }

        } , 500 )



      },

      watch : {

        "tourData.name" : function(){

            this.tourData.tourTitle = this.tourData.name
        },

        "tourData.price" : function(){

            this.tourData.tourPrice = this.tourData.price
        },

        "tourData.description" : function(){

            this.tourData.tourDescription = this.tourData.description
        },

         "tourData.country":function(){
             this.loadCitiesByCountry()
         },

         "tourData.tourStartHour": function(){

            let hour = this.tourData.tourStartHour.split(":")[0]

            let minute = this.tourData.tourStartHour.split(":")[1];

            let startDate = new Date(this.tourData.tourStartDate)

            startDate.setHours(hour)

            startDate.setMinutes(minute)

            this.tourStartDateToPreview = startDate;


         },

         "tourData.tourStartDate": function(){

            let startDate = new Date(this.tourData.tourStartDate)

            let year = startDate.getFullYear();

            let month = startDate.getMonth();

            let day = startDate.getDate();

            this.tourStartDateToPreview = new Date(this.tourStartDateToPreview)

            this.tourStartDateToPreview.setFullYear(year)

            this.tourStartDateToPreview.setMonth(month)

            this.tourStartDateToPreview.setDate(day)

         },

         "tourData.tourEndDate": function(){

            let endDate = new Date(this.tourData.tourEndDate)

            let year = endDate.getFullYear();

            let month = endDate.getMonth();

            let day = endDate.getDate();

            this.tourEndDateToPreview = new Date(this.tourEndDateToPreview)

            this.tourEndDateToPreview.setFullYear(year)

            this.tourEndDateToPreview.setMonth(month)

            this.tourEndDateToPreview.setDate(day)

         },



      }
  
      
  }
  
  