import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";
import { withRouter } from "react-router-dom";

class SelectInterests extends Component {
  state = {
    topicId: null,
    topicArr: [],
    questionArr: []
  };

  componentDidMount() {
    try {
      axios.get("/api/quizzes/topics").then(res => {
        this.setState({ topicArr: [...res.data] });
      });
    } catch {
      alert("Error getting Quiz Topics");
    }
    try {
      axios.get("/api/quizzes/questions").then(res => {
        this.setState({ questionArr: [...res.data] });
      });
    } catch {
      alert("Error getting Quiz Questions");
    }
  }

  register = () => {
    const {
      profilePic: profile_pic,
      firstName: first_name,
      lastName: last_name,
      age: user_age,
      email,
      password: hash,
      gender,
      zipcode,
      bio,
      status
    } = this.props;
    const { topicId: topic_id } = this.state;
    try {
      axios.post("/auth/register", {
        profile_pic,
        first_name,
        last_name,
        user_age,
        email,
        hash,
        gender,
        zipcode,
        bio,
        status,
        topic_id
      });
      this.props.setUser({ topicId: topic_id });
      this.props.history.push("/home");
    } catch {
      alert("Register Error");
    }
  };

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="select-interests-container">
        <form
          onSubmit={e => e.preventDefault()}
          className="select-interests-form"
        >
          <h2>Select Topic for Quiz!</h2>
          <select name="topicId" onChange={e => this.handleChange(e)}>
            {this.state.topicArr.map(t => (
              <option key={t.topic_id} value={t.topic_id}>
                {t.topic_name}
              </option>
            ))}
          </select>
          <button type="submit" onClick={this.register}>
            Complete Registration
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const {
    userId,
    profilePic,
    email,
    firstName,
    lastName,
    password,
    gender,
    age,
    zipcode,
    bio,
    status
  } = reduxState;
  return {
    userId,
    profilePic,
    email,
    firstName,
    lastName,
    password,
    gender,
    age,
    zipcode,
    bio,
    status
  };
}

export default connect(
  mapStateToProps,
  { setUser }
)(withRouter(SelectInterests));
