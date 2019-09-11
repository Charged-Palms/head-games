import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
export class CardFront extends Component {
  state = {
    potentialMatches: []
  };

  componentDidMount() {
    this.getMatches();
  }

  getMatches = async () => {
 
    try {
      await axios.get("/api/users/cards").then(res => {
        console.log(res.data[0].user_id);
        this.setState({
          potentialMatches: res.data
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { potentialMatches } = this.state;
    console.log(potentialMatches);
    console.log(this.props);
    let matches = potentialMatches.map(el => {
      return (
        <div key={el.user_id}>
          <Link to={`/cardBack${el.user_id}`}>
            <img src={el.profile_pic} alt="potential match profile" />
            <h1>{el.user_id}</h1>
          </Link>
        </div>
      );
    });
    return (
      <div>
        <h1>CardFront</h1>
        {matches}
      </div>
    );
  }
}

export default withRouter(CardFront);
