import React, { Component } from 'react'
import './Profile.scss'
import { connect } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'
import { updateBio, logoutUser } from '../../ducks/reducer'
import { Link } from 'react-router-dom'

class Profile extends Component {
    state ={
        bioEdit: true,
        statusEdit: false,
        matches: [],
        userBio: ''
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
    handleEdit = () => {
        const { bio } = this.props.reduxState
        Swal.fire({
            input: 'textarea',
            titleText: 'What New in your Life?',
            inputOptions: 'This is in the alert',
            //value that is assigned to the input by defalut, coming from reduxState
            inputValue: bio,
            // text: 'Update your BIO Here',
            inputAttributes: {'aria-label': 'Type your message here'},
            inputDefaultValue: 'hi',
            showCancelButton: true,

        }).then(res => {
            //taking res.value off of sweetalert and assigning it to userBio on State.
            console.log(res.value)
            const { value } = res
            this.props.updateBio({
                bio: value
            })
            //updating our table with new bio info.
            axios.put('/api/users/bio', {bio: value})
        })
    }
    logout = async () => {
        let res = await axios.delete('/auth/logout');
        console.log(res);
        this.props.logoutUser();
        this.props.history.push('/');
    }
    render() {
        console.log('props', this.props)
        const { matches } = this.state
        const { bio, profilePic, firstName, lastName } = this.props.reduxState
        const allMatches = matches.map(elm => {
            return(
                <div className="matches" key={elm.user_id}>
                    <span className='first-name'>{elm.first_name} <span className='last' >{elm.last_name}</span></span>
                    <p classname='match-age'>Age, {elm.user_age}</p>
                    <img className='match-img' src={elm.profile_pic} alt="Match Profile snapshot"/>
                </div>
            )
        })
        return (
            <div className='all'>
                <h1 className='first-name'>{firstName} <span className='last'>{lastName}</span></h1>
                <Link to='/usersettings' ><button className="nav-btn">Settings</button></Link>
                <button onClick={this.logout} className="logout-btn">Logout</button>
                    <div >
                        <img className="profile-img" src={profilePic} alt="your snapshot"/>
                    </div>
                <div className="info">
                    <p>{bio}</p>
                    <br/>
                    <button onClick={this.handleEdit} className="btn-edit">Edit</button>
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
export default connect(mapStateToProps,{updateBio, logoutUser})(Profile)
