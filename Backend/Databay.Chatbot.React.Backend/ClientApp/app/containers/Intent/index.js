import React, { useEffect, memo, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import paginator from 'react-bootstrap-table2-paginator';
//import cellEditFactory from 'react-bootstrap-table2-editor';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './styleIntern.css';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Validator from 'utils/validator';

import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown } from 'reactstrap';

import example_icon from '../../images/example-icon.png';
import reply_icon from '../../images/reply-icon.png';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

import {
    makeSelectIntent,
    makeSelectModal,
    makeSelectErrors,
    makeSelectIntents,
    //makeSelectColumns,
    makeSelectID,
    makeSelectPage,
    makeSelectSizePerPage,
    makeSelectTotalSize,

    makeSelectResponseModal,
    makeSelectResponses,
    makeSelectResponseID,
    makeSelectResponseComponents,
    makeSelectIntentSelectList,
    makeSelectSelectIntentId,
    makeSelectToast
} from './selectors';

import {
    loadIntentRequest, changeIntent, onToggle, getIntentRequest, changeName, changeDescription, editIntentRequest,
    deleteIntentRequest, changeOrderColumn, changePage, changeSearch, changeSizePerPage, changeOrder,
    onResponseToggle, addResponse, addResponseRequest, loadResponseRequest, deleteResponseRequest,
    deleteResponseDetailRequest,
    loadResponseDetailRequest,
    addResponseDetailRequest,
    editResponseDetailRequest,
    getResponseDetailRequest,
    changeSelectIntentId,
    getIntentSelectListRequest
} from './actions';

import { getBot } from '../App/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input, FormText, Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import ResponseList from './ResponseList';
import edit from '../../images/edit-icon.png';
import Delete from '../../images/delete-icon.png';
import search from '../../images/search-icon.png';
import { setTimeout } from 'timers';

const key = 'intent';

