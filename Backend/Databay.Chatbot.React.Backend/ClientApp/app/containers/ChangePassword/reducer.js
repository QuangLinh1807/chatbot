import produce from 'immer';

import {
    OLD_PASSWORD_CHANGE,
    NEW_PASSWORD_CHANGE,
    CONFIRM_PASSWORD_CHANGE,
    FORGOT_PASSWORD_UPDATE_REQUEST,
    FORGOT_PASSWORD_UPDATE_SUCCESS,
    FORGOT_PASSWORD_UPDATE_FAILURE,
    HIDDEN_PASSWORD
} from './constants';
function resetState(draft) {
    draft.isHiddenPassword = true;
    draft.password = '';
}
export const initialState = {

    old_password: '',
    new_password: '',
    confirm_password: '',
    password: '',
    isHiddenPassword: true,


};

const changePasswordReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {

            case OLD_PASSWORD_CHANGE:
                draft.old_password = action.old_password;
                break;

            case NEW_PASSWORD_CHANGE:
                debugger;
                draft.new_password = action.new_password;
                break;

            case CONFIRM_PASSWORD_CHANGE:
                draft.confirm_password = action.confirm_password;
                break;

            case FORGOT_PASSWORD_UPDATE_REQUEST:
                break;

            case FORGOT_PASSWORD_UPDATE_SUCCESS:
                draft.password = action.password;
                break;

            case FORGOT_PASSWORD_UPDATE_FAILURE:
                draft.error = action.error;
                break;
            case HIDDEN_PASSWORD:
                debugger;
                resetState(draft);
                draft.isHiddenPassword = !draft.isHiddenPassword;
                break;
        }

    });


export default changePasswordReducer;
