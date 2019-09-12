import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Message extends Component {
    state = {

    }
    render() {
        console.log("this.props", this.props)
        return (
            <div>
                <h1>Message</h1>
            </div>
        )
    }
}

export default connect(null,{})(Message)
