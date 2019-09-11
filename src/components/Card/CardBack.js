import React, { Component } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
export class CardBack extends Component {

    state = {
        potentialMatches: []
    }

    componentDidMount() {
        this.getMatches();
      }
    
      getMatches = () => {
        try {
          axios.get("/api/users/cards").then(res => {
            // console.log(res)
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
        console.log(this.props.match);
        let matches = potentialMatches.map(el => {
          return (
            <div key={el.user_id}>
              <h1>{el.bio}</h1>
              <h1>{el.first_name} <span>{el.last_name}</span></h1>
              <h1>{el.age}</h1>
            </div>
          );
        });
        return (
            <div>
                <h1>CardBack</h1>
                {matches}
            </div>
        )
    }
}

export default withRouter(CardBack)
