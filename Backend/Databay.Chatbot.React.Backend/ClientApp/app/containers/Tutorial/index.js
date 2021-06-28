import React, { useEffect, memo, useState } from 'react';
import ReactDOM from 'react-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
//import paginator from 'react-bootstrap-table2-paginator';
//import cellEditFactory from 'react-bootstrap-table2-editor';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SystemTable.css';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { Link } from 'react-router-dom';

import field1 from '../../images/img/field-1.png';
import field2 from '../../images/img/field-2.png';
import field3 from '../../images/img/field-3.png';
import field4 from '../../images/img/field-4.png';
import field5 from '../../images/img/field-5.png';
import field6 from '../../images/img/field-6.png';
import field7 from '../../images/img/step-2.png';

import back_icon from '../../images/back-icon.png';

import ava_chat_bot from '../../images/img/ava-chat-bot.png';

import popup_success from '../../images/img/popup-success.png';

import EntityList from './EntityList';
import axios from 'axios';
import { API_TRAINING_BOT_URL } from 'utils/constants';


import {
    validRequire,
    valid_check,
    Validator
} from '../../utils/validate';

import {
    makeSelectBusinessField,
    makeSelectStep,
    makeSelectStyles,

    //add tutorial bot
    makeSelectTutorialBotName,
    makeSelectTutorialBotDescription,

    //add intent
    makeSelectIntentName,

    //add pattern
    makeSelectPatternTemplateSentence,

    //add entity type
    makeSelectEntityTypeName,
    makeSelectEntityText,

    // add response
    makeSelectResponses,

    makeSelectTutorialBotID
} from './selectors';
import {
    //changeBusinessField,
    //changeStep,
    handleNext,
    changeStyles,

    //add tutorial bot
    addTutorialBotRequest,
    changeTutorialBotName,
    changeTutorialBotDescription,

    //add intent
    addIntentRequest,
    changeIntentName,

    //add pattern
    addPatternRequest,
    changePatternTemplateSentence,

    //add entity type
    addEntityTypeRequest,
    changeEntityTypeName,
    entityGetText,
    addEntityRequest,

    getEntityText,

    // add response
    addResponse,

    redirectToHomeChat,
    addDefaultIntent,
    addDefaultPattern,
    validRequest
} from './actions';

import { getBot } from '../App/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row, Form, FormGroup, Label, Input, FormText, Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Dropdown } from 'reactstrap';
import ResponseList from './ResponseList';
import { debounce } from 'redux-saga/effects';

const key = 'tutorial';


