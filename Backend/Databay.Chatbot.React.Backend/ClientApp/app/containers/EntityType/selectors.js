import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEntityType = state => state.entityType || initialState;

const makeSelectSubmited = () =>
    createSelector(
        selectEntityType,
        entityTypeState => entityTypeState.submited,
    );

//const makeSelectName = () =>
//    createSelector(
//        selectEntityType,
//        entityTypeState => entityTypeState.name,
//    );

//const makeSelectDesc = () =>
//    createSelector(
//        selectEntityType,
//        entityTypeState => entityTypeState.description,
//    );

const makeSelectEntityType = () =>
    createSelector(
        selectEntityType,
        entityTypeState => entityTypeState.entityType,
    );

const makeSelectErrors = () =>
    createSelector(
        selectEntityType,
        entityTypeState => entityTypeState.error,
    );

const makeSelectModal = () =>
    createSelector(
        selectEntityType,
        entityTypeState => entityTypeState.modal,
    );

const makeSelectID = () =>
    createSelector(
        selectEntityType,
        entityTypeState => entityTypeState.id,
    );

const makeSelectEntityTypes = () =>
    createSelector(
        selectEntityType,
        entityTypeState => entityTypeState.entityTypes,
    );

const makeSelectColumns = () =>
    createSelector(
        selectEntityType,
        entityTypeState => entityTypeState.columns,
    );

const makeSelectPage = () =>
    createSelector(
        selectEntityType,
        entityTypeState => entityTypeState.page,
    );

const makeSelectSizePerPage = () =>
    createSelector(
        selectEntityType,
        entityTypeState => entityTypeState.sizePerPage,
    );

const makeSelectTotalSize = () =>
    createSelector(
        selectEntityType,
        entityTypeState => entityTypeState.totalSize,
    );

const makeSelectSearch = () =>
    createSelector(
        selectEntityType,
        entityTypeState => entityTypeState.search,
    );

const makeSelectOrderColumn = () =>
    createSelector(
        selectEntityType,
        entityTypeState => entityTypeState.orderColumn,
    );

const makeSelectOrder = () =>
    createSelector(
        selectEntityType,
        entityTypeState => entityTypeState.order,
    );

export {
    selectEntityType,
    makeSelectSubmited,
    //makeSelectName,
    //makeSelectDesc,
    makeSelectEntityType,
    makeSelectErrors,
    makeSelectModal,
    makeSelectID,
    makeSelectEntityTypes,
    makeSelectColumns,
    makeSelectPage,
    makeSelectSizePerPage,
    makeSelectTotalSize,
    makeSelectSearch,
    makeSelectOrderColumn,
    makeSelectOrder
};
