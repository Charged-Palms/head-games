import React, { Component } from "react";
import axios from "axios";
import { Card, CardWrapper } from "react-swipeable-cards";
import { connect } from "react-redux";
import { setUser } from "../../ducks/reducer";
import ReactModal from "react-modal";
import "./Home.css";

ReactModal.setAppElement("#root");

class Home extends Component {
  state = {
    showModal: false,
    potentialMatches: [],
    swipedRightArr: [],
    swipedLeftArr: [],
    filteredMatches: []
  };

  componentDidMount() {
    this.getMatches();
  }

  // filterMatches = () => {
  //   const { potentialMatches, swipedRightArr, swipedLeftArr } = this.state
  //   let tempArr = potentialMatches.filter(function(el) {

  //   })
  // }

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

  //Potenials that are swiped either way can be console logged for debugging
  onSwipe(data) {
    console.log(data);
  }

  //Potenials that are swiped left on are stored in the swipedLeftArr Array
  onSwipeLeft(data) {
    this.setState({
      swipedLeftArr: [...this.state.swipedLeftArr, data],
      showModal: false
    });
  }

  //Potenials that are swiped right on are stored in the swipedRightArr Array
  async onSwipeRight(data) {
    this.setState({
      swipedRightArr: [...this.state.swipedRightArr, data],
      showModal: false
    });
    await this.props.setUser({ swipedUserId: data.user_id });
    this.props.history.push("/quiz/false");
  }

  //Implement pop up profile here, onDoubleTap is unique to each card, data variable contains all info from user's db row
  onDoubleTap(data) {
    // this.setState(prevState => ({ showModal: !prevState.showModal }));
    this.setState({ showModal: !this.state.showModal });
  }

  //Mapped over this.state.potentialMatches, each element is turned into a card. Function is called in the render method.
  renderCards() {
    const { potentialMatches: cards } = this.state;
    return cards.map(c => {
      const cardStyleFront = {
        width: "75%",
        height: "75%",
        marginTop: "5%",
        backgroundImage: `url(${c.profile_pic})`,
        backgroundSize: "auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      };
      return (
        <Card
          key={c.user_id}
          onSwipe={this.onSwipe.bind(this)}
          onSwipeLeft={this.onSwipeLeft.bind(this)}
          onSwipeRight={this.onSwipeRight.bind(this)}
          onDoubleTap={this.onDoubleTap.bind(this)}
          data={c}
          style={cardStyleFront}
          className={`card-front ${c.user_id}`}
        >
          <div className="card-bottom">
            <h2>{c.first_name}</h2>
          </div>
          {/* <ReactModal
            isOpen={this.state.showModal}
            closeTimeoutMS={500}
            onRequestClose={this.handleCloseModal.bind(this)}
          >
            <div className="match-profile" style={{ zIndex: 100 }}>
              <button
                className="X-btn"
                onClick={this.handleCloseModal.bind(this)}
              >
                X
              </button>
              <div className="match-details">
                <span className="first-name">{c.first_name}</span>{" "}
                <span className="last">{c.last_name}</span>
                <hr />
                <span>{c.status}</span>
                <p className="match-profile-bio">{c.bio}</p>
              </div>
            </div>
          </ReactModal> */}
        </Card>
      );
    });
  }

  handleCloseModal() {
    this.setState({
      showModal: false
    });
  }

  render() {
    // console.log("state", this.state);
    // const wrapperStyle = { backgroundColor: "#333" };
    return (
      <div className="home-main-container">
        <div className="profile-button">
          <img
            src={this.props.profilePic}
            alt="ProfileButton"
            onClick={() => this.props.history.push("/profile")}
          />
        </div>
        <CardWrapper
          // Save below for later, if we implement an EndCard
          // addEndCard={this.getEndCard}
          // style={wrapperStyle}
        >
          {this.renderCards()}
        </CardWrapper>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  const { profilePic } = reduxState;
  return { profilePic };
}

export default connect(
  mapStateToProps,
  { setUser }
)(Home);
