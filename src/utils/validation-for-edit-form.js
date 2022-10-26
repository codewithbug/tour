import { required , numeric , email } from 'vuelidate/lib/validators';

var editFormValidations = {

    tourData : {

        name : {required} , 

        description : {required} , 

        price : {required , numeric} , 

        tourStartDate : {required } ,

        tourStartHour : {required } ,

        tourEndDate : {required } , 

        phoneNumber : {required  } , 

        email : { required , email } , 
    }
}

export { editFormValidations }