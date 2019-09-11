import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import CardBackInfo from "./CardBackInfo";
export class CardBack extends Component {
  state = {
    potentialMatches: null,
    currentIndex: 0
  };

  componentDidMount() {
    this.getMatches();
  }

  getMatches = () => {
    try {
      setTimeout(() => {
        
        axios.get("/api/users/cards").then(res => {
          // console.log(res)
          this.setState({
            potentialMatches: res.data
          });
        });
      }, 150);
    } catch (err) {
      console.log(err);
    }
  };


  render() {
    const { potentialMatches, currentIndex } = this.state;
    return (
      <div>
        {this.state.potentialMatches ? (
          <CardBackInfo
            potentialMatches={potentialMatches}
            currentIndex={currentIndex}
          />
        ) : (
          <h1>Card Back Currently Loading...</h1>
        )}
      </div>
    );
  }
}

export default withRouter(CardBack);