export function Intent({
    intent,
    intents,
    modal,
    page,
    sizePerPage,
    totalSize,
    match,
    onLoad,
    onTableChange,
    onToggle,
    onSubmitForm,
    onLoadIntent,
    onChangeIntent,
    onChangeName,
    onChangeDescription,
    onDelete,
    onGetBot,
    onSearchChange,

    // --------------for response -----------------
    responseModal,
    responses,
    response,
    onResponseSubmitForm,
    onChangeText,
    onChangeType,
    onChangeImage,
    onAddResponse,
    onResponseToggle,
    text,
    image,
    type,

    responseid,
    onAddComponentResponse,
    onDeleteResponse,
    responseComponents,
    onLoadResponses,
    onLoadResponseDetails,
    intentSelectList,
    onLoadIntentSelectList,
    onChangeSelectIntent,
    selectIntentId,
    id,
    Toast
    //botId,
    //submitted,
    //columns,
    //pagination,
}) {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [iscreate, setIsCreate] = useState(true);
    
    const rules = [
        {
            field: 'name',
            method: 'isEmpty',
            validWhen: false,
            message: 'Ý định không được để trống',
        },
        {
            field: 'name',
            method: 'matches',
            args: [/^[a-z,0-9,_]+$/],
            validWhen: true,
            message: 'Ý định chỉ gồm chữ thường, số , gạch dưới',
        }
        
    ];

    var actionsFormatter = (cell, row) => {
        function deleteRow() {
            var answer = confirm("Bạn thực sự muốn xóa ?")
            if (answer) {
                onChangeIntent(row.internalId);
                onDelete();
            }
        }

        function handleClick() {
            onChangeIntent(row.internalId);
            onLoadIntent();
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

    var actionsResponse = (cell, row) => {
        function handleClick() {
            onChangeIntent(row.internalId);
            onLoadIntentSelectList();
            onLoadResponses();
            onResponseToggle();
        }
        //debugger;
        return (
            <div>
                <button
                    className="btn btn-outline btn-sm btn-color"
                    type="button"
                    data-toggle="tooltip"
                    onClick={handleClick}
                    title="Thêm mới câu trả lời"
                >
                    <img className='icon-margin' src={reply_icon} alt="alt" /> {row.countResponse} câu trả lời
                </button>
            </div>
        );
    }

    var actionPattern = (cell, row) => {
        //debugger;
        return (
            <div className='countPattern'>
                <img className='icon-margin' src={example_icon} alt="alt" /> {row.countPattern}  câu mẫu
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
            dataField: 'name',
            text: 'Tên ý định',
            sort: true,
            classes: 'td-style td-width fw-600 intent-name-color'
        },
        {
            dataField: 'countPattern',
            text: '',
            sort: true,
            formatter: actionPattern,
            classes: 'intent-countPattern'
        },
        {
            dataField: 'countResponse',
            isDummyField: true,
            csvExport: false,
            formatter: actionsResponse,
            //sort: true,
            classes: 'intent-countResponse',
        },
        {
            dataField: 'description',
            text: 'Mô tả',
            sort: true,
            classes: 'td-style intent-description',
        },
        {
            dataField: 'actions',
            text: '',
            isDummyField: true,
            csvExport: false,
            formatter: actionsFormatter,
            classes: 'intent-actions',
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
    }, [responses]);

    let item = intent || {}
    
    let intentSelectListData = intentSelectList.data || []
    let intentSelectOption = intentSelectListData.map((item) =>
        <option value={item.internalId}>{item.name}</option>
    )

    let label = iscreate ? 'Thêm mới' : 'Lưu';
    let modal_label = iscreate ? 'Thêm mới ý định' : 'Sửa ý định';

    const closeBtn = <button className="close close-modal-btn">&#10005;</button>;

    return (
        //<AddIntentModal />
        <div className="" style={{ marginTop: 0, paddingRight: 15 }}>
            <div className="padding-content">
                <span className="Title fw-500">Ý định</span>
                <span className="Content">Ý muốn cụ thể làm việc gì đó</span>

                {Toast ? <p> thong bao</p> : ""}
                
            </div>

            
            
            <hr />
            <div className="padding-content">
                <button
                    className="btn padding-content__btn blue-button"
                    type="button"
                    data-toggle="tooltip"
                    onClick={() => { setSubmitted(false); setErrors({}); onToggle(); setIsCreate(true) }}
                    title=""
                >
                    <i className="fa fa-plus" aria-hidden="true" style={{ marginRight: '8px' }}></i>Thêm mới
                </button>
                <button
                    className="btn padding-content__btn"
                    type="button"
                    data-toggle="tooltip"
                    
                >
                    <i className="fa fa-trash-o" aria-hidden="true" style={{ marginRight: '8px' }}></i>Xóa
                </button>
                <button
                    className="btn padding-content__btn"
                    type="button"
                    data-toggle="tooltip"
                    title="Refresh Intent Record"
                >
                    <i className="fa fa-repeat" aria-hidden="true" style={{ marginRight: '8px' }}></i>Làm mới
                </button>
            </div>
            <hr style={{ marginTop: '10px', marginBottom: '10px' }} />
            <div className="padding-content pl-25" style={{ display: 'inline-flex' }}>
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
                    <option>2 mẫu chọn</option>
                    <option>3 mẫu chọn</option>
                    <option>4 mẫu chọn</option>
                    <option>5 mẫu chọn</option>
                </select>
                <select className="ai-content__body--select-gender">
                    <option>Tất cả</option>
                    <option>Nữ</option>
                    <option>Nam</option>
                </select>
            </div>
            <hr style={{ marginTop: '6px' }} />
            <BootstrapTable
                striped
                hover={false}
                keyField='id'
                data={intents}
                columns={columns}
                bordered={false}
                noDataIndication="Table is Empty"
                pagination={paginationFactory({
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

            <Modal isOpen={modal} toggle={onToggle} className="intent__modal">
                <ModalHeader onClick={onToggle} className="ff" close={closeBtn}>{modal_label}</ModalHeader>
                <ModalBody>
                    <Form >
                        <FormGroup>
                            <Label for='intentname'>Ý định</Label>
                            <Input type='text' name='IntentName' id='intentname' onChange={
                                (evt) => {
                                    onChangeName(evt);
                                    if (submitted) {
                                        setErrors(Validator(rules, { name: evt.target.value }, errors));
                                    }
                                }}
                                value={item.name} placeholder='Nhập tên ý định' />
                            <label className="error">{errors.name}</label>
                        </FormGroup>
                        <FormGroup>
                            <Label for='desc'>Mô tả</Label>
                            <Input type='textarea' name='description' id='desc' onChange={
                                onChangeDescription
                            }
                                value={item.description} placeholder='Nhập mô tả' />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={
                        (evt) => {
                            //debugger;
                            setSubmitted(true);
                            var er = Validator(rules, { name: item.name }, errors);
                            setErrors(er);
                            if (Object.keys(er).length > 0) {
                                evt.preventDefault();
                            } else {
                                onSubmitForm(evt);
                            }
                        }

                    } className="intent__modal--add-btn">{label}</Button>
                    <Button onClick={onToggle} className="intent__modal--cancel-btn">Hủy bỏ</Button>
                </ModalFooter>
            </Modal>


            <Modal className='toggle-response' isOpen={responseModal} toggle={onResponseToggle} >
                <ModalHeader className='modal-header' onClick={onResponseToggle} close={closeBtn}>Thêm mới câu trả lời</ModalHeader>
                <ModalBody className='modal-body modal-response-body'>
                    <Form>
                        <FormGroup className="intent-form">
                            <Label for='intentname'>Ý định</Label>
                            <select value={id} /*value={selectIntentId}*/ onChange={onChangeSelectIntent} disabled className='select-intent'>
                                <option></option>
                                {intentSelectOption}
                            </select>
                        </FormGroup>
                    </Form>
                    <hr />

                    <div className="rp-list">
                        <ResponseList items={responses} />

                        <button className="rp-btn-add" onClick={onAddResponse}><i className="fa fa-plus" aria-hidden="true"></i></button>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="intent__modal--add-btn" onClick={onResponseSubmitForm}>Thêm mới</Button>{' '}
                    <Button className="intent__modal--cancel-btn" color="secondary" onClick={onResponseToggle}>Hủy bỏ</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
//<Button color="danger" onClick={onDeleteResponse}>Xoa</Button>
//<ResponseList items={responseComponents} />

Intent.propTypes = {
    modal: PropTypes.bool,
    //products: PropTypes.Array,
    //columns: PropTypes.Array,
    //submitted: PropTypes.bool,
    //error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    onSubmitForm: PropTypes.func,
    onChangeName: PropTypes.func,
    onChangeDescription: PropTypes.func,
    onToggle: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
    modal: makeSelectModal(),
    intent: makeSelectIntent(),
    intents: makeSelectIntents(),
    page: makeSelectPage(),
    sizePerPage: makeSelectSizePerPage(),
    totalSize: makeSelectTotalSize(),
    responseModal: makeSelectResponseModal(),
    responses: makeSelectResponses(),
    responseid: makeSelectResponseID(),
    responseComponents: makeSelectResponseComponents(),
    intentSelectList: makeSelectIntentSelectList(),
    selectIntentId: makeSelectSelectIntentId(),
    id: makeSelectID(),
    Toast: makeSelectToast()
    //errors: makeSelectErrors(),
    //name: makeSelectName(),
    //description: makeSelectDesc(),
    //submitted: makeSelectSubmited(),
    //loading: makeSelectLoading(),
    //error: makeSelectError()
    //columns: makeSelectColumns(),
    //botId: makeSelectBot(),
});

export function mapDispatchToProps(dispatch) {
    return {
        // load form list
        onLoad: evt => dispatch(loadIntentRequest()),
        // show/hide popup
        onToggle: evt => dispatch(onToggle()),
        // edit/delete a selected row
        onChangeIntent: evt => dispatch(changeIntent(evt)),
        // bind intent's data when edit
        onLoadIntent: evt => dispatch(getIntentRequest()),
        // change intent name event
        onChangeName: evt => {
            dispatch(changeName(evt.target.value));
        },
        // change intent description event
        onChangeDescription: evt => dispatch(changeDescription(evt.target.value)),
        // submit event
        onSubmitForm: evt => {
            if (evt !== undefined && evt.preventDefault)
                evt.preventDefault();
            dispatch(editIntentRequest());
            dispatch(onToggle());
            setTimeout(() => {
                dispatch(loadIntentRequest());
            }, 100);
        },
        // delete intent
        onDelete: evt => {
            dispatch(deleteIntentRequest());
            setTimeout(() => {
                dispatch(loadIntentRequest());
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
            dispatch(loadIntentRequest());
        },
        // search event
        onSearchChange: evt => {
            dispatch(changeSearch(evt.target.value));
            dispatch(loadIntentRequest());
        },


        // response
        onResponseToggle: evt => {
            //debugger;
            dispatch(onResponseToggle());
            //dispatch(loadResponseRequest());
        },

        onAddResponse: evt => {
            //if (evt !== undefined && evt.preventDefault)
            //    evt.preventDefault();
            //debugger;

            dispatch(addResponse());
            //dispatch(addResponseRequest());
        },

        onResponseSubmitForm: evt => {
            //debugger;
            dispatch(onResponseToggle());
        },

        onDeleteResponse: evt => {
            dispatch(deleteResponseRequest());
        },
        onLoadResponses: evt => dispatch(loadResponseRequest()),
        onLoadIntentSelectList: evt => {
            dispatch(getIntentSelectListRequest());
        },
        onChangeSelectIntent: evt => {
            //debugger;
            dispatch(changeSelectIntentId(evt.target.value))
        }
    };
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(Intent);
