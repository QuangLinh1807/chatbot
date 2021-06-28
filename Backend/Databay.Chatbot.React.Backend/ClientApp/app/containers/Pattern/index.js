import React, { useEffect, memo, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import paginator from 'react-bootstrap-table2-paginator';
//import cellEditFactory from 'react-bootstrap-table2-editor';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './SystemTable.css';
//import Update from './Update';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
//import GlobalStyle from '../../global-styles';

//import Create from './Create';
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input, FormText, Table } from 'reactstrap';

import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
//import EditPatternModal from './EditPatternModal';
import { makeSelectBot } from '../App/selectors';
import {
    makeSelectPattern,
    makeSelectModal,
    makeSelectErrors,
    makeSelectPatterns,
    //makeSelectColumns,
    //makeSelectTemplateSentence,
    //makeSelectEditModal,
    makeSelectID,
    makeSelectPage,
    makeSelectSizePerPage,
    makeSelectTotalSize,
    makeSelectEntityText,
    makeSelectEntities,
    makeSelectIntentID,
    makeSelectEntitiesType,
    makeSelectIntentSelectList,
    //makeSelectSelectIntentId,
    makeSelectIntents,
    //makeSelectEntityModal
} from './selectors';
import {
    loadPatternRequest, changePattern, onToggle, getPatternRequest, changeTemplateSentence, editPatternRequest,
    deletePatternRequest, changeOrderColumn, changePage, changeSearch, changeSizePerPage, changeOrder,
    entityGetText, addEntity,
    getIntentId,
    loadEntityTypeRequest,
    getIntentSelectListRequest,
    changeSelectIntentId,
    loadEntityRequest
} from './actions'; 
import { getBot } from '../App/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input, FormText, Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';

import './ToggleAdd.css';
import './stylePattern.css';
//import Entity from './Entity';
import EntityList from './EntityList';
import edit from '../../images/edit-icon.png';
import Delete from '../../images/delete-icon.png';
import search from '../../images/search-icon.png';
import Validator from 'utils/validator';

import example_icon from '../../images/example-icon.png';
const key = 'pattern';

