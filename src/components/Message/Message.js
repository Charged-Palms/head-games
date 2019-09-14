import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import axios from "axios";

export class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: "",
      username: 'socket FTW',
      usernameSet: false,
      userTyping: false,
      room: "hiya"
    };
    this.socket = io.connect(":5555");
    this.socket.on("global response", data => this.updateMessages(data));
    this.socket.on("room response", data => this.updateMessages(data));
  }

  componentDidMount = () => {
    this.socket.emit("join chat", { room: this.state.room });
    const { matchId: match_id } = this.props.match.params;
    // console.log('thf')
    axios.get(`/api/messages/${match_id}`).then(res => {
      console.log(res.data);
      this.setState({
        messages: res.data
      });
    });
  };

  blast = () => {
    this.socket.emit(
      `blast to ${this.props.room !== "global" ? "room" : "global"} socket`,
      {
        message: this.state.message,
        username: this.state.username,
        room: this.state.room
      }
    );
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  getMessage = () => {
    this.socket.emit("FromAPI", data => {
      console.log(data);
      this.setState({
        messages: data
      });
    });
  };

  updateMessages = data => {
    console.log(data);
    console.log(this.props.match.params.matchId);
    const { message } = this.state;
    const { matchId: match_id } = this.props.match.params;
    // const {matchId: match_id} = this.props
    // axios.get(`/api/message/:${match_id}`).then(res => {
    //     this.setState({
    //         messages:res.data
    //     })
    // })
    this.setState({
      messages: [
        ...this.state.messages,
        { message: data.message, username: data.username }
      ]
    });
    axios.post(`/api/messages/${match_id}`, { message }).then(res => {
      console.log(res);
    });
  };

  // submit = () => {
  //   const { message } = this.state;
  //   const { matchId:match_id } = this.props.match.params;
  //   axios.post(`/api/messages/14`, { message }).then(res => {
  //       console.log(res)
  //     this.getMessage();
  //   });
  //   // this.setProfiles()
  // };

  render() {
    console.log("this.props", this.props);
    console.log(this.state.messages);
    const messages = this.state.messages.map(message => (
      <div
        key={message.message_id}
        className={
          message.username === this.state.username ? "my-message" : "message"
        }
      >
        {/* <h5>{message.username}</h5> */}
        <p>{message.message}</p>
      </div>
    ));
    return (
      <div>
        <h1>Message</h1>
        {messages}
        <>
          {/* <h2 className="welcome-message">Welcome, {this.props.reduxState.firstName}</h2> */}
          <input
            type="text"
            name="message"
            placeholder="Type Message Here"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <div className="buttons">
            <button onClick={this.blast}>Blast</button>
          </div>
        </>
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(Message);
