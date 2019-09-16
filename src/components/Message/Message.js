import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import styled from "styled-components";
import './Message.scss'
export class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: "",
      username: "socket FT",
      usernameSet: false,
      userTyping: false,
      room: "hiya"
    };
    this.socket = io.connect(process.env.REACT_APP_PORT);
    this.socket.on("global response", data => this.updateMessages(data));
    this.socket.on("room response", data => this.updateMessages(data));
  }

  componentDidMount = () => {
    this.socket.emit("join chat", { room: this.state.room });
    this.getMessages();
  };

  getMessages = () => {
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
        firstName: this.props.reduxState.firstName,
        profilePic: this.props.reduxState.profilePic,
        room: this.state.room
      }
    );
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  // getMessage = () => {
  //   this.socket.emit("FromAPI", data => {
  //     console.log(data);
  //     this.setState({
  //       messages: data
  //     });
  //   });
  // };

  updateMessages = data => {
    console.log(data);
    // console.log(this.props.match.params.matchId);
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
        {
          message: data.message,
          firstName: data.firstName,
          profilePic: data.profilePic
        }
      ]
    });
    axios.post(`/api/messages/${match_id}`, { message }).then(res => {
      console.log(res);
      this.setState({
        message: ""
      });
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
    console.log("this.props", this.props.reduxState);
    // console.log(this.state.messages);
    const messages = this.state.messages.map((message, i) => (
      <MsgCont key={i}>
        <Info>
          <h5>{message.firstName}</h5>
          <img className="match-img" src={message.profilePic} alt="user" />
        </Info>
        <p
          className={
            message.firstName === this.props.reduxState.firstName ? "my-message" : "message"
          }
        >
          {message.message}
        </p>
      </MsgCont>
    ));
    return (
      <div>
        <h1>Messsage site</h1>
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
            <button onClick={this.blast}>Submit</button>
          </div>
        </>
      </div>
    );
  }
}

const MsgCont = styled.div`
  border: 1px solid red;
  display: flex;
  justify-content: space-between;
`;
const Msg = styled.div`
  background: red;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  font-size: 1.2rem;
  line-height: 1.3;
  margin: 0 auto 40px;
  max-width: 400px;
  padding: 15px;
  position: relative;
`;

const Info = styled.div`
  /* border: 1px solid green; */
`;

function mapStateToProps(reduxState) {
  return {
    reduxState
  };
}

export default connect(
  mapStateToProps,
  {}
)(Message);
