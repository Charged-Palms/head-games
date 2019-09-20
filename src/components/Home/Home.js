import React, { Component } from "react";
import axios from "axios";
import { Card, CardWrapper } from "react-swipeable-cards";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";
import "./Home.css";

class Home extends Component {
  state = {
    potentialMatches: [],
    swipedRightArr: [],
    swipedLeftArr: [],
    filteredMatches: []
  };

  async componentDidMount() {
    await this.getMatches();
    if (this.props.filteredMatches.length === 0) {
      this.props.setUser({ filteredMatches: [...this.state.potentialMatches] });
    }
  }

  //Populate the potenialMatches array in state
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

  filterMatches = async () => {
    const { swipedLeftArr, swipedRightArr } = this.state;
    let tempArr = await this.props.filteredMatches.filter(el => {
      return (
        swipedLeftArr.indexOf(el) === -1 && swipedRightArr.indexOf(el) === -1
      );
    });
    this.setState({ filteredMatches: [...tempArr] });
    this.props.setUser({ filteredMatches: [...tempArr] });
  };

  //Potenials that are swiped either way can be console logged for debugging
  // onSwipe(data) {
  //   console.log(data);
  // }

  //Potenials that are swiped left on are stored in the swipedLeftArr Array
  onSwipeLeft(data) {
    this.setState({
      swipedLeftArr: [...this.state.swipedLeftArr, data],
    });
    this.filterMatches();
  }

  //Potenials that are swiped right on are stored in the swipedRightArr Array
  async onSwipeRight(data) {
    this.setState({
      swipedRightArr: [...this.state.swipedRightArr, data],
    });
    await this.props.setUser({ swipedUserId: data.user_id });
    await this.filterMatches();
    this.props.history.push("/quiz/false");
  }

  //Implement pop up profile here, onDoubleTap is unique to each card, data variable contains all info from user's db row
  // onDoubleTap(data) {
  // }

  //Mapped over this.state.potentialMatches, each element is turned into a card. Function is called in the render method.
  renderCards() {
    const { filteredMatches: cards } = this.props;
    return cards.map(c => {
      const cardStyleFront = {
        width: "75%",
        height: "75%",
        marginTop: "5%",
        backgroundImage: `url(${c.profile_pic})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      };
      return (
        <Card
          key={c.user_id}
          // onSwipe={this.onSwipe.bind(this)}
          onSwipeLeft={this.onSwipeLeft.bind(this)}
          onSwipeRight={this.onSwipeRight.bind(this)}
          // onDoubleTap={this.onDoubleTap.bind(this)}
          data={c}
          style={cardStyleFront}
          className={`card-front ${c.user_id}`}
        >
          <div className="card-bottom">
            <h2>{c.first_name}</h2>
          </div>
        </Card>
      );
    });
  }

  render() {
    return (
      <div className="home-main-container">
        <div className="profile-button">
          <img
            src={this.props.profilePic}
            alt="ProfileButton"
            onClick={() => this.props.history.push("/profile")}
          />
        </div>
        <CardWrapper>
          {this.renderCards()}
        </CardWrapper>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { profilePic, filteredMatches } = reduxState;
  return { profilePic, filteredMatches };
}

export default connect(
  mapStateToProps,
  { setUser }
)(Home);
