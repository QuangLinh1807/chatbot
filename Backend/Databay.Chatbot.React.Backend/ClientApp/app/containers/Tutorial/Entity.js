import React, { useEffect, memo, useState } from 'react';

import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
//import './ToggleAdd.css';
import {
    makeSelectEntitiesType,

} from './selectors';
import {
    //loadEntityTypeRequest,
    changeEntityTypeName,
    addEntityRequest,
    getEntityText,
    //loadEntityRequest
} from './actions';

const key = 'tutorial';


export function Entity({
    entityTypes,
    entityTypeId,
    cat,
    onLoadEntityTypes,
    onSelectChange
}) {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    useEffect(() => {
        //onLoadEntityTypes();
    }, []);

    //var entityTypesData = entityTypes.data || [];
    //let entityTypesDataOption = entityTypesData.map((item) =>
    //    <option value={item.internalId}>{item.name}</option>
    //)
    console.log(cat);
    return (
        <div className='row entityStyle' data-entityid={cat.internalId} data-entityname={cat.name}>
            <div className="col">{cat.name}</div>
            <div className="col">
                <select value={cat.entityTypeId} onChange={onSelectChange}>
                    <option></option>
                    {entityTypesDataOption}
                </select>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    //entityTypes: makeSelectEntitiesType(),
});
export function mapDispatchToProps(dispatch) {
    return {
        //onLoadEntityTypes: evt => {
        //    dispatch(loadEntityTypeRequest());
        //},
        onSelectChange: evt => {
            dispatch(changeEntityTypeName(evt.target.value));
            var entityId = evt.target.closest('.entityStyle').attributes['data-entityid'].value;
            var entityName = evt.target.closest('.entityStyle').attributes['data-entityname'].value;
            var entity = {
                internalId: entityId,
                name: entityName,
                entityTypeId: evt.target.value
            }
            dispatch(getEntityText(entity));
            dispatch(addEntityRequest());
            //setTimeout(() => {
            //    dispatch(loadEntityRequest());
            //}, 100);
        },
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(Entity);
