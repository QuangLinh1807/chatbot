import React, { useEffect, memo, useState } from 'react';

import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import './ToggleAdd.css';
import Delete from '../../images/delete-icon.png';
import {
    makeSelectEntitiesType,
    //makeSelectDataTransform

} from './selectors';
import {
    loadEntityTypeRequest,
    changeEntityType,
    addEntity,
    getEntity,
    loadEntityRequest,

    //editPatternRequest,

    deleteEntityRequest
} from './actions';

const key = 'pattern';

export function Entity({
    entityTypes,
    entityTypeId,
    cat,
    onLoadEntityTypes,
    onSelectChange,
    onDeleteEntity,
    dataTransform
}) {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    useEffect(() => {
        //debugger;
        onLoadEntityTypes();
    }, []);

    var entityTypesData = entityTypes.data || [];
    let entityTypesDataOption = entityTypesData.map((item) =>
        <option value={item.internalId}>{item.name}</option>
    )
    //console.log(cat);
    return (
        <div className='row entityStyle' data-entityid={cat.internalId} data-entityname={cat.name}>
            <div className="col">{cat.name}</div>
            <div className="col">
                <select value={cat.entityTypeId} onChange={(evt) => {
                    onSelectChange(evt);
                }} className='entitySelection'>
                    <option></option>
                    {entityTypesDataOption}
                </select>
                
            </div>
            <button onClick={onDeleteEntity}><img className="img-delete" src={Delete} /></button>

        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    entityTypes: makeSelectEntitiesType(),
    //dataTransform: makeSelectDataTransform()

});
export function mapDispatchToProps(dispatch) {
    return {
        onLoadEntityTypes: evt => {
            dispatch(loadEntityTypeRequest());
        },
        onSelectChange: evt => {
            //debugger;
            dispatch(changeEntityType(evt.target.value));
            
            var entityId = evt.target.closest('.entityStyle').attributes['data-entityid'].value;
            var entityName = evt.target.closest('.entityStyle').attributes['data-entityname'].value;
            var entity = {
                internalId: entityId,
                name: entityName,
                entityTypeId: evt.target.value
            }
            dispatch(getEntity(entity));
            dispatch(addEntity());
            setTimeout(() => {
                dispatch(loadEntityRequest());
            }, 100);
        },
        onDeleteEntity: evt => {
            debugger;
            var entityId = evt.target.closest('.entityStyle').attributes['data-entityid'].value;
            var entityName = evt.target.closest('.entityStyle').attributes['data-entityname'].value;
            var entity = {
                internalId: entityId,
                name: entityName,
                //entityTypeId: evt.target.value
            }
            dispatch(getEntity(entity));
            dispatch(deleteEntityRequest());
            setTimeout(() => {
                dispatch(loadEntityRequest());
            }, 100);
            
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
