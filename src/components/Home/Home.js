import React, { Component } from "react";
import CardFront from "../Card/CardFront";
import CardBack from "../Card/CardBack";
import { Card, CardWrapper } from "react-swipeable-cards";
import axios from "axios";
import ReactCardFlip from "react-card-flip";

class MyEndCard extends Component {
  render() {
    return <div>You Finished Swiping!</div>;
  }
}
export class Home extends Component {
  state = {
    isFlipped: false,
    potentialMatches: [],
    swipedRightArr: [],
    swipedLeftArr: []
  };

  componentDidMount() {
    this.getMatches();
  }

  getEndCard() {
    return <MyEndCard />;
  }

  getMatches = async () => {
    try {
      await axios.get("/api/users/cards").then(res => {
        this.setState({
          potentialMatches: res.data
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  flipCard = () => {
    this.setState({ flip: !this.state.flip });
  };

  onSwipe(data) {
    console.log(data);
  }

  onSwipeLeft(data) {
    this.setState({
      swipedLeftArr: [...this.state.swipedLeftArr, data],
      isFlipped: false
    });
  }

  onSwipeRight(data) {
    this.setState({
      swipedRightArr: [...this.state.swipedRightArr, data],
      isFlipped: false
    });
  }

  onDoubleTap(data) {
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  renderCards() {
    const { potentialMatches: cards } = this.state;
    return cards.map(c => {
      const cardStyleFront = {
        backgroundImage: `url(${c.profile_pic})`
      };

      return (
        <Card
          key={c.user_id}
          onSwipe={this.onSwipe.bind(this)}
          onSwipeLeft={this.onSwipeLeft.bind(this)}
          onSwipeRight={this.onSwipeRight.bind(this)}
          onDoubleTap={this.onDoubleTap.bind(this)}
          data={c}
          // style={cardStyleFront}
          className={`card-front ${c.user_id}`}
        >
          <ReactCardFlip
            isFlipped={this.state.isFlipped}
            flipDirection="horizontal"
          >
            <div key="front">
              <img src={c.profile_pic} alt="profilePic" />
            </div>
            <div key="back" style={{ background: "aquamarine" }}>
              <h2>{c.first_name}</h2>
              <h2>{c.last_name}</h2>
              <h5>{c.user_age}</h5>
              <h5>{c.zipcode}</h5>
              <h6>{c.status}</h6>
              <h6>{c.bio}</h6>
            </div>
          </ReactCardFlip>
        </Card>
        // <Card
        //   key={c.user_id}
        //   onSwipe={this.onSwipe.bind(this)}
        //   onSwipeLeft={this.onSwipeLeft.bind(this)}
        //   onSwipeRight={this.onSwipeRight.bind(this)}
        //   onDoubleTap={this.onDoubleTap.bind(this)}
        //   data={c}
        //   style={cardStyleFront}
        //   className={`card-front ${c.user_id}`}
        // >
        //   {" "}
        // </Card>
      );
    });
  }

  render() {
    console.log("state", this.state);
    const wrapperStyle = { backgroundColor: "#333" };
    return (
      <div>
        <h1>Home</h1>
        <CardWrapper addEndCard={this.getEndCard} style={wrapperStyle}>
          {this.renderCards()}
        </CardWrapper>
      </div>
    );
  }
}

export default Home;
