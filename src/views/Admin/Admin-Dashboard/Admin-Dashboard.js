const API = process.env.VUE_APP_APIURL;

const BASE = process.env.VUE_APP_BASEURL



import axios from "axios";

export default {

    name : "Dashboard",

    data: function(){

        return {

            base:BASE,

            search :"",

            lastPage : 0,

            start : 0,
            limit : 20,

            headers : [

                { text: 'Id', value: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'Country', value: 'country' },
                { text: 'Status', value: 'status' },
                { text: 'Edit', value: 'edit' , align : "center"},

                
            
            ],

            tours : []


        }
    },

    methods : {

        onPageUpdate : async function(currentPage){

            if( currentPage > this.lastPage ){

                this.lastPage = currentPage

                console.log(currentPage , this.lastPage)

                let response =  await axios.get( API + `tour?start=${this.start}&limit=${this.limit}` )

                let data = response.data.result;


                if ( data && data.length > 0) {



                    this.start+=20;
    
                    this.tours.push(...data);

                }

            }

        },

        getAllTours : async function(){


            let response =  await axios.get( API + `tour/all?start=${this.start}&limit=${this.limit}` )

            let data = response.data.result;

            if( data && data.length > 0){

                this.start += 20;

                this.tours = data



            }



        },




        onSearch : async function(){


            let response = await axios.get(API + `tour/all/${this.search}`)

            let data = response.data.result;


            this.tours = data



        }


    },



    created () {

        this.getAllTours()
    }


}