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
        // console.log('props', this.props.reduxState)
        const { matches } = this.state
        const { bio, profilePic, firstName, lastName } = this.props.reduxState
        const allMatches = matches.map(elm => {
            return(
                <div className="matches" key={elm.user_id}>
                    <h6 className='first-name'>{elm.first_name} <span className='last' >{elm.last_name}</span></h6>
                    <p>{elm.user_age}</p>
                    <img className='match-img' src={elm.profile_pic} alt="Match Profile snapshot"/>
                </div>
            )
        })
        return (
            <div className='all'>
                <h1 className='first-name'>{firstName} <span className='last'>{lastName}</span></h1>
                <button className="nav-btn">Settings</button>
                    <div >
                        <img className="profile-img" src={profilePic} alt="your snapshot"/>
                    </div>
                <div className="info">
                    <textarea className="update-bio" cols="30" rows="10"></textarea>
                    <br/>
                    <button className="btn-edit">Edit</button>
                </div>
                <div >
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
