import React, { useEffect, memo, useState } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import paginator from 'react-bootstrap-table2-paginator';
//import cellEditFactory from 'react-bootstrap-table2-editor';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Update from './Update';
import { Switch, Route, BrowserRouter, Link } from 'react-router-dom';
//import GlobalStyle from '../../global-styles';

import { createStructuredSelector } from 'reselect';
//import AddEntityTypeModal from './AddEntityTypeModal';
import reducer from './reducer';
import saga from './saga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import { makeSelectBot } from '../App/selectors';
//import img2 from '../EntityType/img/1.jpg';
import edit from '../../images/edit-icon.png';
import Delete from '../../images/delete-icon.png';
import search from '../../images/search-icon.png';
import example_icon from '../../images/example-icon.png';
import {
    makeSelectEntityType,
    makeSelectModal,
    makeSelectErrors,
    makeSelectEntityTypes,
    //makeSelectColumns,
    makeSelectID,
    makeSelectPage,
    makeSelectSizePerPage,
    makeSelectTotalSize
} from './selectors';
import {
    loadEntityTypeRequest, changeEntityType, onToggle, getEntityTypeRequest, changeName, changeDescription, changeExtractionMethod, editEntityTypeRequest,
    deleteEntityTypeRequest, changeOrderColumn, changePage, changeSearch, changeSizePerPage, changeOrder
} from './actions';

import { getBot } from '../App/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input, FormText, Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import './StyleEntityType.css';
import Validator from 'utils/validator';

const key = 'entityType';

export function EntityType({
    entityType,
    entityTypes,
    modal,
    page,
    sizePerPage,
    totalSize,
    match,
    onLoad,
    onTableChange,
    onToggle,
    onSubmitForm,
    onLoadEntityType,
    onChangeEntityType,
    onChangeName,
    onChangeDescription,
    onChangeExtractionMethod,
    onDelete,
    onGetBot,
    onSearchChange,
    //id,
    //botId,
    //submitted,
    //columns,
    //pagination,
}) {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });
    const [selected,setSelected] = useState('1');

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [iscreate, setIsCreate] = useState(true);
    const rules = [
        {
            field: 'name',
            method: 'isEmpty',
            validWhen: false,
            message: 'Tên thực thể không được để trống',
        },
        {
            field: 'name',
            method: 'matches',
            args: [/^[a-z,0-9,_]+$/],
            validWhen: true,
            message: 'Loại thực thể chỉ gồm chữ thường, số , gạch dưới',
        }


    ];

    var extractionMethodFormatter = (cell, row) => {
        //debugger;
        let a = row.extractionMethod;
        switch (a) {
            case 1: return 'Tất cả';
            case 2: return 'Trích xuất chính xác';
            case 3: return 'Trích xuất theo tiên đoán';
            
        }
         
    }
    var actionsFormatter = (cell, row) => {
        function deleteRow() {
            var answer = confirm("Delete ?")
            if (answer) {
                onChangeEntityType(row.internalId);
                onDelete();
            }
        }

        function handleClick() {
            onChangeEntityType(row.internalId);
            onLoadEntityType();
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
                        }>
                            <img className="img-edit" src={edit} /> Sửa chi tiết</DropdownItem>
                        <DropdownItem type="button" className="intent__dropdown-item-2" data-toggle="tooltip" onClick={deleteRow}><img className="img-edit" src={Delete} /> Xóa thực thể</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
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
            hidden: true
        },
        {
            dataField: 'name',
            text: 'Tên Loại thực thể',
            sort: true,
            classes: 'td-style fw-600 entitytype-name',
        },
        {
            dataField: 'countPattern',
            sort: true,
            formatter: actionPattern,
            classes: 'entitytype-countPattern',
        },
        {
            dataField: 'description',
            text: 'Mô tả',
            sort: true,
            classes: 'td-style entitytype-description',
        },
        {
            dataField: 'extractionMethod',
            text: 'Phương pháp trích xuất',
            isDummyField: true,
            csvExport: false,
            formatter: extractionMethodFormatter,
            classes: 'entitytype-extractionMethod',
        },
        {
            dataField: 'actions',
            isDummyField: true,
            csvExport: false,
            formatter: actionsFormatter,
            classes: 'entitytype-actions',
        },

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

    let item = entityType || {}
    //item.extractionMethod == "1";
    let label = iscreate ? 'Thêm mới' : 'Lưu';
    let modal_label = iscreate ? 'Thêm mới thực thể' : 'Sửa thực thể';

    const closeBtn = <button className="close close-modal-btn" onClick={onToggle}>&#10005;</button>;

    return (
        //<AddEntityTypeModal />
        <div className="" style={{ marginTop: 0, paddingRight: 15 }}>
            <div className="padding-content">
                <span className="Title">Loại thực thể  </span>
                <span className="Content">  Một cái gì đó tồn tại như tự chính nó, như một chủ thể hoặc như một khách thể</span>
            </div>
            <hr />
            <div className="padding-content" style={{ display: 'inline-flex' }}>
                <button
                    className="btn padding-content__btn blue-button"
                    type="button"
                    data-toggle="tooltip"
                    onClick={() => { setSubmitted(false); setErrors({}); onToggle(); setIsCreate(true) }}
                    title="Delete Intent Record"
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
                            <span className="glyphicon glyphicon-search"><img className="img-search" src={search} alt="icon"/></span>
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
                </select>
            </div>
            <hr style={{ marginTop: '6px' }} />
            <BootstrapTable
                striped
                hover={false}
                keyField='id'
                data={entityTypes}
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
                    celledit: true,
                }}
            />

            <Modal isOpen={modal} toggle={onToggle} className="intent__modal">
                <ModalHeader toggle={onToggle} close={closeBtn}>{modal_label}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for='entityTypename'>Tên thực thể</Label>
                            <Input className={(submitted && errors.name ? ' has-error' : '')} type='text' name='EntityTypeName' id='entityTypename' onChange={
                                (evt) => {
                                    onChangeName(evt);
                                    if (submitted) {
                                        setErrors(Validator(rules, { name: evt.target.value }, errors));
                                    }
                                }} value={item.name} placeholder='Nhập tên thực thể' />
                            <label className="error">{errors.name}</label>
                        </FormGroup>
                        <FormGroup>
                            <Label for='desc'>Mô tả</Label>
                            <Input type='textarea' name='Description' id='desc' onChange={onChangeDescription} value={item.description} placeholder='Nhập mô tả' />
                        </FormGroup>
                            <FormGroup>
                            <Label for='desc'>Phương pháp trích xuất</Label>
                            <div id="extractionMethod" checked="1" >
                                <label className="custom-radio fw-500">
                                    <Input type='radio' name='ExtractionMethod' onChange={onChangeExtractionMethod} value="1"  checked={item.extractionMethod == "1"} />
                                    <span className="radio"></span>
                                    Tất cả
                                </label>
                                <label className="custom-radio fw-500">
                                    <Input type='radio' name='ExtractionMethod' onChange={onChangeExtractionMethod} value="2" checked={item.extractionMethod == "2"} />
                                    <span className="radio"></span>
                                    Trích xuất chính xác
                                </label>
                                <label className="custom-radio fw-500">
                                    <Input type='radio' name='ExtractionMethod' onChange={onChangeExtractionMethod} value="3" checked={item.extractionMethod == "3"} />
                                    <span className="radio"></span>
                                    Trích xuất theo tiên đoán
                                </label>
                            </div>
                        </FormGroup>
                    </Form>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={
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

                    } className="intent__modal--add-btn">
                        <i className="fa fa-plus" aria-hidden="true" style={{ marginRight: '8px' }}></i>{label}
                    </Button>
                    <Button color="secondary" onClick={onToggle} className="intent__modal--cancel-btn">Hủy bỏ</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

