import React, { Component } from "react";
import CardFront from "../Card/CardFront";
import CardBack from "../Card/CardBack";
import { Card, CardWrapper } from 'react-swipeable-cards';
export class Home extends Component {
  state = {
    flip: true
  };

  flipCard = () => {
    this.setState({
      flip: !this.state.flip
    });
  };

  render() {
    const { flip } = this.state;
    return (
      <div>
        <h1>Home</h1>
        <CardWrapper>
          <Card>
            Hi
          </Card>
        </CardWrapper>
        {/* {flip ? (
          <div onMouseEnter={this.flipCard} onClick={this.flipCard}>
            {" "}
            <CardFront />{" "}
          </div>
        ) : (
          <div onClick={this.flipCard}>
            {" "}
            <CardBack />{" "}
          </div>
        )} */}
      </div>
    );
  }
}

export default Home;
