/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useState } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { useInjectReducer } from "utils/injectReducer";
import { useInjectSaga } from "utils/injectSaga";
import {
  makeSelectBots,
  makeSelectError,
  makeSelectSuggestionValue,
  makeSelectSuggestions,
  makeSelectBotName,
  makeSelectBotDescription,
  makeSelectModal,
  makeSelectID,
  makeSelectBusiness,
} from "./selectors";
import { makeSelectBot } from "../App/selectors";
import {
  requestBots,
  changeSuggestionValue,
  changeSuggestions,
  requestCreateBot,
  getCreateBotsSuccess,
  getCreateBotsError,
  changeBotName,
  changeBotAdd,
  changeBotDescription,
  changeBot,
  onToggle,
  requestAddBot,
  deleteBotRequest,
  editBotRequest,
  changeBusiness,
  changeSearch,
} from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { push } from "connected-react-router";
import Autosuggest from "react-autosuggest";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Row,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Validator from "utils/validator";

import createDateIcon from "../../images/icon-chatbot/calendar-icon.png";
import botNameIcon from "../../images/icon-chatbot/bot-icon.png";
import chatNumberIcon from "../../images/icon-chatbot/chat-icon.png";
import iconaddBot from "../../images/add-bot.png";
import editName from "../../images/edit.png";
import iconrecycle from "../../images/icon-chatbot/recycle-bin-icon.png";
import iconduplicate from "../../images/icon-chatbot/duplicate-icon.png";
import search from "../../images/search-icon.png";
import editpass from "../../images/edit-icon.png";
import imglogout from "../../images/img-logout.png";
import imgrepair from "../../images/img-repair.png";
import avataruser from "../../images/ava-user.png";
const key = "home";

function upperCaseText(txt) {
  txt = txt.trim();
  if (txt == "") {
    return txt;
  }
  var arr = txt.split(" ");
  if (arr.length == 1) {
    return arr[0].substring(0, 2).toUpperCase();
  } else {
    return (
      arr[0].substring(0, 1).toUpperCase() +
      arr[1].substring(0, 1).toUpperCase()
    );
  }
}

