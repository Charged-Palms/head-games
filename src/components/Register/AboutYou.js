import React, { Component } from "react";
import SelectInterests from "./SelectInterests";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";

class AboutYou extends Component {
  state = {
    gender: null,
    age: null,
    zipcode: null,
    bio: "",
    status: "",
    displaySelectInterests: false
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleContinue = () => {
    let { gender, age, zipcode, bio, status } = this.state;
    gender === "male" ? (gender = true) : (gender = false);
    this.setState({
      displaySelectInterests: !this.state.displaySelectInterests
    });
    this.props.setUser({ gender, age, zipcode, bio, status });
  };

  render() {
    return (
      <div className="about-you-container">
        {/* <div className="about-you-inner-container"> */}
          <form onSubmit={e => e.preventDefault()} className="about-you-form">
          <h1 className="about-you-title">About You</h1>
            <textarea
              className="about-you-form-textarea"
              type="text"
              placeholder="Tell people who you are!"
              name="bio"
              onChange={e => this.handleChange(e)}
            />
            <textarea
              className="about-you-form-textarea"
              type="text"
              placeholder="What are you doing right now?"
              name="status"
              onChange={e => this.handleChange(e)}
            />
            <div className="gender-form">
              <h4>Gender:&nbsp;</h4>
              <select name="gender" onChange={e => this.handleChange(e)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <input
              type="number"
              placeholder="age"
              name="age"
              onChange={e => this.handleChange(e)}
              className="about-you-form-input"
            />
            <input
              type="number"
              placeholder="zipcode"
              name="zipcode"
              onChange={e => this.handleChange(e)}
              className="about-you-form-input"
            />
            <button type="submit" onClick={this.handleContinue}>
              Continue
            </button>
          </form>
        {/* </div> */}
        {this.state.displaySelectInterests ? <SelectInterests /> : null}
      </div>
    );
  }
}

export default connect(
  null,
  { setUser }
)(AboutYou);
