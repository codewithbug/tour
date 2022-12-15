import { required , numeric , email } from 'vuelidate/lib/validators';

import isMobilePhone from 'validator/es/lib/isMobilePhone';

const validatePhoneNumber = ( value , tourData) => isMobilePhone( tourData.countryCode + value , "any", {strictMode:true} )

var validations = {

    tourData : {

        tourTitle : {required} , 

        tourDescription : {required} , 

        tourPrice : {required , numeric} , 

        tourStartDate : {required } ,

        tourStartHour : {required } ,

        tourEndDate : {required } , 

        phoneNumber : {required , validatePhoneNumber } , 

        email : { required , email } , 
    }
}

export { validations }