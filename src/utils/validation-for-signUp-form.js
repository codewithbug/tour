import { required  , email } from 'vuelidate/lib/validators';

import isMobilePhone from 'validator/es/lib/isMobilePhone';

import isStrongPassword from 'validator/es/lib/isStrongPassword';

const validatePhoneNumber = value => isMobilePhone(value , "any", {strictMode:true} )

const strongPassword = value => isStrongPassword(value , { minLength: 0, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })

const validPasswordLength = value =>  value.length > 6 && value.length <= 20

const passwordsAreSame = (value , siblings  ) => value == siblings.password


var validations = {

    userData : {

        name : {required} ,
        
        password : {required , strongPassword , validPasswordLength},

        confirmPassword : {required , strongPassword , validPasswordLength , passwordsAreSame},

        surname : {required} , 

        phoneNumber : {required  } , 

        fullPhoneNumber : {validatePhoneNumber} ,

        email : { required , email } , 
    }
}

export { validations }