EntityType.propTypes = {
    modal: PropTypes.bool,
    //products: PropTypes.Array,
    //columns: PropTypes.Array,
    //submitted: PropTypes.bool,
    //error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    onSubmitForm: PropTypes.func,
    onChangeName: PropTypes.func,
    onChangeDescription: PropTypes.func,
    onChangeExtractionMethod: PropTypes.func,
    onToggle: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
    modal: makeSelectModal(),
    entityType: makeSelectEntityType(),
    entityTypes: makeSelectEntityTypes(),
    page: makeSelectPage(),
    sizePerPage: makeSelectSizePerPage(),
    totalSize: makeSelectTotalSize(),
    //id: makeSelectID(),
    //errors: makeSelectErrors(),
    //name: makeSelectName(),
    //description: makeSelectDesc(),
    //extractionMethod: makeSelectExtract(),
    //submitted: makeSelectSubmited(),
    //loading: makeSelectLoading(),
    //error: makeSelectError()
    //columns: makeSelectColumns(),
    //botId: makeSelectBot(),
});

export function mapDispatchToProps(dispatch) {
    return {
        // load form list
        onLoad: evt => dispatch(loadEntityTypeRequest()),
        // show/hide popup
        onToggle: evt => dispatch(onToggle()),
        // edit/delete a selected row
        onChangeEntityType: evt => dispatch(changeEntityType(evt)),
        // bind entityType's data when edit
        onLoadEntityType: evt => dispatch(getEntityTypeRequest()),
        // change entityType name event
        onChangeName: evt => {
            dispatch(changeName(evt.target.value));
        },
        // change entityType description event
        onChangeDescription: evt => dispatch(changeDescription(evt.target.value)),
        // change entityType extractionMethod event
        onChangeExtractionMethod: evt => {
            if (evt !== undefined && evt.preventDefault)
            dispatch(changeExtractionMethod(evt.target.value))
        },
        // submit event
        onSubmitForm: evt => {
            if (evt !== undefined && evt.preventDefault)
                evt.preventDefault();
            dispatch(editEntityTypeRequest());
            dispatch(onToggle());
            setTimeout(() => {
                dispatch(loadEntityTypeRequest());
            }, 100);
        },
        // delete entityType
        onDelete: evt => {
            dispatch(deleteEntityTypeRequest());
            setTimeout(() => {
                dispatch(loadEntityTypeRequest());
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
            dispatch(loadEntityTypeRequest());
        },
        // search event
        onSearchChange: evt => {
            dispatch(changeSearch(evt.target.value));
            dispatch(loadEntityTypeRequest());
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
)(EntityType);
