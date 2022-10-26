const API = process.env.VUE_APP_APIURL;

const BASE = process.env.VUE_APP_BASEURL

import { debounce } from "debounce";

import axios from "axios";

export default{

    name : "AdminVipTours",

    data: function(){

        return {

            base:BASE,


            currentSnackbarType : "success", // success/error

            snackbarMessage: "",

            snackbarOpened: false,

            spinnerIsActive : false,

            search :"",

            lastPage : 0,

            start : 0,
            limit : 20,

            headers : [

                { text: 'Id', value: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'Country', value: 'country' },
                { text: 'Status', value: 'status' },
                { text: 'Delete', value: 'delete' , align : "center"},

                
            
            ],


            currentDeletedTour : "",

            currentDeleteTourIndex : "", // to remove from array after successfull delete

            deleteDialogIsActive : false,

            deleteButtonSpinnerIsActive : false,


            newVipTour : {

                tourId : "",
                vipTourDays : ""
            },

            vipTours : []


        }
    },

    methods : {

        openSnackBar( message = "success" , type ) {

            this.currentSnackbarType = type;

            this.snackbarMessage = message;

            this.snackbarOpened = true;

        },

        activateSpinner : function(){

            this.spinnerIsActive = true
        },

        deactivateSpinner : function(){

            this.spinnerIsActive = false
        },

        onPageUpdate : async function(currentPage){

            if( currentPage > this.lastPage ){

                this.lastPage = currentPage

                console.log(currentPage , this.lastPage)

                let response =  await axios.get( API + `tour/vipTour/all?start=${this.start}&limit=${this.limit}` )

                let data = response.data.result;


                if ( data && data.length > 0) {



                    this.start+=20;
    
                    this.vipTours.push(...data);

                }

            }

        },

        getAllVipTours : async function(){


            let response =  await axios.get( API + `tour/vipTour/all?start=${this.start}&limit=${this.limit}` )

            let data = response.data.result;

            if( data && data.length > 0){

                this.start += 20;

                this.vipTours = data



            }



        },


        openDeleteDialog : function( tour , index ){

            this.currentDeletedTour = tour;

            this.currentDeleteTourIndex = index;

            this.deleteDialogIsActive = true;


        },


        closeDeleteDialog : function(){


            this.deleteDialogIsActive = false;


        },


        activateDeleteDialogSpinner : function(){

            this.deleteButtonSpinnerIsActive = true
        },


        deactivateDeleteDialogSpinner : function(){

            this.deleteButtonSpinnerIsActive = false
        },


        deleteTour : function(){

            this.activateDeleteDialogSpinner();

            this.debouncedDeleteTour();


        },


        sendData : function(){

            this.activateSpinner();

            this.debouncedSendData();
        }




        // onSearch : async function(){


        //     let response = await axios.get(API + `tour/all/${this.search}`)

        //     let data = response.data.result;

        //     console.clear();

        //     console.log(data)

        //     this.tours = data



        // }


    },



    created () {

        this.getAllVipTours(),

        this.debouncedSendData = debounce( async function(){

            try{

            
                let response =  await axios.post( API + `tour/vipTour/${this.newVipTour.tourId}` , this.newVipTour );

                let data = response.data;

                this.deactivateSpinner();

                if( data.success ){

                    this.vipTours.push(data.result);

                    this.openSnackBar("Uğurla əlavə edildi !" , "success")

                    
                }else{

                    this.openSnackBar("Xəta baş verdi !" , "error")
                }

            }catch(error){

                let errorMsg = error.response ? error.response.data.errors[0]  : error

                this.deactivateSpinner();


                this.openSnackBar( errorMsg , "error")

            }







        }  , 100 ),

        
        this.debouncedDeleteTour = debounce( async function(){

            try{

                let response = await axios.delete( API + `tour/vipTour/${this.currentDeletedTour.id}` );

                let data = response.data;

                this.deactivateDeleteDialogSpinner();

                this.closeDeleteDialog();

                if( data.success ){

                    this.vipTours.splice(this.currentDeleteTourIndex , 1);

                    this.openSnackBar("Uğurla silindi !" , "success")

                    
                }else{

                    this.openSnackBar("Xəta baş verdi !" , "error")
                }



            }catch(error){

                let errorMsg = error.response ? error.response.data.errors[0]  : error

                this.deactivateSpinner();


                this.openSnackBar( errorMsg , "error")

            }

            
        } , 100)


    }


}