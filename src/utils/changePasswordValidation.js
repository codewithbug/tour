import { required  } from 'vuelidate/lib/validators';

import isStrongPassword from 'validator/es/lib/isStrongPassword';

const strongPassword = value => isStrongPassword(value , { minLength: 0, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })

const validPasswordLength = value =>  value.length > 6 && value.length <= 20

const passwordsAreSame = (value , siblings  ) => value == siblings.newPassword


var validations = {

    passwordData : {

        currentPassword : {required},
        newPassword : {required  , strongPassword , validPasswordLength},
        newPasswordConfirm : {required , strongPassword , validPasswordLength , passwordsAreSame},

    }
}

export { validations }