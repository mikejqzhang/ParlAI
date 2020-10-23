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
    let form_question = "Part 1) Has the answer to the question above changed in the past or is it plausible that it will change in the future?";
    let text_question = "Part 2) If you answered \"Yes\" to Part 1, enter the three most recent answers below along with when the answers changed.";
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
        <b>Part 1)</b> In this task, you will be provided with a question and be asked to
        determine if its answer <b>has ever changed</b> in the past or if it's plausible
        that it <b>will change</b> in the future.
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
        <br />
        <b>Part 2)</b> If the you selected <div style={button_style}>Yes</div> for the <b>Part 1)</b>,
        you will also be asked to provide the most recent answers and when they started to apply,
        up to the third most recent answer.
        <br />
        You will often have to perform a quick wikipedia search to find this information.
        If the answer or date do not exist or are still unclear after your initial search, you may leave these fields blank (see <b>Examples</b> below).
        <br />
        <br />
        <b>You will do this for {num_subtasks} questions</b>.
        <br />
        <b>After you're done with both parts for a question,
           use the [NEXT] button at the bottom of this instructions panel to move on.</b>
        <br />
        <h3>Examples:</h3>
        The expected responses for the most recent answers and dates when they apply are <b>bolded</b> in the <b>Answer Changes?</b>.
        <Table bordered hover size="sm">
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
              <td>Jeremy Lin, an NBA player, most recently played for the following teams.</td>
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
                  <br />
                  The "as of" date for the most recent answer should be
                  left blank since there is no clear start date.
              </td>
              <td>
                The current answer is <b>No</b>
              </td>
            </tr>
            <tr>
              <td>Who has the highest minimum wage in the usa?</td>
              <td><div style={button_style}>Yes</div></td>
              <td>The answer to this question can change and likely has changed in the past,
                  <br />
                  but it's easily identifiable from a wikipedia search
                  and therefore the most recent answers may be left blank.
              </td>
              <td>
              </td>
            </tr>
            <tr>
              <td>What movies did Adam Sandler play in?</td>
              <td><div style={button_style}>Yes</div></td>
              <td>What should we do here?</td>
              <td>
                What should we do here?
              </td>
            </tr>
            <tr>
              <td>Where was Dwight Howard born?</td>
              <td><div style={button_style}>No</div></td>
              <td>This answer does not change because being born is a one-time event.</td>
              <td></td>
            </tr>
            <tr>
              <td>The most common type of rock in Earth's crust is?</td>
              <td><div style={button_style}>No</div></td>
              <td>It's unlikely that the answer to this question will change.</td>
              <td></td>
            </tr>
            <tr>
              <td>Who played Benjamin Button as an old man?</td>
              <td><div style={button_style}>No</div></td>
              <td>This answer does not change since the actor has not and will not change.</td>
              <td></td>
            </tr>
            <tr>
              <td>Who did the Baltimore Ravens draft in 2011?</td>
              <td><div style={button_style}>No</div></td>
              <td>Because a date is specified in the question, the answer does not change.</td>
              <td></td>
            </tr>
            <tr>
              <td>Who was Michael Jackson's best friend?</td>
              <td><div style={button_style}>Maybe</div></td>
              <td>The there isn't a definintive answer to this question.</td>
              <td></td>
            </tr>
              <tr>
                <td>Which airport to fly in Rome?</td>
                <td><div style={button_style}>Maybe</div></td>
                <td>The answer to this question is unclear and is a matter of opinon.</td>
                <td></td>
              </tr>
            <tr>
              <td>What is there to do in Laredo TX?</td>
              <td><div style={button_style}>Maybe</div></td>
              <td>The answer to this question is a matter of opion.</td>
              <td></td>
            </tr>
            <tr>
              <td>What is the record for January?</td>
              <td><div style={button_style}>Maybe</div></td>
              <td>This question to too vague to answer.</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
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
          <b>Part 1)</b> In this task, you will be provided with a question and be asked to
          determine if its answer <b>has ever changed</b> in the past or if it's plausible
          that it <b>will change</b> in the future.
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
          <br />
          <b>Part 2)</b> If the you selected <div style={button_style}>Yes</div> for the <b>Part 1)</b>,
          you will also be asked to provide the most recent answers and when they started to apply,
          up to the third most recent answer.
          <br />
          You will often have to perform a quick wikipedia search to find this information.
          If the answer or date do not exist or are still unclear after your initial search, you may leave these fields blank (see <b>Examples</b> below).
          <br />
          <br />
          <b>After you're done with both parts for a question,
             use the [NEXT] button at the bottom of this instructions panel to move on.</b>
          <br />
          <h3>Examples:</h3>
          The expected responses for the most recent answers and dates when they apply are <b>bolded</b> in the <b>Answer Changes?</b>.
          <Table bordered hover size="sm">
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer Changes?</th>
                <th>Explanation & Most Recent Answers</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>What city is the next winter olympics in?</td>
                <td><div style={button_style}>Yes</div></td>
                <td>
                  The Olympics are held in a different city every 4 years
                  <br />
                  <br />
                  <b>Most Recent Answers:</b>
                  <br />
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
                <td>
                  Jeremy Lin, an NBA player, most recently played for the following teams.
                  <br />
                  <br />
                  <b>Most Recent Answers:</b>
                  <br />
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
                <td>
                  The answer to this question may change in the future.
                  The "as of" date for the most recent answer should be left blank since there is no clear start date.
                  <br />
                  <br />
                  <b>Most Recent Answers:</b>
                  <br />
                  The current answer is <b>No</b>
                </td>
              </tr>
              <tr>
                <td>Who has the highest minimum wage in the usa?</td>
                <td><div style={button_style}>Yes</div></td>
                <td>
                  The answer to this question can change and likely has changed in the past,
                  but it's easily identifiable from a wikipedia search
                  and therefore the most recent answers may be left blank.
                </td>
              </tr>
              <tr>
                <td>What movies did Adam Sandler play in?</td>
                <td><div style={button_style}>Yes</div></td>
                <td><b>What should we do here?</b></td>
              </tr>
              <tr>
                <td>Where was Dwight Howard born?</td>
                <td><div style={button_style}>No</div></td>
                <td>This answer does not change because being born is a one-time event.</td>
              </tr>
              <tr>
                <td>The most common type of rock in Earth's crust is?</td>
                <td><div style={button_style}>No</div></td>
                <td>It's unlikely that the answer to this question will change.</td>
              </tr>
              <tr>
                <td>Who played Benjamin Button as an old man?</td>
                <td><div style={button_style}>No</div></td>
                <td>This answer does not change since the actor has not and will not change.</td>
              </tr>
              <tr>
                <td>Who did the Baltimore Ravens draft in 2011?</td>
                <td><div style={button_style}>No</div></td>
                <td>Because a date is specified in the question, the answer does not change.</td>
              </tr>
              <tr>
                <td>Who was Michael Jackson's best friend?</td>
                <td><div style={button_style}>Maybe</div></td>
                <td>The there isn't a definintive answer to this question.</td>
              </tr>
              <tr>
                <td>Which airport to fly in Rome?</td>
                <td><div style={button_style}>Maybe</div></td>
                <td>The answer to this question is unclear and is a matter of opinon.</td>
              </tr>
              <tr>
                <td>What is there to do in Laredo TX?</td>
                <td><div style={button_style}>Maybe</div></td>
                <td>The answer to this question is a matter of opinon.</td>
              </tr>
              <tr>
                <td>What is the record for January?</td>
                <td><div style={button_style}>Maybe</div></td>
                <td>This question to too vague to answer.</td>
              </tr>
            </tbody>
          </Table>
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

class LeftPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current_pane: 'instruction', last_update: 0 };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.task_data !== undefined &&
      nextProps.task_data.last_update !== undefined &&
      nextProps.task_data.last_update > prevState.last_update
    ) {
      return {
        current_pane: 'context',
        last_update: nextProps.task_data.last_update,
      };
    } else return null;
  }

  render() {
    let v_id = this.props.v_id;
    let frame_height = this.props.frame_height;
    let frame_style = {
      height: frame_height + 'px',
      backgroundColor: '#dff0d8',
      padding: '30px',
      overflow: 'auto',
    };
    let XTaskDescription = getCorrectComponent('XTaskDescription', v_id);
    let pane_size = this.props.is_cover_page ? 'col-xs-12' : 'col-xs-6';
    let has_context = this.props.task_data.has_context;
    if (this.props.is_cover_page || !has_context) {
      return (
        <div id="left-pane" className={pane_size} style={frame_style}>
          <XTaskDescription {...this.props} />
          {this.props.children}
        </div>
      );
    } else {
      let XContextView = getCorrectComponent('XContextView', v_id);
      // In a 2 panel layout, we need to tabulate the left pane to be able
      // to display both context and instructions
      let nav_items = [
        <NavItem
          eventKey={'instruction'}
          key={'instruction-selector'}
          title={'Task Instructions'}
        >
          {'Task Instructions'}
        </NavItem>,
        <NavItem
          eventKey={'context'}
          key={'context-selector'}
          title={'Context'}
        >
          {'Context'}
        </NavItem>,
      ];
      let display_instruction = {
        backgroundColor: '#dff0d8',
        padding: '10px 20px 20px 20px',
        flex: '1 1 auto',
      };
      let display_context = {
        backgroundColor: '#dff0d8',
        padding: '10px 20px 20px 20px',
        flex: '1 1 auto',
      };
      if (this.state.current_pane == 'context') {
        display_instruction.display = 'none';
      } else {
        display_context.display = 'none';
      }
      let nav_panels = [
        <div style={display_instruction} key={'instructions-display'}>
          <XTaskDescription {...this.props} />
        </div>,
        <div style={display_context} key={'context-display'}>
          <XContextView {...this.props} />
        </div>,
      ];

      let frame_style = {
        height: frame_height + 'px',
        backgroundColor: '#eee',
        padding: '10px 0px 0px 0px',
        overflow: 'auto',
        display: 'flex',
        flexFlow: 'column',
      };

      return (
        <div id="left-pane" className={pane_size} style={frame_style}>
          <Nav
            bsStyle="tabs"
            activeKey={this.state.current_pane}
            onSelect={key => this.setState({ current_pane: key })}
          >
            {nav_items}
          </Nav>
          {nav_panels}
          {this.props.children}
        </div>
      );
    }
  }
}

export default {
  XMessageList: { default: MessageList },
  XEvalResponse: { default: EvalResponse },
  XResponsePane: { default: ResponsePane },
  XContentPane: { default: PairwiseEvalPane },
  XTaskDescription: { default: TaskDescription },
  XLeftPane: { default: LeftPane }
};
