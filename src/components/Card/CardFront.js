import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import CardFrontInfo from "./CardFrontInfo";

export class CardFront extends Component {
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
          <CardFrontInfo
            potentialMatches={potentialMatches}
            currentIndex={currentIndex}
          />
        ) : (
          <h1>Card Front Currently Loading...</h1>
        )}
      </div>
    );
  }
}

export default withRouter(CardFront);
