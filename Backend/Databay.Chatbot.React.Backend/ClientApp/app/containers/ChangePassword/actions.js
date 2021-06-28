
import {
    OLD_PASSWORD_CHANGE,
    NEW_PASSWORD_CHANGE,
    CONFIRM_PASSWORD_CHANGE,
    FORGOT_PASSWORD_UPDATE_REQUEST,
    FORGOT_PASSWORD_UPDATE_SUCCESS,
    FORGOT_PASSWORD_UPDATE_FAILURE,
    HIDDEN_PASSWORD
} from './constants';



export function changeOldPassWord(old_password) {
    return {
        type: OLD_PASSWORD_CHANGE,
        old_password
    };
}


export function changeNewPassWord(new_password) {
    //debugger;
    return {
        type: NEW_PASSWORD_CHANGE,
        new_password
    };
}

export function changeConfirmPassWord(confirm_password) {
    return {
        type: CONFIRM_PASSWORD_CHANGE,
        confirm_password
    };
}

export function changePassWordRequest() {
    return {
        type: FORGOT_PASSWORD_UPDATE_REQUEST,
        
    };
}

export function changedPassWordSuccess(password) {
    return {
        type: FORGOT_PASSWORD_UPDATE_SUCCESS,
        password
    };
}

export function changePassWordError(error) {
    return {
        type: FORGOT_PASSWORD_UPDATE_FAILURE,
        error
    };
}
export function hiddenPassword() {
    return {
        type: HIDDEN_PASSWORD,
    };
}
