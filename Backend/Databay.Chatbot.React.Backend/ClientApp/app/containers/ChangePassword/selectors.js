import { createSelector } from 'reselect';
import { initialState } from './reducer';



const selectChangePassWord = state => state.changepassword || initialState;

const makeSelecOldPassWord = () =>
    createSelector(
        selectChangePassWord,
        changepasswordState => changepasswordState.old_password,
    );

const makeSelecNewPassWord = () =>
    
    createSelector(
        
        selectChangePassWord,
        changepasswordState => changepasswordState.new_password,
    );

const makeSelecConfirmPassWord = () =>
    createSelector(
        selectChangePassWord,
        changepasswordState => changepasswordState.confirm_password,
    );

const makeSelectIsHiddenPassword = () =>
    createSelector(
        selectChangePassWord,
        changepasswordState => changepasswordState.isHiddenPassword,
    );
export {
    makeSelecOldPassWord,
    makeSelecNewPassWord,
    makeSelecConfirmPassWord,
    makeSelectIsHiddenPassword, 
};