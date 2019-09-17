import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export class UserSettings extends Component {
    render() {
        return (
            <div>
                <h1>UserSettings</h1>
                <Link to='/profile'>
                <button>Profile</button>
                </Link>
                <Link to='/home'>
                <button>Home</button>
                </Link>
                <h3>Your Name</h3>
                <h4>Your Status</h4>
                <h5>Your Bio</h5>
            </div>
        )
    }
}

export default UserSettings
