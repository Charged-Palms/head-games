import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";
import "./Login.css";

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
      <div>
        <input
          type="text"
          placeholder="email address"
          onChange={e => this.handleChange(e)}
        />
        <input
          type="text"
          placeholder="password"
          onChange={e => this.handleChange(e)}
        />
        <button>Login</button>
      </div>
    );
  }
}

export default connect(
  null,
  { setUser }
)(Login);
