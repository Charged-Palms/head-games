import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import axios from "axios";

export class Message extends Component {
  state = {
    message: "",
    user: [],
    match: [],
    messages: [],
    port: ""
  };
  socket = io.connect(":5555");

  getMessage = () => {
    this.socket.emit("FromAPI", data => {
      console.log(data);
      this.setState({
        messages: data
      });
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submit = () => {
    const { message } = this.state;
    const { matchId:match_id } = this.props.match.params;
    axios.post(`/api/messages/14`, { message }).then(res => {
        console.log(res)
      this.getMessage();
    });
    // this.setProfiles()
  };

  render() {
    console.log("this.state", this.state);
    const { matchId } = this.props.match.params;
    const {messages} = this.state
    let all = messages.map(el => {
        return (
          <div key={el.message_id}>
            <h1>{el.message}</h1>
            {/* <h1>{el.first_name}</h1> */}
          </div>
        );
      });
    return (
      <div>
        <h1>Message</h1>
        <input onChange={this.handleChange} name="message" type="text" />
        <button onClick={this.submit}>SUBMIT MESSAGE</button>
        {all}
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(Message);
