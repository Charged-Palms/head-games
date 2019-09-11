import React, { Component } from "react";

export class CardBackInfo extends Component {
  render() {
    console.log(this.props.potentialMatches);
    const { potentialMatches, currentIndex } = this.props;
    return (
      <div>
        <div className="matches">
          <h6 className="first-name">
            {potentialMatches[currentIndex].first_name}{" "}
            <span className="last">
              {potentialMatches[currentIndex].last_name}
            </span>
          </h6>
          <p>{potentialMatches[currentIndex].age}</p>
        </div>
        <h1>Bio: {potentialMatches[currentIndex].bio}</h1>
      </div>
    );
  }
}

export default CardBackInfo;
