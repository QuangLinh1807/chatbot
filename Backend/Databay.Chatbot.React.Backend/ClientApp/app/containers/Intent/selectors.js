import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectIntent = state => state.intent || initialState;

const makeSelectSubmited = () =>
    createSelector(
        selectIntent,
        intentState => intentState.submited,
    );

//const makeSelectName = () =>
//    createSelector(
//        selectIntent,
//        intentState => intentState.name,
//    );

//const makeSelectDesc = () =>
//    createSelector(
//        selectIntent,
//        intentState => intentState.description,
//    );

const makeSelectIntent = () =>
    createSelector(
        selectIntent,
        intentState => intentState.intent,
    );

const makeSelectErrors = () =>
    createSelector(
        selectIntent,
        intentState => intentState.error,
    );

const makeSelectModal = () =>
    createSelector(
        selectIntent,
        intentState => intentState.modal,
    );

const makeSelectID = () =>
    createSelector(
        selectIntent,
        intentState => intentState.id,
    );

const makeSelectIntents = () =>
    createSelector(
        selectIntent,
        intentState => intentState.intents,
    );

const makeSelectColumns = () =>
    createSelector(
        selectIntent,
        intentState => intentState.columns,
    );

const makeSelectPage = () =>
    createSelector(
        selectIntent,
        intentState => intentState.page,
    );

const makeSelectSizePerPage = () =>
    createSelector(
        selectIntent,
        intentState => intentState.sizePerPage,
    );

const makeSelectTotalSize = () =>
    createSelector(
        selectIntent,
        intentState => intentState.totalSize,
    );

const makeSelectSearch = () =>
    createSelector(
        selectIntent,
        intentState => intentState.search,
    );

const makeSelectOrderColumn = () =>
    createSelector(
        selectIntent,
        intentState => intentState.orderColumn,
    );

const makeSelectOrder = () =>
    createSelector(
        selectIntent,
        intentState => intentState.order,
    );


// ------------ for response ---------------------------

const makeSelectResponseModal = () =>
    createSelector(
        selectIntent,
        intentState => intentState.responseModal,
    );


const makeSelectText = () =>
    createSelector(
        selectIntent,
        intentState => intentState.text,
    );


const makeSelectImage = () =>
    createSelector(
        selectIntent,
        intentState => intentState.image,
    );


const makeSelectType = () =>
    createSelector(
        selectIntent,
        intentState => intentState.type,
    );

const makeSelectResponseID = () =>
    createSelector(
        selectIntent,
        intentState => intentState.responseId,
    );

const makeSelectResponseDetailID = () =>
    createSelector(
        selectIntent,
        intentState => intentState.responseDetailId,
    );

const makeSelectResponses = () =>
    createSelector(
        selectIntent,
        intentState => intentState.responses,
    );

const makeSelectResponseComponents = () =>
    createSelector(
        selectIntent,
        intentState => intentState.responseComponents,
    );

const makeSelectCollapseResponse = () =>
    createSelector(
        selectIntent,
        intentState => intentState.collapse,
    );

const makeSelectResponse = () =>
    createSelector(
        selectIntent,
        intentState => intentState.response,
    );
const makeSelectResponseDetail = () =>
    createSelector(
        selectIntent,
        intentState => intentState.responseDetail,
    );

const makeResponseDetailtext = () =>
    createSelector(
        selectIntent,
        intentState => intentState.responseDetailtext,
    );

const makeSelectIsEnableAddResponse = () =>
    createSelector(
        selectIntent,
        intentState => intentState.isEnableAddResponse,
    );
const makeSelectIsEnableAddResponseDetail = () =>
    createSelector(
        selectIntent,
        intentState => intentState.isEnableAddResponseDetail,
    );
const makeSelectIntentSelectList = () =>
    createSelector(
        selectIntent,
        intentState => intentState.intentSelectList,
    );
const makeSelectSelectIntentId = () =>
    createSelector(
        selectIntent,
        intentState => intentState.selectIntentId,
    );
const makeSelectUploadFile = () =>
    createSelector(
        selectIntent,
        tutorialBotState => tutorialBotState.uploadFile,
    );

const makeSelectUploadedFile = () =>
    createSelector(
        selectIntent,
        tutorialBotState => tutorialBotState.uploadedFile,
    );

const makeSelectResponseDetailType = () =>
    createSelector(
        selectIntent,
        tutorialBotState => tutorialBotState.responseDetailType,
    );
const makeSelectToast = () =>
    createSelector(
        selectIntent,
        tutorialBotState => tutorialBotState.Toast,
    );

export {
    selectIntent,
    makeSelectSubmited,
    //makeSelectName,
    //makeSelectDesc,
    makeSelectIntent,
    makeSelectErrors,
    makeSelectModal,
    makeSelectID,
    makeSelectIntents,
    makeSelectColumns,
    makeSelectPage,
    makeSelectSizePerPage,
    makeSelectTotalSize,
    makeSelectSearch,
    makeSelectOrderColumn,
    makeSelectOrder,
    makeSelectResponseModal,
    makeSelectResponseID,
    makeSelectResponses,
    makeSelectResponse,
    makeSelectText,
    makeSelectImage,
    makeSelectType,
    makeSelectResponseComponents,
    makeSelectCollapseResponse,
    makeSelectResponseDetail,
    makeResponseDetailtext,
    makeSelectIsEnableAddResponse,
    makeSelectIsEnableAddResponseDetail,
    makeSelectIntentSelectList,
    makeSelectSelectIntentId,
    makeSelectResponseDetailID,

    makeSelectUploadFile,
    makeSelectUploadedFile,
    makeSelectResponseDetailType,
    makeSelectToast
};
