import React, { Component } from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import axios from "axios";
import styled from "styled-components";
import "./Message.scss";
import { Link } from "react-router-dom";
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
    // this.getMessages();
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
    // console.log(data);
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
    // axios.post(`/api/messages/${match_id}`, { message }).then(res => {
    //   console.log(res);
    // });
    this.setState({
      message: ""
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
    // console.log("this.props", this.props.reduxState);
    // console.log(this.state.messages);
    const messages = this.state.messages.map((message, i) => (
      <div
        className={
          message.firstName === this.props.reduxState.firstName
            ? "user"
            : "non-user"
        }
        key={i}
      >
        <Info>
          <h5
            className={
              message.firstName === this.props.reduxState.firstName
                ? "my-name"
                : "name"
            }
          >
            {message.firstName}
          </h5>
          <img
            className={
              message.firstName === this.props.reduxState.firstName
                ? "my-img"
                : "img"
            }
            src={message.profilePic}
            alt="user"
          />
        </Info>
        <p
          className={
            message.firstName === this.props.reduxState.firstName
              ? "my-message"
              : "message"
          }
        >
          {message.message}
        </p>
      </div>
    ));
    return (
      <div className="message-wrappa">
        <Link to="/profile">
          <Img src={this.props.reduxState.profilePic} alt="profilespic" />
        </Link>
        {/* <Link to="/home">
          <button>Home</button>
        </Link> */}
        {messages}
        <Form>
          {/* <h2 className="welcome-message">Welcome, {this.props.reduxState.firstName}</h2> */}
          <Input
            type="text"
            name="message"
            placeholder="Type Message Here"
            value={this.state.message}
            onChange={this.handleChange}
          />

          <Button onClick={this.blast}>&#11014;</Button>
        </Form>
      </div>
    );
  }
}
const Form = styled.div`
  -webkit-border-radius: 4px;
  border-radius: 4px;
  font-size: 1.2rem;
  line-height: 1.3;
  margin: 0 auto 40px;
  max-width: 400px;
  padding: 15px;
  position: fixed;
  display: flex;
  justify-content: center;
  top:90vh;
  left:25vw;
`;

const Input = styled.input`
  padding: 10px 15px;
  box-sizing: border-box;
  background-color: #fafafa;
  border-radius: 6vw;
  border: none;
  box-shadow: inset 0 0 5px 1px;
  :focus {
    border: 2px solid #151515;
    box-shadow: inset 0 0 5px 1px;
  }
`;
const Button = styled.button`
  padding: 10px 15px;
  box-sizing: border-box;
  border-radius: 6px;
  border: none;
  background-color: rgba(25, 25, 25);
  color: #fafafa;
  transition: 0.5s;
  cursor: pointer;
`;
const Info = styled.div`
  color: white;
`;

const Img = styled.img`
  height: 100px;
  width: 100px;
  overflow: hidden;
  border-radius: 50%;
  box-shadow: -11px 11px 21px 3px rgba(0, 0, 0, 0.75);
  border: 2px solid #fafafa;
  position:relative;
  top:1vh;
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

export function getSum(arg1, arg2) {
  return arg1 + arg2;
}
