import React, { Component } from 'react'
import { connect } from 'react-redux'
import io from "socket.io-client"
import axios from 'axios'


export class Message extends Component {
    state = {
        message:'',
        user:[],
        match:[],
        messages:[],
        port:''
    }
    socket = io.connect(':5555')

    setProfiles = () => {
        const endpoint = this.state;
        // const socket = socketIOClient(endpoint);
        this.socket.emit("FromAPI", data => {
          console.log(data);
          this.setState({
            messages: data
          });
        });
      };
    

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };

      submit = () => {
        const {message} = this.state
        axios.post('/api/messages/14', {message}).then(res => {
        //   console.log(res)
          this.setProfiles()
        })
        // this.setProfiles()
      }


    render() {
        console.log("this.props", this.props)
        const {matchId} = this.props.match.params
        return (
            <div>
                <h1>Message</h1>
            </div>
        )
    }
}

export default connect(null,{})(Message)
