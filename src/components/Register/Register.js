import React, { Component } from "react";
import AboutYou from "./AboutYou";
import { setUser } from "../../ducks/reducer";
import { connect } from "react-redux";

export class Register extends Component {
  state = {
    profilePic: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    displayAboutYou: false
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleContinue = () => {
    const { profilePic, firstName, lastName, email, password } = this.state;
    this.setState({ displayAboutYou: !this.state.displayAboutYou });
    this.props.setUser({ profilePic, firstName, lastName, email, password });
  };

  render() {
    return (
      <div className="menu">
        <form onSubmit={e => e.preventDefault()} className="list">
          {/* <input
            type="file"
            name="profilePic"
            className="list-item"
            id="profilePicId"
            accept="image/*"
            style={{width:"70%"}}
          /> */}
          <input
            type="text"
            placeholder="Profile Picture"
            onChange={e => this.handleChange(e)}
            className="list-item"
            name="profilePic"
            id="profilePic"
          />
          <input
            type="text"
            placeholder="First Name"
            onChange={e => this.handleChange(e)}
            className="list-item"
            name="firstName"
            id="firstName"
          />
          <input
            type="text"
            placeholder="Last Name"
            onChange={e => this.handleChange(e)}
            className="list-item"
            name="lastName"
            id="lastName"
          />
          <input
            type="email"
            placeholder="Email Address"
            onChange={e => this.handleChange(e)}
            className="list-item"
            name="email"
            id="email"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => this.handleChange(e)}
            className="list-item"
            name="password"
            id="password"
          />
          <button className="list-item" onClick={this.handleContinue}>
            Continue
          </button>
        </form>
        {this.state.displayAboutYou ? <AboutYou /> : null}
      </div>
    );
  }
}

export default connect(
  null,
  { setUser }
)(Register);
