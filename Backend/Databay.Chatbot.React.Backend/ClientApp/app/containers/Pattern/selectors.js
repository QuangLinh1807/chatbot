import { createSelector } from 'reselect';
import { initialState } from './reducer';

// file create selections for reducer

const selectPattern = state => state.pattern || initialState;
//const selectIntent = state => state.intent || initialState;


const makeSelectSubmited = () =>
    createSelector(
        selectPattern,
        patternState => patternState.submited,
    );


const makeSelectTemplateSentence = () =>
    createSelector(
        
        selectPattern,
        patternState => patternState.templateSentence,
    );


const makeSelectPattern = () =>
    createSelector(
        selectPattern,
        patternState => patternState.pattern,
    );

const makeSelectErrors = () =>
    createSelector(
        selectPattern,
        patternState => patternState.error,
    );

const makeSelectModal = () =>
    createSelector(
        selectPattern,
        patternState => patternState.modal,
    );
const makeSelectPatternSelectList = () =>
    createSelector(
        selectPattern,
        patternState => patternState.patternSelectList,
    );
const makeSelectID = () =>
    createSelector(
        selectPattern,
        patternState => patternState.id,
    );

const makeSelectPatterns = () =>
    createSelector(
        
        selectPattern,
        patternState => patternState.patterns,
    );

const makeSelectColumns = () =>
    createSelector(
        selectPattern,
        patternState => patternState.columns,
    );
const makeSelectPage = () =>
    createSelector(
        selectPattern,
        patternState => patternState.page,
    );

const makeSelectSizePerPage = () =>
    createSelector(
        selectPattern,
        patternState => patternState.sizePerPage,
    );

const makeSelectTotalSize = () =>
    createSelector(
        selectPattern,
        patternState => patternState.totalSize,
    );

const makeSelectSearch = () =>
    createSelector(
        selectPattern,
        patternState => patternState.search,
    );

const makeSelectOrderColumn = () =>
    createSelector(
        selectPattern,
        patternState => patternState.orderColumn,
    );

const makeSelectOrder = () =>
    createSelector(
        selectPattern,
        patternState => patternState.order,
    );


const makeSelectEntityText = () =>
    createSelector(
        selectPattern,
        patternState => patternState.entityText,
    );

const makeSelectEntities = () =>
    createSelector(
        selectPattern,
        patternState => patternState.Entities,
    );


const makeSelectEntity = () =>
    createSelector(
        selectPattern,
        patternState => patternState.entity,
    );

const makeSelectIntentID = () =>
    createSelector(
        selectPattern,
        patternState => patternState.intentId,
    );

const makeSelectEntitiesType = () =>
    createSelector(
        selectPattern,
        patternState => patternState.entityTypes,
    );
const makeSelectIntentSelectList = () =>
    createSelector(
        selectPattern,
        intentState => intentState.intentSelectList,
    );
const makeSelectEntityModal = () =>
    createSelector(
        selectPattern,
        patternState => patternState.entityModal,
    );
//const makeSelectSelectIntentId = () =>
//    createSelector(
//        selectPattern,
//        intentState => intentState.selectIntentId,
//    );

const makeSelectEntityType = () =>
    createSelector(
        selectPattern,
        patternState => patternState.entityTypeId,
    );

//const makeSelectIntents = () =>
//    createSelector(
//        selectIntent,
//        intentState => intentState.intents,
//    );

const makeSelectDataTransform = () =>
    createSelector(
        selectPattern,
        patternState => patternState.dataTransform,
    );
export {
    //selectIntent,
    selectPattern,
    makeSelectSubmited,
    makeSelectTemplateSentence,
    makeSelectPattern,
    makeSelectErrors,
    makeSelectModal,
    makeSelectID,
    
    makeSelectPatterns,
    makeSelectColumns,
    makeSelectPage,
    makeSelectSizePerPage,
    makeSelectTotalSize,
    makeSelectSearch,
    makeSelectOrderColumn,
    makeSelectOrder,
    makeSelectEntityText,
    makeSelectEntities,
    makeSelectEntity,
    makeSelectIntentID,
    makeSelectEntitiesType,
    makeSelectIntentSelectList,
    makeSelectPatternSelectList,
    makeSelectEntityModal,
    //makeSelectSelectIntentId,
    //makeSelectIntents,
    makeSelectEntityType,
    makeSelectDataTransform
};
