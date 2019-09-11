import React, { Component } from "react";
import CardFront from "../Card/CardFront";
import CardBack from "../Card/CardBack";
import { Card, CardWrapper } from "react-swipeable-cards";
import axios from "axios";

class MyEndCard extends Component {
  render() {
    return <div>You Finished Swiping!</div>;
  }
}
export class Home extends Component {
  state = {
    flip: true,
    potentialMatches: []
  };

  componentDidMount() {
    this.getMatches();
  }

  getEndCard() {
    return <MyEndCard />
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

  flipCard = () => {
    this.setState({
      flip: !this.state.flip
    });
  };

  onSwipe(data) {
    console.log(data);
  }

  renderCards() {
    const { potentialMatches: cards } = this.state;
    return cards.map(c => {
      return (
        <Card key={c.user_id} onSwipe={this.onSwipe.bind(this)} data={c}>
          <img src={c.profile_pic} alt="profilePic" />
        </Card>
      );
    });
  }

  render() {
    const { flip } = this.state;
    return (
      <div>
        <h1>Home</h1>
        <CardWrapper addEndCard={this.getEndCard}>
          {this.renderCards()}
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
