import React, { Component } from "react";

export class CardFrontInfo extends Component {
  render() {
    console.log(this.props.potentialMatches);
    const { potentialMatches, currentIndex } = this.props;
    return (
      <div>
        <img
          src={potentialMatches[currentIndex].profile_pic}
          alt="potenital match"
        />
      </div>
    );
  }
}

export default CardFrontInfo;