export function Tutorial({
    BusinessField,
    styles,
    step,
    disable,
    bot_name,
    bot_description,
    intent_name,
    pattern_templatesentence,
    entitytype_name,
    responses,
    entityText,
    Entities,
    onHandleNext,
    onChangeStyles,
    valid,
    botID,
    error,


    //add tutorial bot
    onAddTutorialBot,
    onChangeBotName,
    onChangeBotDescription,
    //onChangeDisable,

    //add intent
    onAddIntent,
    onChangeIntentName,

    //add pattern
    onAddPattern,
    onChangePatternTemplateSentence,

    //add entity type
    onAddEntity,
    onAddEntityType,
    onChangeEntityTypeName,
    onGetSelectText,

    // add response
    onAddResponse,

    onTrainBot,

    onAddDefaultIntent,
    onAddPatternDefault

    //onValid,
}) {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [submitted_entity, setSubmitted_entity] = useState(false);
    // validation rules bot name
    const rules_bot_name = [
        {
            field: 'bot_name',
            method: 'isEmpty',
            validWhen: false,
            message: 'Bạn vui lòng nhập tên bot',
        }
    ];

    const rules_intent_name = [
        {
            field: 'intent_name',
            method: 'isEmpty',
            validWhen: false,
            message: 'Bạn vui lòng nhập tên ý định.',
        }
    ];

    const rules_pattern_templatesentence = [
        {
            field: 'pattern_templatesentence',
            method: 'isEmpty',
            validWhen: false,
            message: 'Bạn vui lòng nhập câu mẫu.',
        }
    ];

    const rules_entityText = [
        {
            field: 'entityText',
            method: 'isEmpty',
            validWhen: false,
            message: 'Bạn vui lòng quét thực thể',
        }
    ];

    const rules_entitytype_name = [
        {
            field: 'entitytype_name',
            method: 'isEmpty',
            validWhen: false,
            message: 'Bạn vui lòng nhập tên loại thực thể',
        }
    ];

    //const rules_responses = [
    //    {
    //        field: 'responses',
    //        method: 'isEmpty',
    //        validWhen: false,
    //        message: 'Bạn vui lòng nhập câu trả lời',
    //    }
    //];



    useEffect(() => {
        var element = document.getElementById('step-' + step);
        if (element != undefined) {
            var el = element.getBoundingClientRect();
            onChangeStyles(el);
        }
        //renderStep();
        //renderGuide();

    }, [step]);



    function onTrainModel() {
        axios.get(`${API_TRAINING_BOT_URL}/train/` + botID)
            .then(response => response)
            .then((data) => {
                console.log(data)
            })
    }

    function step1()
    {
        return <div className="tutorial-white-box">
            <div className="bot-box">
                <label className="title">Chọn lĩnh vực</label>
                <span>Bạn muốn tạo Bot trong lĩnh vực nào, vui lòng chọn lĩnh vực Bot có thể hỗ trợ bạn.</span>
                <Row>
                    <Col md={4} className={(step === 1 ? 'box-item floating-div-no-bg' : 'box-item')} data="1" onClick={onHandleNext}>
                        <img src={field1} alt="alt" />
                        <div className="context">
                            <div className="display-flex">
                                <label>Du lịch</label>
                                <i className="fa fa-play-circle play-btn-step-1" aria-hidden="true"></i>
                            </div>
                            <span>Giúp khách du lịch lập kế hoạch nhanh hơn và đơn giản hóa việc đặt chỗ</span>
                        </div>
                    </Col>
                    <Col md={4} className={(step === 1 ? 'box-item floating-div-no-bg' : 'box-item')} data="2" onClick={onHandleNext}>
                        <img src={field2} alt="alt" />
                        <div className="context2">
                            <div className="display-flex">
                                <label>Chăm sóc khách hàng</label>
                                <i className="fa fa-play-circle play-btn-step-1" aria-hidden="true"></i>
                            </div>
                            <span>Giải quyết các câu hỏi thường gặp một cách nhanh chóng và hiệu quả</span>
                        </div>
                    </Col>
                    <Col md={4} className={(step === 1 ? 'box-item floating-div-no-bg' : 'box-item')} data="3" onClick={onHandleNext}>
                        <img src={field3} alt="alt" />
                        <div className="context3">
                            <div className="display-flex">
                                <label>Bán lẻ</label>
                                <i className="fa fa-play-circle play-btn-step-1" aria-hidden="true"></i>
                            </div>
                            <span>Giúp hoạt động bán hàng và marketing của bạn có thể thực hiện tự động</span>
                        </div>
                    </Col>
                    <Col md={4} className={(step === 1 ? 'box-item floating-div-no-bg' : 'box-item')} data="4" onClick={onHandleNext}>
                        <img src={field4} alt="alt" />
                        <div className="context4">
                            <div className="display-flex">
                                <label>Bảo hiểm</label>
                                <i className="fa fa-play-circle play-btn-step-1" aria-hidden="true"></i>
                            </div>
                            <span>Hỗ trợ tư vấn thông tin về bản hiểm cho khách hàng của bạn 24/7</span>
                        </div>
                    </Col>
                    <Col md={4} className={(step === 1 ? 'box-item floating-div-no-bg' : 'box-item')} data="5" onClick={onHandleNext}>
                        <img src={field5} alt="alt" />
                        <div className="context5">
                            <div className="display-flex">
                                <label>Tài chính ngân hàng</label>
                                <i className="fa fa-play-circle play-btn-step-1" aria-hidden="true"></i>
                            </div>
                            <span>Đem đến cho khách hàng trải nghiệm dịch vụ chất lượng trong thời đại 4.0</span>
                        </div>
                    </Col>
                    <Col md={4} className={(step === 1 ? 'box-item floating-div-no-bg' : 'box-item')} data="6" onClick={onHandleNext}>
                        <img src={field6} alt="alt" />
                        <div className="context6">
                            <div className="display-flex">
                                <label>Tùy chỉnh</label>
                                <i className="fa fa-play-circle play-btn-step-1" aria-hidden="true"></i>
                            </div>
                            <span>Tự do sáng tạo chatbot của riêng bạn theo ý muốn <br /> (Chatbot hoàn toàn trống)</span>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    }

    function step2() {
        return <div className="tutorial-white-box">
            <div className="bot-box">

                <Row style={{ height: '100%' }}>
                    <Col md={4}>
                        <label className="title">Nhập thông tin bot</label>
                        <span>Điền thông tin cơ bản của Bot vào form dưới đây</span>
                        <p>

                        </p>
                        <Table className="custom-table">
                            <tbody>
                                    <tr>
                                        <td className={(submitted && errors.bot_name ? 'valid-border' : '')}>
                                            <FormGroup className={(step === 2 && submitted && errors.bot_name ? 'floating-div border-bottom-0 valid-border' : '') || (step === 2 ? 'floating-div border-bottom-0' : '')} >                                            
                                            <Label for="Name">Tên bot</Label>
                                                <Input type="text" name="Name" id="step-2" placeholder="Nhập tên bot" onChange={(evt) => {
                                                    onChangeBotName(evt);
                                                    if (submitted)
                                                        setErrors(Validator(rules_bot_name, { bot_name: evt.target.value }, errors));
                                                }} value={bot_name} />
                                                <Label className={(submitted && errors.bot_name ? 'valid-text' : '' )}> {errors.bot_name} </Label>                                          
                                        </FormGroup>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <FormGroup className={(step === 3 ? 'floating-div border-top-0' : '')}>
                                            <Label for="Description">Mô tả</Label>
                                            <textarea style={{ height: '22.75rem', resize: 'none' }} type="text" name="Description" id="Description" id="step-3" placeholder="Nhập mô tả" onChange={onChangeBotDescription} value={bot_description} />
                                        </FormGroup>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <div style={{ position: 'absolute', bottom: '0', width: '100%' }}>
                            <button style={{ position: 'relative', right: '10px' }} className="btn" onClick={onHandleNext}><img src={back_icon} alt="alt" /> Quay lại</button>
                            <FormGroup style={{ position: 'absolute', right: '-15px', top: '-50px' }} className={(step === 4 ? 'floating-div circle-div' : '')}>
                            </FormGroup>
                            <button style={{ position: 'absolute', right: '0' }} className={(step === 4 ? 'btn btn-guide-2 z-index-5' : 'btn btn-guide-2')} id="step-4"
                                onClick={() => {
                                    onAddTutorialBot();
                                    setTimeout(() => {
                                        onAddDefaultIntent();
                                        onHandleNext();
                                    }, 100);
                                
                                }} >Tiếp tục</button>
                            </div>
                       
                    </Col>
                    <Col md={8} className="item-center">
                        <div className="align-center">
                            <img src={field7} alt="alt" />
                            <div className="context">
                                <p className="databay-hello-text">Xin chào đến với Databay.ai</p>
                                <p>Bạn đang trong bước tạo cho dự án <span style={{ display: 'block' }}>của mình một người hỗ trợ</span></p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    }

    function step3() {
        return <div className="tutorial-white-box">
            <div className="bot-box bot-box-step3vs4">

                <Row style={{ height: '100%' }}>
                    <Col md={12}>
                        <label className="title">Nhập ý định</label>
                        <span>Phần nhập ý định của bạn theo các bước để thay đổi các ý định và phân loại thực thể</span>
                        <p>

                        </p>
                        <Table className="custom-table custom-table-2">
                            <tbody>
                                <tr>
                                    <td className={(submitted && errors.intent_name ? 'valid-border' : '')}>
                                        <FormGroup className={(step === 5 && submitted && errors.intent_name ? 'floating-div border-bottom-0 valid-border' : '') || (step === 5 ? 'floating-div border-bottom-0' : '')}>
                                            <Label for="Name">Ý định</Label>
                                            <Input type="text" name="Name" id="step-5" placeholder="#hoi_gia" onChange={(evt) => {
                                                onChangeIntentName(evt);
                                                if (submitted)
                                                    setErrors(Validator(rules_intent_name, { intent_name: evt.target.value }, errors));
                                            }} value={intent_name} />
                                            <Label className={(submitted && errors.intent_name ? 'valid-text' : '')}> {errors.intent_name} </Label>
                                        </FormGroup>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={(submitted && errors.pattern_templatesentence ? 'valid-border' : '')}>
                                        <FormGroup className={(step === 6 && submitted && errors.pattern_templatesentence ? 'floating-div border-bottom-0 valid-border' : '') || (step === 6 ? 'floating-div border-bottom-0' : '')}  >
                                            <Label for="Description">Nội dung câu mẫu</Label>
                                            <textarea style={{ resize: 'none' }} type="text" name="Description" id="Description" id="step-6" placeholder="Đôi giày Nike này giá bao nhiêu?" onChange={(evt) => {
                                                onChangePatternTemplateSentence(evt);
                                                if (submitted)
                                                    setErrors(Validator(rules_pattern_templatesentence, { pattern_templatesentence: evt.target.value }, errors));
                                            }} value={pattern_templatesentence} />

                                            <Label className={(submitted && errors.pattern_templatesentence ? 'valid-text' : '')}> {errors.pattern_templatesentence} </Label>
                                        </FormGroup>
                                    </td>
                                </tr>
                            </tbody>

                        </Table>

                        <p>

                        </p>
                        <FormGroup className={(step === 7 ? 'floating-text floating-div show-tag' : '') || (step > 7 ? 'show-tag' : '') || (step < 7 ? 'hidden-tag' : '')}>
                            <p><b>Bước 1</b>: Chọn thực thể trong câu</p>
                        </FormGroup>
                        <FormGroup className={(step === 7 && submitted_entity && errors.entityText ? 'floating-div padding-pattern show-tag valid-border' : '') || (step === 7 ? 'floating-div padding-pattern show-tag' : '') || (step > 7 ? 'show-tag' : '') || (step < 7 ? 'hidden-tag' : '')}>
                            <div className="pattern-text" id="step-7" >
                                <p onMouseUp={(evt) => {
                                    debugger;
                                    onGetSelectText(evt);
                                    if (submitted_entity)
                                        setErrors(Validator(rules_entityText, { entityText: evt.target.value }, errors));
                                }}>{pattern_templatesentence}</p>

                                <Label className={(step === 7 && submitted_entity && errors.entityText ? 'valid-text fw-500 fs-15' : '')}> {errors.entityText} </Label>
                            </div> 
                            
                        </FormGroup>

                        <p>

                        </p>
                        <FormGroup className={(step === 8 ? 'floating-text floating-div show-tag' : '') || (step > 8 ? 'show-tag' : '') || (step < 8 ? 'hidden-tag' : '')}>
                            <p><b>Bước 2</b>: Chọn loại thực thể có sẵn hoặc tạo mới</p>
                        </FormGroup>
                        <FormGroup className={(step === 8 && submitted && errors.entitytype_name ? 'floating-div show-tag valid-border' : '') || (step === 8 ? 'floating-div show-tag' : '') || (step > 8 ? 'show-tag' : '') || (step < 8 ? 'hidden-tag' : '')}>
                            <div className="entity-tutorial">
                                <h2>{entityText}</h2>
                                <div className="intent-auto-complete">
                                    <p style={{ color: '#a0a0a0' }} className={(step === 8 ? 'floating-div show-tag mb-0' : 'mb-0') || (step > 8 ? 'show-tag' : '') || (step < 8 ? 'hidden-tag' : '')}>
                                        <span>Chọn loại thực thể</span>
                                    </p>
                                    <div className={ (step === 8 ? 'floating-div show-tag' : '') || (step > 8 ? 'show-tag' : '') || (step < 8 ? 'hidden-tag' : '')}>
                                        <Input type="text" className="fw-600" placeholder="$ten_giay" style={{ border: 'none', paddingLeft: '0', paddingBottom: '15px' }} onChange={(evt) => {
                                            onChangeEntityTypeName(evt);
                                            if (submitted)
                                                setErrors(Validator(rules_entitytype_name, { entitytype_name: evt.target.value }, errors));
                                        }} value={entitytype_name} />   
                                    </div>
                                </div>
                            </div>
                            <Label className={(step === 8 && submitted && errors.entitytype_name ? 'show-tag valid-text' : 'hidden-tag')} style={{ marginLeft: '500px', marginTop: '5px' }}> {errors.entitytype_name} </Label>
                        </FormGroup>
                        <div style={{ position: 'absolute', bottom: '0', width: '100%' }}>
                            <button className={(step === 9 ? 'btn show-tag' : '') || (step < 9 ? 'hidden-tag' : '')} ><img src={back_icon} alt="alt" />  Quay lại</button>
                            <FormGroup style={{ position: 'absolute', right: '-15px', top: '-50px' }} className={(step === 9 ? 'floating-div circle-div show-tag' : '') || (step > 9 ? 'show-tag' : '') || (step < 9 ? 'hidden-tag' : '')}>
                            </FormGroup>
                            <button style={{ position: 'absolute', right: '0', top: '0px' }} id="step-9"
                                className={(step === 9 ? 'btn btn-guide-2 z-index-5 show-tag' : '') || (step < 9 ? 'hidden-tag' : '')}
                                onClick={() => { onAddEntity(), onHandleNext() }} >Tiếp tục</button>
                        </div>
                    </Col>
                </Row>

            </div>
        </div>
    }

    function step4() {
        return <div className="tutorial-white-box">
            <div className="bot-box bot-box-step3vs4 bot-box-step-4">

                <Row style={{ height: '100%' }}>
                    <Col md={12}>
                        <label className="title">Nhập câu trả lời</label>
                        <span>Với mỗi Ý định, bạn cần lên trước nội dung để Bot có thể trả lời tự động.</span>
                        <Table className="custom-table custom-table-2">
                            <tbody>
                                <tr>
                                    <td >
                                        <FormGroup>
                                            <div style={{ display: 'flex' }}>
                                                <Label for="Name">Ý định: </Label>
                                                <span className="intent-step-4" >  {intent_name} </span>
                                            </div>
                                            <span className="mb-0" name="Description" id="Description"> {pattern_templatesentence} </span>
                                        </FormGroup>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>

                        <Table className={(step === 10 ? 'hidden-tag' : 'custom-table custom-table-2')}>
                            <tr>
                                <td>
                                    <ResponseList items={responses} step={step} />
                                </td>
                            </tr>
                        </Table>
                        <div style={{ position: 'absolute', bottom: '0', width: '100%' }}>
                            <button className={(step === 14 ? 'btn show-tag' : '') || (step < 14 ? 'hidden-tag' : '')} ><img src={back_icon} alt="alt" />  Quay lại</button>
                            <FormGroup style={{ position: 'absolute', right: '31px', bottom: '-60px' }} className={(step === 14 ? 'floating-div circle-div show-tag' : '') || (step > 14 ? 'show-tag' : '') || (step < 14 ? 'hidden-tag' : '')}>
                            </FormGroup>
                            <button style={{ position: 'absolute', right: '43px', top: '-14px' }} id="step-14"
                                className={(step === 14 ? 'btn btn-guide-2 z-index-5 show-tag btn-tranning' : '') || (step < 14 ? 'hidden-tag' : '')}
                                onClick={() => { onAddEntity(), onHandleNext(); onTrainModel(); onTrainBot() }} >Huấn luyện</button>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    }

    function step5() {
        return <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 box-chat">
                        <div className="box-chat-header">
                            <img src={ava_chat_bot} alt="alt" style={{ position: 'absolute' }} />
                            <div style={{ marginLeft: '65px' }}>
                                <p className="fw-700">Buratino</p>
                                <p>Ngay lúc này</p>
                            </div>

                        </div>
                        <div className="box-chat-body fw-500">
                            <div>
                                <div className="incoming-msg">
                                    <div className="receive-msg">
                                        <p>Xin chào, mình là <span className="fw-600">Buratino</span>.<span style={{ display: 'block' }}>Chúng ta cùng xem bot hoạt động thế nào nhé.</span></p>
                                        <p>Giờ trong vai là khách hàng, bạn hãy hỏi giá của đôi giày Nike.</p>
                                    </div>    
                                </div>
                                <div className="outgoing-msg">
                                    <div className="sent-msg">
                                        <p>Đôi giày Nike này giá bao nhiêu?</p>
                                        <p>Đôi Nike giá 1500k ạ.</p>
                                        <p>Phần test đến đây là kết thúc rồi.</p>
                                    </div>
                                </div>
                                <div className="incoming-msg">
                                    <div className="receive-msg">
                                        <p>Đôi Nike giá 1500k ạ.</p>
                                        <p>Phần test đến đây là kết thúc rồi.</p>
                                        <p>Bạn có thể vào phần Trợ giúp để xem thêm hướng dẫn chi tiết và các tài liệu có liên quan khác.<span style={{ display: 'block' }} className="fw-600">Hẹn gặp lại trong lần trò chuyện kế tiếp nhé.</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="box-chat-footer">
                            <Input type="text" className="text-input-user fw-500" placeholder="Nhập nội dung tin nhắn" />
                            <button className="btn-send fw-500">Gửi ngay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    function step6() {
        return <div className= "sank-div-done">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 popup-final item-center">
                        <div className="align-center">
                            <img src={popup_success} alt="alt" />
                            <p className="fw-600 fs-18">Chúc mừng !</p>
                            <p className="fw-500">Bạn đã hoàn thành phần hướng dẫn tạo Bot!</p>
                            <button className="fw-600 return-homepage-btn">Trở lại màn hình chính</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    function renderStep() {
        switch (step) {
            case 1:
                return step1();
            case 2:
            case 3:
            case 4:
                return step2();
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                return step3();
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
                return step4();
            //case 15:
                //return step5();
            //case 16:
                //return step6();
            default:
                return null;
        }
    }

    function renderGuide() {
        //debugger;
        switch (step) {
            case 1:
                return <div className="guide-div guide-div-step-1" style={styles} >
                    <span className="title">Bước 1: Chọn lĩnh vực</span>
                    <span>Mỗi lĩnh vực sẽ có một bộ dữ liệu riêng, vì vậy bạn hãy chọn lĩnh vực mình đang làm việc để tạo chatbot phù hợp.</span>
                    <span className="note">*Phần tùy chỉnh bạn có thể tạo sau khi hoàn thành phần hướng dẫn này.</span>
                </div>
            case 2:
                return <div className="guide-div " style={styles}>
                    <span className="title">Bước 2: Nhập tên bot</span>
                    <span>Bạn hãy nhập tên bot, tên giúp bạn phân biệt các bot với nhau</span>

                    <button className="btn btn-guide" onClick={
                        (evt) => {
                            //debugger;
                            setSubmitted(true);
                            var er = Validator(rules_bot_name, { bot_name: bot_name }, errors);
                            setErrors(er);
                            if (Object.keys(er).length > 0) {
                                evt.preventDefault();
                            } else {
                                onHandleNext(evt);
                            }
                        } }>Tiếp tục</button>
                </div>
            case 3:
                return <div className="guide-div" style={styles}>
                    <span className="title">Bước 2.1: Nhập mô tả</span>
                    <span>Bạn hãy nhập mô tả mục đích và chức năng của bot tại đây.</span>
                    <button className="btn btn-guide" onClick={onHandleNext}>Tiếp tục</button>
                </div>
            case 4:
                return <div className="guide-div" style={styles}>
                    <span className="title">Bước 2.2: Chọn tiếp tục</span>
                    <span>Sau khi nhập xong thông tin của bot, hãy nhấn Tiếp tục.</span>
                </div>
            case 5:
                return <div className="guide-div" style={styles}>
                    <span className="title">Bước 3: Nhập ý định</span>
                    <span>Giả sử khách hàng hỏi giá một đôi giày:<br /> "<b>Đôi giày Nike này giá bao nhiêu?</b>"<br /> Bạn hãy nhập tên "<b>Ý định</b>" của khách hàng"</span>
                    <button className="btn btn-guide" onClick={
                        (evt) => {
                            setSubmitted(true);
                            var er = Validator(rules_intent_name, { intent_name: intent_name }, errors);
                            setErrors(er);
                            if (Object.keys(er).length > 0) {
                                evt.preventDefault();
                            } else {
                                onAddIntent();
                                onHandleNext();
                            }
                        }}>Tiếp tục</button>
                </div>
            case 6:
                return <div className="guide-div" style={styles}>
                    <span className="title">Bước 3.1: Nội dung câu mẫu</span>
                    <span>Thực tế có rất nhiều cách hỏi giá của một đôi giầy. <br /> Bạn nhập một câu mà khách hàng sẽ hỏi</span>
                    <button className="btn btn-guide" onClick={
                        (evt) => {
                            setSubmitted(true);
                            var er = Validator(rules_pattern_templatesentence, { pattern_templatesentence: pattern_templatesentence }, errors);
                            setErrors(er);
                            if (Object.keys(er).length > 0) {
                                evt.preventDefault();
                            } else {
                                onAddPattern();
                                onHandleNext(); 
                            }
                        }}>Tiếp tục</button>
                </div>
            case 7:
                return <div className="guide-div" style={styles}>
                    <span className="title">Bước 3.2: Chọn thực <br /> thể trong câu</span>
                    <span >Bây giờ chatbot đã biết ý định và <br /> câu hỏi mẫu của khách hàng, <br /> bạn giúp Chatbot xác định giá <br /> của sản phẩm trong câu nhé.</span>
                    <button className="btn btn-guide" onClick={
                        (evt) => {
                            //debugger;
                            setSubmitted_entity(true);
                            var er = Validator(rules_entityText, { entityText: entityText }, errors);
                            setErrors(er);
                            if (Object.keys(er).length > 0) {
                                evt.preventDefault();
                            } else {
                                onHandleNext();
                            }
                        }}>Tiếp tục</button>
                </div>
            case 8:
                return <div className="guide-div" style={styles}>
                    <span className="title">Bước 3.3: Chọn loại thực thể</span>
                    <span>Ngoài Nike còn có Adidas, Reebok. Tất cả các loại giày <br /> đều có thể nhập chung vào một nhóm thực thể. <br /> Bạn có thể chọn nhóm thực thể có sẵn hoặc tạo mới.</span>
                    <button className="btn btn-guide" onClick={
                        (evt) => {
                            setSubmitted(true);
                            var er = Validator(rules_entitytype_name, { entitytype_name: entitytype_name }, errors);
                            setErrors(er);
                            if (Object.keys(er).length > 0) {
                                evt.preventDefault();
                            } else {
                                onAddEntityType();
                                onHandleNext();
                            }
                        }}>Tiếp tục</button>
                </div>
            case 9:
                return <div className="guide-div" style={styles}>
                    <span className="title">Bước 3.4: Chọn tiếp tục</span>
                    <span>Sau khi nhập xong thông tin, hãy nhấn Tiếp tục.</span>
                </div>
            case 10:
                return <div className="guide-div guide-div-step-4" style={styles}>
                    <span className="title">Bước 4: Thêm mới</span>
                    <span>Bạn chọn thêm một thẻ trả lời mới.</span>
                    <button className="btn btn-guide-4" onClick={() => { onAddResponse(); onHandleNext(); }} ><i className="fa fa-plus" aria-hidden="true" style={{ color: '#fff' }}></i></button>
                </div>
            case 11:
                return <div className="guide-div" style={styles}>
                    <span className="title">Bước 4.1: Chọn thêm văn bản</span>
                    <span>Bạn chọn trước kiểu trả lời văn bản.</span>
                </div>
            case 12:
                return <div className="guide-div" style={styles}>
                    <span className="title">Bước 4.2: Nhập nội dung văn bản</span>
                    <span>Bạn nhập phần nội dung vào ô.</span>
                    <button className="btn btn-guide" onClick={() => { console.log(responses); if (valid_check(responses.data[0].responseDetails[0].text) != null) { } else { onHandleNext(); } }}>Tiếp tục</button>
                   
                </div>
            case 13:
                return <div className="guide-div" style={styles}>
                    <span className="title">Bước 4.3: Chọn thêm hình ảnh</span>
                    <span>Bạn chọn tiếp kiểu trả lời Hình ảnh. Chọn một ảnh từ máy của bạn để tải lên.</span>

                </div>
            case 14:
                return <div className="guide-div" style={styles}>
                    <span className="title">Bước 4.4: Chọn huấn luyện</span>
                    <span>Vậy là câu trả lời của bạn sẽ gồm nội dung chữ và ảnh. <br /> Bạn nhấn tiếp Huấn luyện để Bot học những dữ liệu vừa cung cấp.</span> 
                </div>
            default:
                return null;
        }
    }
    
    return (
        <div style={{ height: '87vh' }}>
            <div className="sank-div">
            </div>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm mb-3" light >
                <div className="container-fluid chatbot-navbar">
                    <NavbarBrand tag={Link} to="/">Databay.ai</NavbarBrand>
                    <NavbarToggler className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse head-nav" navbar>
                        <ul className="navbar-nav flex-grow">
                            <NavItem>
                                <NavLink tag={Link} to="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink tag={Link} to="/tut">Tutorial</NavLink>
                            </NavItem>
                            <NavItem>
                                <Dropdown >
                                    <DropdownToggle nav caret className="user-info">
                                        User name
                                        </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem >Đăng xuất</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </NavItem>
                        </ul>
                    </Collapse>
                </div>
            </Navbar>


            <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', zIndex: 3 }}>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    {renderGuide()}
                </div>
            </div>

            
            {renderStep()}
        </div>
    );
}

//TutorialBot.propTypes = {
//    modal: PropTypes.bool,
//    //products: PropTypes.Array,
//    //columns: PropTypes.Array,
//    //submitted: PropTypes.bool,
//    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
//    onSubmitForm: PropTypes.func,
//    onChangeName: PropTypes.func,
//    onChangeDescription: PropTypes.func,
//    onToggle: PropTypes.func
//};

Container.propTypes = {
    fluid: PropTypes.bool
}

const mapStateToProps = createStructuredSelector({
    BusinessField: makeSelectBusinessField(),
    step: makeSelectStep(),
    styles: makeSelectStyles(),

    //add tutorial bot
    bot_name: makeSelectTutorialBotName(),
    bot_description: makeSelectTutorialBotDescription(),

    //add intent
    intent_name: makeSelectIntentName(),

    //add pattern
    pattern_templatesentence: makeSelectPatternTemplateSentence(),

    //add entity type
    entitytype_name: makeSelectEntityTypeName(),
    entityText: makeSelectEntityText(),

    //add response
    responses: makeSelectResponses(),
    botID: makeSelectTutorialBotID(),

});

export function mapDispatchToProps(dispatch) {
    function getSelectionText() {
        //debugger;
        var text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }
        //} else {
        //    alert('no')
        //}
        return text;
    }

    return {
        onHandleNext: evt => {
            if (evt !== undefined && evt.preventDefault)
                evt.preventDefault();
            dispatch(handleNext(evt))
        },

        onTrainBot: evt => {
            // train model
            // redirect to chat page
            
            dispatch(redirectToHomeChat());
            
        },
        onChangeStyles: evt => {
            //debugger;
            var styles = {
                background: '#1745f2',
                color: "#fff",
                position: 'absolute',
                top: evt.top - 90,
                    left: evt.right + 40,
                }
            dispatch(changeStyles(styles));
        },
        //add tutorial bot
        onAddTutorialBot: evt => {
            //debugger;
            dispatch(addTutorialBotRequest());
        },
        onChangeBotName: evt => {
            dispatch(changeTutorialBotName(evt.target.value));
        },
        onChangeBotDescription: evt => {
            dispatch(changeTutorialBotDescription(evt.target.value));
        },

        //add intent
        onAddIntent: evt => {
            dispatch(addIntentRequest());
        },
        onChangeIntentName: evt => {
            dispatch(changeIntentName(evt.target.value));
        },

        //add pattern
        onAddPattern: evt => {
            dispatch(addPatternRequest());
        },
        onChangePatternTemplateSentence: evt => {
            dispatch(changePatternTemplateSentence(evt.target.value));
        },

        //add entity type
        onAddEntityType: evt => {
            //debugger;
            dispatch(addEntityTypeRequest());
        },
        onChangeEntityTypeName: evt => {
            dispatch(changeEntityTypeName(evt.target.value));
        },

        // add response
        onAddResponse: evt => {
            //debugger;
            dispatch(addResponse());
        },


        onGetSelectText: evt => {
            //debugger;
            var selectText = getSelectionText();
            if (selectText.trim() != '') {
                dispatch(entityGetText(selectText))
            }
        },
        onAddEntity: evt => {
            //debugger;
            dispatch(addEntityRequest());

        },
        //onValid: evt => {
        //    //debugger;
        //    alert('Bạn chưa nhập nên không thể đi tiếp');
        //    dispatch(validRequest());
        //}

        onAddDefaultIntent: evt => {
            //debugger;
            dispatch(addDefaultIntent());
        },

        onAddPatternDefault:evt => {
            debugger;
            dispatch(addDefaultPattern());
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
)(Tutorial);
