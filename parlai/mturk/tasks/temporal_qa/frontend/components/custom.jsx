/*
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from "react";
import {
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Grid,
  Input,
  Label,
  Radio,
  Row
} from "react-bootstrap";
import { getCorrectComponent } from "./core_components.jsx";
import $ from "jquery";
import Slider, { Range } from "rc-slider";

const button_style = {
  borderRadius: 3,
  padding: "1px 4px",
  display: "inline-block",
  backgroundColor: "#492FED",
  color: "white"
};


class EvalResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      speakerChoice: "",
      recentAnswer0: "",
      taskData: [],
      subtaskIndexSeen: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEnterKey = this.handleEnterKey.bind(this);
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   // Only change in the active status of this component should cause a
  //   // focus event. Not having this would make the focus occur on every
  //   // state update (including things like volume changes)
  //   if (this.props.active && !prevProps.active) {
  //     $("input#id_text_input").focus();
  //   }
  //   this.props.onInputResize();
  // }

  checkValidData() {
    console.log(this.state);
    if (this.state.speakerChoice !== "") {
      let response_data = {
        speakerChoice: this.state.speakerChoice,
        recentAnswer0: this.state.recentAnswer0,
        recentAnswer1: this.state.recentAnswer1,
        recentChange1: this.state.recentChange1,
        recentAnswer2: this.state.recentAnswer2,
        recentChange2: this.state.recentChange2
      };
      this.props.onValidDataChange(true, response_data);
      return;
    }
    this.props.onValidDataChange(false, {});
  }

  handleInputChange(event) {
    console.log(event);
    let target = event.target;
    let value = target.value;
    let name = target.name;

    this.setState({ [name]: value }, this.checkValidData);
  }

  handleEnterKey(event) {
    event.preventDefault();
    if (this.props.task_done) {
      this.props.allDoneCallback();
    } else if (this.props.subtask_done && this.props.show_next_task_button) {
      this.props.nextButtonCallback();
    }
  }

  render() {
    if (
      this.props.current_subtask_index != null &&
      this.props.current_subtask_index !== this.state.subtaskIndexSeen
    ) {
      this.setState({
        subtaskIndexSeen: this.props.current_subtask_index,
        speakerChoice: "",
        recentAnswer0: "",
        recentAnswer1: "",
        recentChange1: "",
        recentAnswer2: "",
        recentChange2: ""
      });
    }
    if (
      this.props.task_data === undefined ||
      this.props.task_data.task_specs === undefined
    ) {
      return <div></div>;
    }
    let form_question = "Has the answer to the question above changed in the past or is it plausible that it will change in the future?";
    let text_question = "If the answer to the question above has changed, please enter the current and previous two answers below along with when the answers changed.";
    let text_reason = (
      <div>
        <ControlLabel>{text_question}</ControlLabel>
        <Row>
          <Col sm={8}>
            <div>What is the current answer?</div>
            <FormControl
              type="text"
              name="recentAnswer0"
              style={{
                width: "80%",
                height: "100%",
                float: "left",
                fontSize: "16px"
              }}
              value={this.state.recentAnswer0}
              placeholder="Please enter here..."
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <div>What was the most recent answer?</div>
            <FormControl
              type="text"
              name="recentAnswer1"
              style={{
                width: "80%",
                height: "100%",
                float: "left",
                fontSize: "16px"
              }}
              value={this.state.recentAnswer1}
              placeholder="Please enter here..."
              onChange={this.handleInputChange}
            />
          </Col>
          <Col sm={4}>
            <div>When did the most recent answer change?</div>
            <FormControl
              type="text"
              name="recentChange1"
              style={{
                width: "80%",
                height: "100%",
                float: "left",
                fontSize: "16px"
              }}
              value={this.state.recentChange1}
              placeholder="Please enter here..."
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={8}>
            <div>What was the second most recent answer?</div>
            <FormControl
              type="text"
              name="recentAnswer2"
              style={{
                width: "80%",
                height: "100%",
                float: "left",
                fontSize: "16px"
              }}
              value={this.state.recentAnswer2}
              placeholder="Please enter here..."
              onChange={this.handleInputChange}
            />
          </Col>
          <Col sm={4}>
            <div>When did the second most recent answer change?</div>
            <FormControl
              type="text"
              name="recentChange2"
              style={{
                width: "80%",
                height: "100%",
                float: "left",
                fontSize: "16px"
              }}
              value={this.state.recentChange2}
              placeholder="Please enter here..."
              onChange={this.handleInputChange}
            />
          </Col>
        </Row>
      </div>
    );
    return (
      <div
        id="response-type-text-input"
        className="response-type-module"
        style={{
          paddingTop: "15px",
          float: "left",
          width: "100%",
          backgroundColor: "#eeeeee"
        }}
      >
        <Form
          horizontal
          style={{ backgroundColor: "#eeeeee", paddingBottom: "10px" }}
          onSubmit={this.handleEnterKey}
        >
          <div className="container" style={{ width: "auto" }}>
            <ControlLabel> {form_question} </ControlLabel>
            <FormGroup>
              <Col sm={4}>
                <Radio
                  name="speakerChoice"
                  value="Yes"
                  style={{ width: "100%" }}
                  checked={this.state.speakerChoice == "Yes"}
                  onChange={this.handleInputChange}
                >
                  <div style={button_style}>Yes</div>
                </Radio>
              </Col>
              <Col sm={4}>
                <Radio
                  name="speakerChoice"
                  value="No"
                  style={{ width: "100%" }}
                  checked={this.state.speakerChoice == "No"}
                  onChange={this.handleInputChange}
                >
                  <div style={button_style}>No</div>
                </Radio>
              </Col>
              <Col sm={4}>
                <Radio
                  name="speakerChoice"
                  value="Maybe"
                  style={{ width: "100%" }}
                  checked={this.state.speakerChoice == "Maybe"}
                  onChange={this.handleInputChange}
                >
                  <div style={button_style}>Maybe</div>
                </Radio>
              </Col>
            </FormGroup>
            {text_reason}
          </div>
        </Form>
      </div>
    );
  }
}

class ResponsePane extends React.Component {
  render() {
    let v_id = this.props.v_id;
    let XDoneResponse = getCorrectComponent("XDoneResponse", v_id);
    let XEvalResponse = getCorrectComponent("XEvalResponse", v_id);

    let response_pane = null;
    switch (this.props.task_state) {
      case "done":
        response_pane = <XDoneResponse {...this.props} />;
        break;
      default:
        response_pane = <XEvalResponse {...this.props} />;
        break;
    }

    return (
      <div
        id="right-bottom-pane"
        style={{ width: "100%", backgroundColor: "#eee" }}
      >
        {response_pane}
      </div>
    );
  }
}

class PairwiseEvalPane extends React.Component {
  handleResize() {
    console.log("HANDLE RESIZE CALLED");
    if (this.chat_pane !== undefined && this.chat_pane !== null) {
      console.log(this.chat_pane);
      if (this.chat_pane.handleResize !== undefined) {
        console.log(this.chat_pane.handleResize);
        this.chat_pane.handleResize();
      }
    }
  }

  render() {
    let v_id = this.props.v_id;
    let XChatPane = getCorrectComponent("XChatPane", v_id);
    let XResponsePane = getCorrectComponent("XResponsePane", v_id);
    let XTaskFeedbackPane = getCorrectComponent("XTaskFeedbackPane", v_id);

    let right_pane = {
      maxHeight: "60%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "spaceBetween",
      width: "auto"
    };
    if (
      this.props.current_subtask_index >=
      this.props.task_description.num_subtasks
    ) {
      return (
        <div id="right-pane" style={right_pane}>
          <XTaskFeedbackPane
            {...this.props}
            ref={pane => {
              this.chat_pane = pane;
            }}
            onInputResize={() => this.handleResize()}
          />
        </div>
      );
    }
    console.log("RETURNING");
    return (
      <div id="right-pane" style={right_pane}>
        <XChatPane
          {...this.props}
          message_count={this.props.messages.length}
          ref={pane => {
            this.chat_pane = pane;
          }}
        />
        <XResponsePane
          {...this.props}
          onInputResize={() => this.handleResize()}
        />
      </div>
    );
  }
}

class TaskDescription extends React.Component {
  render() {
    let header_text = "Which Conversational Partner is Better?";
    if (this.props.task_description === null) {
      return <div>Loading</div>;
    }
    let num_subtasks = this.props.task_description.num_subtasks;

    let question = this.props.task_description.question;
    let content = (
      <div>
        <h4>This is the accept page.</h4>
      </div>
    );
    if (!this.props.is_cover_page) {
      if (this.props.task_data.task_specs === undefined) {
        return <div>Loading</div>;
      }
      let num_subtasks = this.props.num_subtasks;
      let cur_index = this.props.current_subtask_index + 1;
      let question = this.props.task_data.task_specs.question;
      content = (
        <div>
          <h4>This is the instructions panel.</h4>
        </div>
      );
    }
    return (
      <div>
        <h1>{header_text}</h1>
        <hr style={{ borderTop: "1px solid #555" }} />
        {content}
      </div>
    );
  }
}

export default {
  XEvalResponse: { default: EvalResponse },
  XResponsePane: { default: ResponsePane },
  XContentPane: { default: PairwiseEvalPane },
  XTaskDescription: { default: TaskDescription }
};