export function HomePage({
  //loading,
  modal,
  onToggle,
  onSubmitForm,
  error,
  bots,
  bot,
  onChangeBot,
  onLoad,
  onDelete,
  business,

  suggestionValue,
  suggestions,
  onChange,
  onSearchChange,
  onSuggestionsFetchRequested,
  onSuggestionsClearRequested,

  botId,
  bot_name,
  bot_description,

  onChangeName,
  onChangeBotAdd,
  onChangeDescription,
  onChangeDeleteBot,
  onUpdateBotName,
  onChangeBusiness,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [hoverBotName, setHoverBotName] = useState("");
  const [addInputBotName, setAddInputBotName] = useState("");

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const rules = [
    {
      field: "name",
      method: "isEmpty",
      validWhen: false,
      message: "Tên bot không được để trống",
    },
    {
      field: "business",
      method: "isEmpty",
      validWhen: false,
      message: "Tên lĩnh vực không được để trống",
    },
  ];

  const getSuggestionValue = (suggestion) => {
    suggestion.name;
  };
  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  const inputProps = {
    placeholder: "Type a programming language",
    value: suggestionValue,
    onChange: onChange,
  };

  //onChange = (event, { newValue }) => {
  //    setValue(newValue);
  //};

  useEffect(() => {
    onLoad();
  }, []);

  let items = bots || [];

  let listItems = items.map((bot, index) => (
    <div
      className="col-lg-3 col-md-6 col-sm-12 col-xs-12"
      data-bot={bot.internalId}
    >
      <div
        className={
          `bot-style bot-style1 bot-background-color bot-background-color` +
          ((index % 5) + 2)
        }
      >
        <div className="bot-content" onClick={onChangeBot}>
          <div className="bot-icon">
            <div className="img-center">
              <div className="img-text">{upperCaseText(bot.name)}</div>
            </div>
          </div>
          <div className="chat-number">
            <span id="nd">0 Chat</span>
            <span id="icon-red" />
          </div>
        </div>
        <div className="bot-footer">
          <div
            className="bot-name-section"
            onMouseEnter={() => setHoverBotName(bot.internalId)}
            onMouseLeave={() => {
              setHoverBotName("");
            }}
          >
            <span className="bot-name">{bot.name}</span>
            {hoverBotName == bot.internalId && (
              <a
                className=""
                onClick={() => setAddInputBotName(bot.internalId)}
              >
                <img
                  className="bot-edit-name-icon"
                  src={editName}
                  alt="edit-name-icon"
                />
              </a>
            )}
            {addInputBotName == bot.internalId && (
              <input
                className="Input-edit-bot-name"
                autofocus="autofocus"
                type="text"
                onChange={onChangeName}
                onBlur={(evt) => {
                  onUpdateBotName(evt);
                  setAddInputBotName("");
                }} /*value={bot_name}*/
              />
            )}
          </div>
          <div className="bot-foot--icon">
            <a className="icon-content-duplicate">
              <img src={iconduplicate} alt="duplicate-icon" />
            </a>

            <a className="icon-trash" onClick={onDelete}>
              <img src={iconrecycle} alt="recycle-bin-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  ));
  return (
    <article className="container-fluid select-bot-monitor">
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light" id="mainNav">
          <div className="container" style={{ display: "contents" }}>
            <button
              id="home"
              type="button"
              className="btn btn-primary btn-lg padding: .5rem 1rem;"
            />
            <a className="navbar-brand" href="/">
              Databay.ai
            </a>
            <button
              className="navbar-toggler navbar-toggler-right"
              type="button"
              data-toggle="collapse"
              data-target="#navbarResponsive"
              aria-controls="navbarResponsive"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              Menu
              <i className="fas fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <div>
                  <UncontrolledDropdown>
                    <DropdownToggle className="Button">
                      <img src={avataruser} className="mr-10" />
                      <span className="fw-600 nav-item  js-scroll-trigger">
                        Hoanghai
                      </span>
                    </DropdownToggle>
                    <DropdownMenu right className="intent__dropdown-menu">
                      <DropdownItem
                        type="button"
                        className="button-function"
                        data-toggle="tooltip"
                      >
                        <img className="img-edit" src={editpass} /> Đổi mật khẩu
                      </DropdownItem>

                      <DropdownItem
                        type="button"
                        className="button-function"
                        data-toggle="tooltip"
                      >
                        <img className="img-edit" src={imgrepair} />
                        Sửa thông tin
                      </DropdownItem>

                      <DropdownItem
                        type="button"
                        className="button-function"
                        data-toggle="tooltip"
                      >
                        <img className="img-edit" src={imglogout} /> Đăng xuất
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div className="bot-box">
        <div className="jumbotron-fluid border-none" id="box-all">
          <div className="">
            <div style={{ marginLeft: "22px", marginBottom: "28px" }}>
              <h3>Chọn Bot chat của bạn</h3>
            </div>
            <div className="row">
              <form className="example" action="action_page.php">
                <input
                  id="txt_search_bot"
                  className="from-control"
                  placeholder="Tìm kiếm bot"
                  style={{
                    width: "540px",
                    height: "42px",
                    paddingLeft: "34px",
                    paddingRight: "0px",
                  }} /*onChange={onSearchChange}*/
                />
                <div className="input-group-btns">
                  <button
                    className="ai-content__body--input-gr-btns"
                    type="search"
                  >
                    <span className="">
                      <img className="img-search" src={search} alt="icon" />
                    </span>
                  </button>
                </div>
                <i
                  className="icon-magnify"
                  style={{ position: "absolute", top: "5px", left: "7px" }}
                >
                  <i className="fa fa-name-shape-o-direction" />
                </i>
              </form>
              <select
                name="chon"
                id="inputchon"
                className="form-control"
                required="required"
              >
                <option value="1" src={createDateIcon}>
                  Theo ngày tạo
                </option>
                <option value="2" src={botNameIcon}>
                  Theo tên bot
                </option>
                <option value="3" src={chatNumberIcon}>
                  Theo số lượng chat
                </option>
              </select>
            </div>
            <div className="main-display">
              <div
                style={{ width: "100%", position: "relative", float: "left" }}
              />
              <div id="lstbot" className="container-fluid">
                <div className="bot-display-area ">
                  <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                      <div className="bot-style bot-style1 bot-background-color bot-background-color1">
                        <div className="bot-content">
                          <div
                            className="bot-icons"
                            onClick={() => {
                              setSubmitted(false);
                              setErrors({});
                              onToggle();
                            }}
                          >
                            <div className="img-centers">
                              <img
                                className="icon-add-bot"
                                src={iconaddBot}
                                alt="icon"
                              />
                            </div>
                          </div>
                          <div className="new-bot">Tạo chat bot</div>
                        </div>
                      </div>
                    </div>
                    {listItems}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modal}
        toggle={onToggle}
        className="intent__modal  createBot_modal"
      >
        <ModalHeader toggle={onToggle} className="ff">
          Thêm mới bot
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup className="">
              <Label for="businessField">Lĩnh vực</Label>
              <Input
                className={submitted && errors.business ? " has-error" : ""}
                type="select"
                name="BusinessField"
                id="businessField"
                onChange={(evt) => {
                  onChangeBusiness(evt);
                  if (submitted) {
                    setErrors(
                      Validator(
                        rules,
                        { business: evt.target.value, name: bot_name },
                        errors
                      )
                    );
                  }
                }}
                value={business}
              >
                <option value="" disabled>
                  Chọn lĩnh vực
                </option>
                <option value="2">Bảo hiểm</option>
                <option value="3">Tài chính - Ngân hàng</option>
                <option value="4">Thương mại</option>
                <option value="5">Khác</option>
              </Input>
              <label className="error">{errors.business}</label>
            </FormGroup>
            <FormGroup>
              <Label for="intentname">Tên Bot</Label>
              <Input
                className={submitted && errors.name ? " has-error" : ""}
                type="text"
                name="IntentName"
                id="intentname"
                onChange={(evt) => {
                  onChangeBotAdd(evt);
                  if (submitted) {
                    setErrors(
                      Validator(
                        rules,
                        { name: evt.target.value, business: business },
                        errors
                      )
                    );
                  }
                }}
                value={bot_name}
                placeholder="Nhập tên bot"
              />
              <label className="error">{errors.name}</label>
            </FormGroup>
            <FormGroup>
              <Label for="desc">Mô tả</Label>
              <Input
                type="textarea"
                name="Description"
                id="desc"
                onChange={onChangeDescription}
                value={bot_description}
                placeholder="Nhập mô tả"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter style={{ marginTop: "25%" }}>
          <Button
            onClick={(evt) => {
              setSubmitted(true);
              var er = Validator(
                rules,
                { name: bot_name, business: business },
                errors
              );
              setErrors(er);
              if (Object.keys(er).length > 0) {
                evt.preventDefault();
              } else {
                onSubmitForm(evt);
              }
            }}
            className="intent__modal--add-btn"
          >
            + Thêm mới
          </Button>
          <Button onClick={onToggle} className="intent__modal--cancel-btn">
            Hủy bỏ
          </Button>
        </ModalFooter>
      </Modal>
    </article>
  );
}

HomePage.propTypes = {
  //loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
  onToggle: PropTypes.func,
  onUpdateBotName: PropTypes.func,
  //bots: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  bot: PropTypes.string,
  onChangeBot: PropTypes.func,
  onChangeDeleteBot: PropTypes.func,
  modal: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  bots: makeSelectBots(),
  bot: makeSelectBot(),
  //loading: makeSelectLoading(),
  error: makeSelectError(),

  botId: makeSelectBot(),
  suggestionValue: makeSelectSuggestionValue(),
  suggestions: makeSelectSuggestions(),

  bot_name: makeSelectBotName(),
  bot_description: makeSelectBotDescription(),
  modal: makeSelectModal(),
  business: makeSelectBusiness(),
  //id: makeSelectID(),
});

export function mapDispatchToProps(dispatch) {
  const languages = [
    {
      name: "C",
      year: 1972,
    },
    {
      name: "C#",
      year: 2000,
    },
    {
      name: "C++",
      year: 1983,
    },
    {
      name: "Clojure",
      year: 2007,
    },
    {
      name: "Elm",
      year: 2012,
    },
    {
      name: "Go",
      year: 2009,
    },
    {
      name: "Haskell",
      year: 1990,
    },
    {
      name: "Java",
      year: 1995,
    },
    {
      name: "Javascript",
      year: 1995,
    },
    {
      name: "Perl",
      year: 1987,
    },
    {
      name: "PHP",
      year: 1995,
    },
    {
      name: "Python",
      year: 1991,
    },
    {
      name: "Ruby",
      year: 1995,
    },
    {
      name: "Scala",
      year: 2003,
    },
  ];
  const getSuggestions = (value) => {
    const inputValue = value.value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : languages.filter(
          (lang) => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  return {
    onChangeBot: (evt) => {
      evt.preventDefault();
      const botId = evt.currentTarget.offsetParent.attributes["data-bot"].value;
      //dispatch(getBot(botId));
      dispatch(push("/" + botId + "/intent"));
    },

    // edit/delete a selected bot
    //onChangeDeleteBot: evt => {
    //    const botId = evt.currentTarget.attributes['data-bot'].value;
    //    dispatch(changeBot(botId));
    //},

    onLoad: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(requestBots());
    },

    onChange: (evt) => {
      var value = evt.target.value || evt.target.innerText;
      dispatch(changeSuggestionValue(value));
    },

    onSuggestionsFetchRequested: (evt) => {
      dispatch(changeSuggestions(getSuggestions(evt)));
    },

    onSuggestionsClearRequested: (evt) => {
      dispatch(changeSuggestions([]));
    },

    onChangeName: (evt) => {
      const botId =
        evt.currentTarget.offsetParent.offsetParent.attributes["data-bot"]
          .value;
      dispatch(changeBot(botId));
      dispatch(changeBotName(evt.target.value));
    },

    onChangeBotAdd: (evt) => {
      dispatch(changeBotAdd(evt.target.value));
    },

    onChangeDescription: (evt) => {
      dispatch(changeBotDescription(evt.target.value));
    },

    onToggle: (evt) => {
      dispatch(onToggle());
    },

    onUpdateBotName: (evt) => {
      if (evt.target.value != "") {
        dispatch(editBotRequest());
      }
      setTimeout(() => {
        dispatch(requestBots());
      }, 100);
    },

    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(requestCreateBot());
      dispatch(onToggle());
      setTimeout(() => {
        dispatch(requestBots());
      }, 100);
    },
    onDelete: (evt) => {
      evt.preventDefault();
      var answer = confirm("Bạn có thực sự muốn xóa?");
      if (answer) {
        const botId =
          evt.currentTarget.offsetParent.attributes["data-bot"].value;
        dispatch(changeBot(botId));
        dispatch(deleteBotRequest());
        setTimeout(() => {
          dispatch(requestBots());
        }, 100);
      }
    },

    onChangeBusiness: (evt) => {
      dispatch(changeBusiness(evt.target.value));
    },

    onSearchChange: (evt) => {
      dispatch(changeSearch(evt.target.value));
      dispatch(requestBots());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  memo
)(HomePage);
