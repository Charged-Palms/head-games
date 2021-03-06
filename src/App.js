import React from "react";
import "./App.scss";
import routes from "./routes";
import { connect } from "react-redux";
import { setUser } from "./ducks/reducer";
import axios from "axios";
export class App extends React.Component {
  componentDidMount() {
    this.getSession();
  }

  getSession = () => {
    try {
      axios.get("/auth/session").then(res => {
        if (res.data.user) {
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
            topic_id: topicId,
            email
          } = res.data.user;
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
        }
      });
    } catch {
      alert("404 internal server error");
    }
  };

  render() {
    return (
      <div className="App" style={{ backgroundColor: "black" }}>
        {routes}
      </div>
    );
  }
}

export default connect(
  null,
  { setUser }
)(App);
