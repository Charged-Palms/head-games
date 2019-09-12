import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

export class MatchProfile extends Component {
    render() {
        return (
            <div>
                <h1>MatchProfile</h1>
            </div>
        )
    }
}

export default connect(null,{})(MatchProfile)
