import React, { Component } from "react";

export class Register extends Component {
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
    displayAboutYou: false
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleContinue() {
    this.setState({ displayAboutYou: !this.state.displayAboutYou });
  }

  render() {
    return (
      <div className="menu">
        <h1>Register</h1>
        <form onSubmit={e => e.preventDefault()} className="list">
          <input
            type="text"
            placeholder="Profile Picture"
            onChange={e => this.handleChange(e)}
            className="list-item"
          />
          <input
            type="text"
            placeholder="First Name"
            onChange={e => this.handleChange(e)}
            className="list-item"
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={e => this.handleChange(e)}
            className="list-item"
          />
          <input
            type="text"
            placeholder="Email Address"
            onChange={e => this.handleChange(e)}
            className="list-item"
          />
          <input
            type="text"
            placeholder="Password"
            onChange={e => this.handleChange(e)}
            className="list-item"
          />
          <button className="list-item">Continue</button>
        </form>
      </div>
    );
  }
}

export default Register;
