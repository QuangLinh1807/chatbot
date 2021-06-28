import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTutorialBot = state => state.tutorial || initialState;

const makeSelectBusinessField = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.BusinessField,
    );

const makeSelectStep = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.step,
    );

const makeSelectStyles = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.styles,
    );

//add tutorial bot
const makeSelectTutorialBotName = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.bot_name,
    );
const makeSelectTutorialBotDescription = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.bot_description,
    );

const makeSelectIsEnableTutorialBot = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.makeSelectIsEnableTutorialBot,
    );


//add intent
const makeSelectIntentName = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.intent_name,
    );

const makeSelectIsEnableIntent = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.makeSelectIsEnableIntent,
    );

//add pattern
const makeSelectPatternTemplateSentence = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.pattern_templatesentence,
    );

const makeSelectIsEnablePattern = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.makeSelectIsEnablePattern,
    );

//add entity type
const makeSelectEntityTypeName = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.entitytype_name,
    );

const makeSelectIsEnableEntityType = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.makeSelectIsEnableEntityType,
    );

//select entity
const makeSelectEntityText = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.entityText,
    );
const makeSelectEntities = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.Entities,
    );
const makeSelectEntity = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.entity,
    );

//add response && response detail
const makeSelectText = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.text,
    );


const makeSelectImage = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.image,
    );


const makeSelectType = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.type,
    );

const makeSelectResponseID = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.responseId,
    );

const makeSelectResponseDetailID = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.responseDetailId,
    );

const makeSelectResponses = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.responses,
    );

const makeSelectResponseComponents = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.responseComponents,
    );

const makeSelectResponse = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.response,
    );
const makeSelectResponseDetail = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.responseDetail,
    );

const makeResponseDetailtext = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.responseDetailtext,
    );

const makeSelectIsEnableAddResponse = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.isEnableAddResponse,
    );
const makeSelectIsEnableAddResponseDetail = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.isEnableAddResponseDetail,
    );

const makeSelectTutorialBotID = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.bot_id,
    );

const makeSelectTutorialIntentID = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.intent_id,
    );

const makeSelectTutorialPatternID = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.pattern_id,
    );

const makeSelectEntitytypeId = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.entitytypeId,
    );

const makeSelectUploadFile = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.uploadFile,
    );

const makeSelectUploadedFile = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.uploadedFile,
    );

const makeSelectResponseDetailType = () =>
    createSelector(
        selectTutorialBot,
        tutorialBotState => tutorialBotState.responseDetailType,
    );

export {
    selectTutorialBot,
    makeSelectBusinessField,
    makeSelectStep,
    makeSelectStyles,

    //add tutorial bot
    makeSelectTutorialBotName,
    makeSelectTutorialBotDescription,
    makeSelectIsEnableTutorialBot,

    //add intent
    makeSelectIntentName,
    makeSelectIsEnableIntent,

    //add pattern
    makeSelectPatternTemplateSentence,
    makeSelectIsEnablePattern,

    //add entity type
    makeSelectEntityTypeName,
    makeSelectIsEnableEntityType,

    //select entity
    makeSelectEntityText,
    makeSelectEntities,
    makeSelectEntity,

    //add response $$ add response detail
    makeSelectText,
    makeSelectImage,
    makeSelectType,
    makeSelectResponses,
    makeSelectResponseComponents,
    makeSelectResponseDetail,
    makeResponseDetailtext,
    makeSelectIsEnableAddResponse,
    makeSelectIsEnableAddResponseDetail,
    makeSelectResponseDetailID,

    makeSelectTutorialBotID,
    makeSelectTutorialIntentID,
    makeSelectTutorialPatternID,

    makeSelectResponseID,
    makeSelectResponse,

    makeSelectEntitytypeId,

    makeSelectUploadFile,
    makeSelectUploadedFile,
    makeSelectResponseDetailType
};
