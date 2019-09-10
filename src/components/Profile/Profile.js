import React, { Component } from 'react'
import './Profile.scss'
import { connect } from 'react-redux'
import axios from 'axios'

class Profile extends Component {
    state ={
        bioEdit: false,
        statusEdit: false,
        matches: []
    }
    componentDidMount() {
        this.userMatch()
    }
    userMatch = () => {
        axios.get('/api/matches').then(res => {
            this.setState({
                matches: res.data
            })
        })
    }
    handleChange = (e, key) => {
        this.setState({
            [key]: e.target.value
        })
    }
    render() {
        console.log('props', this.props)
        const { matches } = this.state
        const allMatches = matches.map(elm => {
            return(
                <div>
                    {elm.first_name}
                </div>
            )
        })
        return (
            <div>
                <h1>User Profile</h1>
                <button className="nav-btn">Settings</button>
                <div className="info">
                    <textarea cols="30" rows="10"></textarea>
                    <br/>
                    <button className="btn-edit">Edit</button>
                </div>
                <div className="info">
                    <textarea cols="30" rows="10"></textarea>
                    <br/>
                    <button className="btn-edit">Edit</button>
                </div>
                <div className="matches">
                    {allMatches}
                </div>
            </div>
        )
    }
}
function mapStateToProps(reduxState){
    
    return {
        reduxState
    }
}
export default connect(mapStateToProps)(Profile)
