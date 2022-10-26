import { required , numeric , email } from 'vuelidate/lib/validators';

var validations = {

    tourData : {

        tourTitle : {required} , 

        tourDescription : {required} , 

        tourPrice : {required , numeric} , 

        tourStartDate : {required } ,

        tourStartHour : {required } ,

        tourEndDate : {required } , 

        phoneNumber : {required  } , 

        email : { required , email } , 
    }
}

export { validations }