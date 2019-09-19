import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";
import { withRouter } from "react-router-dom";
import GearTest from "../SettingsButton/GearTest";

export class Login extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: null,
    age: null,
    profilePic: "",
    zipcode: null,
    bio: "",
    status: "",
    topicId: null,
    displayRegister: false,
    hightlightRegister: false
  };

  login = async () => {
    const { email, password } = this.state;
    await axios
      .post("/auth/login", { email, password })
      .then(res => {
        const {
          profile_pic: profilePic,
          user_id: userId,
          first_name: firstName,
          last_name: lastName,
          gender,
          user_age: age,
          zipcode,
          bio,
          status,
          topic_id: topicId
        } = res.data.user; //check after backend part made
        this.props.setUser({
          email,
          profilePic,
          userId,
          firstName,
          lastName,
          gender,
          age,
          zipcode,
          bio,
          status,
          topicId
        });
        this.props.history.push("/home");
      })
      .catch(() => {
        alert("Incorrect Login Info");
      });
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="menu2">
        <div className="login-content-container">
          <div className="gear-container">
            <GearTest />
            <h1 style={{marginLeft:"10%"}}>Head</h1>
            <h1 style={{marginLeft:"20%"}}>Games</h1>
          </div>
          <div className="login-title"></div>
          <form onSubmit={e => e.preventDefault()} className="list2">
            <input
              type="text"
              name="email"
              placeholder="email address"
              onChange={e => this.handleChange(e)}
              className="list-item"
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={e => this.handleChange(e)}
              className="list-item"
            />
            <button className="list-item" onClick={this.login}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { setUser }
)(withRouter(Login));