export function Pattern({
    pattern,
    patterns,
    modal,
    page,
    sizePerPage,
    totalSize,
    match,
    onLoad,
    onTableChange,
    onToggle,
    onAddNew,
    onSubmitForm,
    
    onLoadPattern,
    onChangePattern,
    onChangeTemplateSentence,
    onDelete,
    onGetBot,
    onSearchChange,
    oneGetSelectionText,
    entityText,
    patternId,
    Entities,
    onAddEntity,
    onGetEntity,
    intentId,
    onGetIntentID,
    entitiesType,
    onChangeSelectIntent,
    intentSelectList,
    onLoadIntentSelectList,
    onLoadEntities,
    //id,
    //selectIntentId,
    //entityModal,
    templateSentence,
    //botId,
    //submitted,
    //columns,
    //pagination,
    //editmodal,
    //EditModal,
    //intents,

}) {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [iscreate, setIsCreate] = useState(true);

    const rules = [
        {
            field: 'templatesentence',
            method: 'isEmpty',
            validWhen: false,
            message: 'Câu mẫu không được để trống',
        },
        {
            field: 'intent',
            method: 'isEmpty',
            validWhen: false,
            message: 'Ý định không được để trống',
        }

    ];

    var actionsFormatter = (cell, row) => {
        //debugger;
        function deleteRow() {
            var answer = confirm("Bạn thực sự muốn xóa ?")
            if (answer) {
                onGetIntentID(row.intentId);
                onChangePattern(row.internalId);
                onDelete();
            }
        }

        function handleClick() {
            //debugger;
            onChangePattern(row.internalId);
            onGetIntentID(row.intentId);
            onLoadIntentSelectList();
            onLoadPattern();
            onLoadEntities();
            onToggle();
        }
        return (
            <div>
                <UncontrolledDropdown>
                    <DropdownToggle className="Button"><i className="fa fa-ellipsis-h" aria-hidden="true"></i></DropdownToggle>
                    <DropdownMenu right className="intent__dropdown-menu">
                        <DropdownItem type="button" className="intent__dropdown-item-1" data-toggle="tooltip" onClick={() => {
                            handleClick();
                            setErrors({});
                            setSubmitted(false);
                            setIsCreate(false);
                        }
                        }><img className="img-edit" src={edit} /> Sửa chi tiết</DropdownItem>
                        <DropdownItem type="button" className="intent__dropdown-item-2" data-toggle="tooltip" onClick={deleteRow}><img className="img-edit" src={Delete} /> Xóa thực thể</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        );
    }

    var actionEntity = (cell, row) => {
        //debugger;
        //onChangePattern(row.internalId);
        //onGetIntentID(row.intentId);
        //onLoadIntentSelectList();
        //onLoadEntities();
        return (
            <div className='countEntity'>
                 <img className='icon-margin' src={example_icon} alt="alt" /> {Entities.length} thực thể
            </div>
        );
    }

    const cols = [
        {
            dataField: 'internalId',
            text: 'ID',
            sort: true,
            hidden: true,           
        },
        {
            dataField: 'templateSentence',
            text: 'Nội dung',
            sort: true,
            classes: 'td-style pattern-templateSentence',
        },
        {
            dataField: 'countEntities',
            text: '',
            sort: true,
            formatter: actionEntity,
            classes: 'pattern-countEntities',
        },
        {
            dataField: 'intentName',
            text: 'Ý định',
            sort: true,
            classes: 'pattern-intentName',
        },
        {
            dataField: 'actions',
            isDummyField: true,
            csvExport: false,
            formatter: actionsFormatter,
            classes: 'pattern-actions',
        }
    ];

    const [columns, setColumns] = useState(cols);

    const customTotal = (from, to, size) => (
        <span><p className="show-page">Hiển thị</p>
            <span className="react-bootstrap-table-pagination-total">
                bản ghi từ {from} đến {to} trong tổng số {size} bản ghi
            </span>
        </span>

    );

    useEffect(() => {
        let bot = match.params.bot;
        onGetBot(bot);
        onLoad();
        
    }, []);

    

    //const paginationOption = {
    //    page: page,
    //    sizePerPage: sizePerPage,
    //    totalSize: totalSize
    //};
    
    let item = pattern || {}
    let intentSelectListData = intentSelectList.data || []
    let intentSelectOption = intentSelectListData.map((item) =>
        <option value={item.internalId}>{item.name}</option>
    )

    let label = iscreate ? 'Thêm mới' : 'Lưu';
    let modal_label = iscreate ? 'Thêm mới câu mẫu' : 'Sửa câu mẫu';

    const closeBtn = <button className="close close-modal-btn" onClick={onToggle}>&#10005;</button>;

    return (
        <div className="col-lg-12 fw-500" style={{ marginTop: 0, paddingLeft: 0 }}>
            <div className="padding-content">
                <span className="Title">Câu mẫu</span>
                <span className="Content">  Một cái gì đó tồn tại như tự chính nó, như một chủ thể hoặc như một khách thể</span>
            </div>
            <hr />
            <div className="padding-content" style={{ display: 'inline-flex' }}>
                <button
                    className="btn padding-content__btn blue-button"
                    type="button"
                    data-toggle="tooltip"
                    onClick={() => { setSubmitted(false); setErrors({}); onAddNew(); setIsCreate(true) }}
                    title=""
                >
                    <i className="fa fa-plus" aria-hidden="true" style={{ marginRight: '8px' }}></i>Thêm mới
                </button>
                <button
                    className="btn padding-content__btn"
                    type="button"
                    data-toggle="tooltip"
                    title="Delete Intent Record"
                >
                    <i className="fa fa-trash-o" aria-hidden="true" style={{ marginRight: '8px' }}></i>Xóa
                </button>
                <button
                    className="btn padding-content__btn"
                    type="button"
                    data-toggle="tooltip"
                    title="Delete Intent Record"
                >
                    <i className="fa fa-repeat" aria-hidden="true" style={{ marginRight: '8px' }}></i>Làm mới
                </button>
        
            </div>
            <hr style={{ marginTop: '10px', marginBottom: '10px' }} />
            <div className="padding-content" style={{ display: 'inline-flex' }}>
                <div className="input-group ai-content__body--input-gr">
                    <input type="text" className="form-control ai-content__body--input" placeholder="Tìm kiếm" onChange={onSearchChange} />
                    <div className="input-group-btn">
                        <button className="ai-content__body--input-gr-btn" type="submit">
                            <span className="glyphicon glyphicon-search"><img className="img-search" src={search} alt="icon" /></span>
                        </button>
                    </div>
                </div>
                <select className="ai-content__body--select-number">
                    <option>Tất cả câu mẫu</option>
                    <option>Câu mẫu 1</option>
                    <option>Câu mẫu 2</option>
                    <option>Câu mẫu 3</option>
                    <option>Câu mẫu 4</option>
                </select>
                <select className="ai-content__body--select-intent">
                    <option>Tất cả ý định</option>
                        <option>Ý định 1</option>
                        <option>Ý định 2</option>
                        <option>Ý định 3</option>
                </select>
                <select className="ai-content__body--select-entity">
                    <option>Tất cả loại thực thể</option>
                        <option>Thực thể 1</option>
                        <option>Thực thể 2</option>
                </select>
            </div>
            <hr style={{ marginTop: '6px' }} />
            <BootstrapTable
                striped
                hover={false}
                keyField='id'
                data={patterns}
                columns={columns}
                bordered={false}
                noDataIndication="Table is Empty"
                pagination={paginationFactory({
                    page, sizePerPage, totalSize,
                    page, sizePerPage, totalSize,
                    showTotal: true,
                    paginationTotalRenderer: customTotal,
                    sizePerPageList: [{
                        text: '5', value: 5
                    }, {
                        text: '10', value: 10
                    }, {
                        text: 15, value: 15
                    }, {
                        text: 20, value: 20
                    }],
                })}
                onTableChange={onTableChange}
                //selectrow={{ mode: 'checkbox' }}
                //celledit={celleditfactory({ mode: 'click' })}
                //rowevents={this.rowevents}
                remote={{
                    filter: true,
                    pagination: true,
                    sort: true,
                    celledit: true
                }}
            />
            <Modal className='toggle-add' isOpen={modal} toggle={onToggle} >
                <ModalHeader className='modal-header' toggle={onToggle} close={closeBtn}>{modal_label}</ModalHeader>
                <ModalBody className='modal-body'>
                    <Form>
                        <FormGroup>
                            <Label for='pattern-intent'>Ý định</Label>
                            <select value={intentId} /*value={selectIntentId}*/
                                onChange={
                                    (evt) => {
                                        onChangeSelectIntent(evt);
                                        if (submitted) {
                                            //debugger;
                                            setErrors(Validator(rules, { intent: evt.target.value, templatesentence: item.templateSentence }, errors));
                                        }
                                    }
                                    
                                }
                                disabled={iscreate ? false : true}
                                className={submitted && errors.intent ? 'intent-error' : 'intent-normal'}>
                                <option></option>
                                {intentSelectOption}
                            </select>
                            <label className="error">{errors.intent}</label>
                        </FormGroup>
                        <FormGroup >
                            <Label for='pattern-templateSentence'>Nội dung câu mẫu</Label>
                            <Input className={(submitted && errors.templatesentence ? 'has-error' :'templatesentence-normal')} type='text' name='PatternTemplateSentence' id='pattern-templateSentence' onChange={
                                (evt) => {
                                    
                                    onChangeTemplateSentence(evt);
                                    if (submitted) {
                                        //debugger;
                                        setErrors(Validator(rules, { templatesentence: evt.target.value, intent: intentId }, errors));
                                    }
                                }} value={item.templateSentence} placeholder='Nhập câu mẫu' />
                            <label className="error">{errors.templatesentence}</label>
                        </FormGroup>
                        <Label for='desc' className="fw-500"><b>Bước 1: </b>Chọn thực thể trong câu</Label>
                        <Input value={item.templateSentence} onMouseUp={oneGetSelectionText} className="get-selection-text" />   
                        <FormGroup>
                            <Label style={{ marginTop: '1rem', marginBottom: '25px' }} className="fw-500"><b>Bước 2: </b> Chọn loại thực thể có sẵn hoặc tạo mới</Label>
                            <div className="row">
                                <div className="col fw-600">Nội dung</div>
                                <div className="col fw-600">Thực thể</div>
                            </div>
                            <div className='entities' data-pattern={item.internalId}>
                                <EntityList items={Entities} />
                            </div>

                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter className='modal-footer'>
                    <Button id="submitPattern" className="intent__modal--add-btn" color="primary" onClick={(evt) => {
                        //debugger;
                        setSubmitted(true);
                        var er = Validator(rules, { templatesentence: item.templateSentence, intent: intentId }, errors);
                        setErrors(er);
                        if (Object.keys(er).length > 0) {
                            evt.preventDefault();
                        } else {
                            onSubmitForm(evt);
                        }
                    }}>{label}</Button>{' '}
                    <Button className="intent__modal--cancel-btn" color="secondary" onClick={onToggle}>Hủy bỏ</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
//<button onClick={onAddEntity}>Add Entity</button>

Pattern.propTypes = {
    modal: PropTypes.bool,
    //products: PropTypes.Array,
    //columns: PropTypes.Array,
    //submitted: PropTypes.bool,
    //error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    onSubmitForm: PropTypes.func,
    onChangeTemplateSentence: PropTypes.func,
    onChangeDescription: PropTypes.func,
    onToggle: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
    modal: makeSelectModal(),
    pattern: makeSelectPattern(),
    patterns: makeSelectPatterns(),
    page: makeSelectPage(),
    sizePerPage: makeSelectSizePerPage(),
    totalSize: makeSelectTotalSize(),
    entityText: makeSelectEntityText(),
    Entities: makeSelectEntities(),
    intentId: makeSelectIntentID(),
    entitiesType: makeSelectEntitiesType(),
    intentSelectList: makeSelectIntentSelectList(),
    //selectIntentId: makeSelectSelectIntentId(),
    //intents: makeSelectIntents(),
    //entityModal: makeSelectEntityModal(),
    //patternId:makeSelectID()
    //id: makeSelectID(),
    //editmodal: makeSelectEditModal(),
    //templateSentence: makeSelectTemplateSentence(),
    //submitted: makeSelectSubmited(),
    //loading: makeSelectLoading(),
    //error: makeSelectError(),
    //columns: makeSelectColumns(),
    //botId: makeSelectBot(),
});
export function mapDispatchToProps(dispatch) {
    function getSelectionText() {
        //debugger;
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        } else {
            alert('no')
        }
        return text;
    }
    //debugger;
    return {
        //onSubmitForm: evt => {
        //    if (evt !== undefined && evt.preventDefault)
        //        evt.preventDefault();
        //    dispatch(addpatternRequest());
        //},
        //onToggle: evt => {
        //    //debugger;
        //    if (evt !== undefined && evt.preventDefault)
        //        evt.preventDefault();
        //    dispatch(onToggleModal());
        //},

        // load form list
        //onLoad: evt => dispatch(loadPatternRequest()),
        onLoad: evt => {
            dispatch(loadPatternRequest());
            dispatch(loadEntityTypeRequest());
        },
        // show/hide popup
        onToggle: evt => {
            dispatch(onToggle());
        },

        onAddNew: evt => {
            dispatch(getIntentSelectListRequest());
            dispatch(onToggle());
        },
        // edit/delete a selected row
        onChangePattern: evt => dispatch(changePattern(evt)),
        // bind pattern's data when edit
        onLoadPattern: evt => dispatch(getPatternRequest()),
        // change pattern sentence
        onChangeTemplateSentence: evt => {
            //debugger;
            dispatch(changeTemplateSentence(evt.target.value));
        },
        
        onSubmitForm: evt => {
            //debugger;
            if (evt !== undefined && evt.preventDefault)
                evt.preventDefault();
            dispatch(editPatternRequest());
            dispatch(onToggle());
            setTimeout(() => {
                dispatch(loadPatternRequest());
            }, 100);
        },
        // delete pattern
        onDelete: evt => {
            dispatch(deletePatternRequest());
            setTimeout(() => {
                dispatch(loadPatternRequest());
            }, 100);
        },
        // get bot id from url
        onGetBot: evt => dispatch(getBot(evt)),
        // handle table action
        onTableChange: (type, newState) => {
            dispatch(changePage(newState.page));
            dispatch(changeSizePerPage(newState.sizePerPage));
            if (newState.sortField != null) {
                dispatch(changeOrderColumn(newState.sortField));
                dispatch(changeOrder(newState.sortOrder));
            }
            dispatch(loadPatternRequest());
        },
        // search event
        onSearchChange: evt => {
            dispatch(changeSearch(evt.target.value));
            dispatch(loadPatternRequest());
        },
        
        oneGetSelectionText: evt => {
            //debugger;
            var selectText = getSelectionText();
            if (selectText.trim() != '') {
                dispatch(entityGetText(selectText))
            }
        },
        //onAddEntity: evt =>{
           
        //    dispatch(addEntity());
        //},
        onGetIntentID: evt => {
            //debugger;
            dispatch(getIntentId(evt));
        },
        onLoadIntentSelectList: evt => {
            dispatch(getIntentSelectListRequest());
        },
        onChangeSelectIntent: evt => {
            //debugger;
            dispatch(changeSelectIntentId(evt.target.value))
        },
        onLoadEntities: evt => {
            dispatch(loadEntityRequest());
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
)(Pattern);
