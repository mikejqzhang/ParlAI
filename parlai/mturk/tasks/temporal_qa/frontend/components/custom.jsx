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
  Row,
  Table,
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
      recentAnswer1: "",
      recentAnswer2: "",
      recentChange0: "",
      recentChange1: "",
      recentChange2: "",
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
        recentChange0: this.state.recentChange0,
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
        recentChange0: "",
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
          <Col sm={4}>
            <div>As of when?</div>
            <FormControl
              type="text"
              name="recentChange0"
              style={{
                width: "80%",
                height: "100%",
                float: "left",
                fontSize: "16px"
              }}
              value={this.state.recentChange0}
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
            <div>As of when?</div>
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
            <div>As of when?</div>
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
    let header_text = "Does the Answer to this Question Change Over Time?";
    if (this.props.task_description === null) {
      return <div>Loading</div>;
    }
    let num_subtasks = this.props.task_description.num_subtasks;

    let question = this.props.task_description.question;
    let content = (
      <div>
        In this task, you will be provided with a question and be asked to
        determine if its answer <b>has ever changed</b> in the past or if it's plausible
        that it <b>will change</b> in the future.
        <br />
        <br />
        To respond, you will select one of
        the following three options:
        <ul>
          <li>
            <div style={button_style}>Yes</div>: The answer to this question <b>has changed</b> or likely <b>will change</b>.
          </li>
          <li>
            <div style={button_style}>No</div>: The answer to this question <b>has not changed</b> and <b>is unlikely to change</b> in the future.
          </li>
          <li>
            <div style={button_style}>Maybe</div>: This should include questions where the answer <b>changes based on opinion</b>. You may also select this option if you are <b>unsure of the answer</b>.
          </li>
        </ul>
        If the you select <div style={button_style}>Yes</div> for the first response,
        you will also be asked to provide the most recent answers and when they started to apply,
        up to the third most recent answer.
        If it's unclear when an answer started to apply, leave the "as of" date blank.
        <br />
        In the examples below, the <b>bolded</b> text is what you should provide for
        second response.
        <br />
        <h3>Explanations and Examples:</h3>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer Changes?</th>
              <th>Explanation</th>
              <th>Most Recent Answers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>What city is the next winter olympics in?</td>
              <td><div style={button_style}>Yes</div></td>
              <td>The Olympics are held in a different city every 4 years</td>
              <td>
                The current answer is <b>Beijing</b> as of <b>2018</b>
                <br />
                The previous answer was <b>PyeongChang</b> as of <b>2014</b>
                <br />
                The answer before that was <b>Sochi</b> as of <b>2012</b>
              </td>
            </tr>
            <tr>
              <td>Who does Jeremy Lin play for?</td>
              <td><div style={button_style}>Yes</div></td>
              <td>Jeremy Lin has</td>
              <td>
                The current answer is the <b>Beijing Ducks</b> as of <b>August 27, 2019</b>
                <br />
                The previous answer was the <b>Toronto Raptors</b> as of <b>February 13, 2019</b>
                <br />
                The answer before that was <b>Atlanta Hawks</b> as of <b>July 13, 2018</b>
              </td>
            </tr>
            <tr>
              <td>Has the US ever had a female president?</td>
              <td><div style={button_style}>Yes</div></td>
              <td>The answer to this question may change in the future.
                  The "as of" date for the most recent answer should be left <b>blank</b>
                  since <b>No</b> has always been the answer as of now.
              </td>
              <td>
                The current answer is <b>No</b> as of <b>___</b>
              </td>
            </tr>
            <tr>
              <td>Has the US ever had a female president?</td>
              <td><div style={button_style}>Yes</div></td>
              <td>The answer to this question may change in the future.
                  The "as of" date for the most recent answer should be left <b>blank</b>
                  since <b>No</b> has always been the answer as of now.
              </td>
              <td>
                The current answer is <b>No</b> as of <b>___</b>
              </td>
            </tr>
            <tr>
              <td>Where was Dwight Howard born?</td>
              <td><div style={button_style}>No</div></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Who did Russians descend from?</td>
              <td><div style={button_style}>No</div></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>What is British Columbia?</td>
              <td><div style={button_style}>No</div></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Who did the Baltimore Ravens draft in 2011?</td>
              <td><div style={button_style}>No</div></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Who was Michael Jackson's best friend?</td>
              <td><div style={button_style}>Maybe</div></td>
              <td>The answer to this question is a matter of opion, and there isn't a definintive answer</td>
              <td></td>
            </tr>
            <tr>
              <td>What is there to do in Laredo TX?</td>
              <td><div style={button_style}>Maybe</div></td>
              <td>The answer to this question is a matter of opion, and there isn't a definintive answer</td>
              <td></td>
            </tr>
            <tr>
              <td>Which airport to fly in Rome?</td>
              <td><div style={button_style}>Maybe</div></td>
              <td>The answer to this question is a matter of opion, and there isn't a definintive answer</td>
              <td></td>
            </tr>
            <tr>
              <td>What form of government does Greece use?</td>
              <td><div style={button_style}>Maybe</div></td>
              <td>The answer to this question is a matter of opion, and there isn't a definintive answer</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
        <b>
          You will do this for {num_subtasks} questions.
          Use the [NEXT] button when you're done with each judgment.
        </b>
        <br />
        <br />
        <h4>Please accept the task if you're ready.</h4>
      </div>
    );
    if (!this.props.is_cover_page) {
      if (this.props.task_data.task_specs === undefined) {
        return <div>Loading</div>;
      }
      let num_subtasks = this.props.num_subtasks;
      let cur_index = this.props.current_subtask_index + 1;
      content = (
        <div>
          <b>You are currently at comparison {cur_index} / {num_subtasks}{" "}</b>
          <br />
          <br />
          In this task, you will be provided with a question and be asked to
          determine if its answer <b>has ever changed</b> in the past or if it's plausible
          that it <b>will change</b> in the future.
          <br />
          <br />
          To respond, you will select one of
          the following three options:
          <ul>
            <li>
              <div style={button_style}>Yes</div>: The answer to this question <b>has changed</b> or likely <b>will change</b>.
            </li>
            <li>
              <div style={button_style}>No</div>: The answer to this question <b>has not changed</b> and <b>is unlikely to change</b> in the future.
            </li>
            <li>
              <div style={button_style}>Maybe</div>: This should include questions where the answer <b>changes based on opinion</b>. You may also select this option if you are <b>unsure of the answer</b>.
            </li>
          </ul>
          If the you select <div style={button_style}>Yes</div> for the first response,
          you will also be asked to provide the most recent answers and when they started to apply,
          up to the third most recent answer.
          If it's unclear when an answer started to apply, leave the "as of" date blank.
          <br />
          In the examples below, the <b>bolded</b> text is what you should provide for
          second response.
          <br />
          <h3>Explanations and Examples:</h3>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer Changes?</th>
                <th>Explanation</th>
                <th>Most Recent Answers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>What city is the next winter olympics in?</td>
                <td><div style={button_style}>Yes</div></td>
                <td>The Olympics are held in a different city every 4 years</td>
                <td>
                  The current answer is <b>Beijing</b> as of <b>2018</b>
                  <br />
                  The previous answer was <b>PyeongChang</b> as of <b>2014</b>
                  <br />
                  The answer before that was <b>Sochi</b> as of <b>2012</b>
                </td>
              </tr>
              <tr>
                <td>Who does Jeremy Lin play for?</td>
                <td><div style={button_style}>Yes</div></td>
                <td>Jeremy Lin has</td>
                <td>
                  The current answer is the <b>Beijing Ducks</b> as of <b>August 27, 2019</b>
                  <br />
                  The previous answer was the <b>Toronto Raptors</b> as of <b>February 13, 2019</b>
                  <br />
                  The answer before that was <b>Atlanta Hawks</b> as of <b>July 13, 2018</b>
                </td>
              </tr>
              <tr>
                <td>Has the US ever had a female president?</td>
                <td><div style={button_style}>Yes</div></td>
                <td>The answer to this question may change in the future.
                    The "as of" date for the most recent answer should be left <b>blank</b>
                    since <b>No</b> has always been the answer as of now.
                </td>
                <td>
                  The current answer is <b>No</b> as of <b>___</b>
                </td>
              </tr>
              <tr>
                <td>Has the US ever had a female president?</td>
                <td><div style={button_style}>Yes</div></td>
                <td>The answer to this question may change in the future.
                    The "as of" date for the most recent answer should be left <b>blank</b>
                    since <b>No</b> has always been the answer as of now.
                </td>
                <td>
                  The current answer is <b>No</b> as of <b>___</b>
                </td>
              </tr>
              <tr>
                <td>Where was Dwight Howard born?</td>
                <td><div style={button_style}>No</div></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Who did Russians descend from?</td>
                <td><div style={button_style}>No</div></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>What is British Columbia?</td>
                <td><div style={button_style}>No</div></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Who did the Baltimore Ravens draft in 2011?</td>
                <td><div style={button_style}>No</div></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Who was Michael Jackson's best friend?</td>
                <td><div style={button_style}>Maybe</div></td>
                <td>The answer to this question is a matter of opion, and there isn't a definintive answer</td>
                <td></td>
              </tr>
              <tr>
                <td>What is there to do in Laredo TX?</td>
                <td><div style={button_style}>Maybe</div></td>
                <td>The answer to this question is a matter of opion, and there isn't a definintive answer</td>
                <td></td>
              </tr>
              <tr>
                <td>Which airport to fly in Rome?</td>
                <td><div style={button_style}>Maybe</div></td>
                <td>The answer to this question is a matter of opion, and there isn't a definintive answer</td>
                <td></td>
              </tr>
              <tr>
                <td>What form of government does Greece use?</td>
                <td><div style={button_style}>Maybe</div></td>
                <td>The answer to this question is a matter of opion, and there isn't a definintive answer</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
          <b>
            You will do this for {num_subtasks} questions.
            Use the [NEXT] button when you're done with each judgment.
          </b>
          <br />
          <br />
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

class MessageList extends React.Component {
  makeMessages() {
    let agent_id = this.props.agent_id;
    if (this.props.task_data.task_specs === undefined) {
      return (
        <div>
          <p> Loading Questions </p>
        </div>
      );
    }
    let task_data = this.props.task_data;
    let messages = task_data.task_specs.messages;
    // Handles rendering messages from both the user and anyone else
    // on the thread - agent_ids for the sender of a message exist in
    // the m.id field.
    let XChatMessage = getCorrectComponent('XChatMessage', this.props.v_id);
    let onClickMessage = this.props.onClickMessage;
    if (typeof onClickMessage !== 'function') {
      onClickMessage = idx => {};
    }
    return messages.map((m, idx) => (
      <div key={m.message_id} onClick={() => onClickMessage(idx)}>
        <XChatMessage
          is_self={m.id == agent_id}
          agent_id={m.id}
          message={m.text}
        />
      </div>
    ));
  }

  render() {
    return (
      <div id="message_thread" style={{ width: '100%' }}>
        {this.makeMessages()}
      </div>
    );
  }
}

export default {
  XMessageList: { default: MessageList },
  XEvalResponse: { default: EvalResponse },
  XResponsePane: { default: ResponsePane },
  XContentPane: { default: PairwiseEvalPane },
  XTaskDescription: { default: TaskDescription }
};
