import React, { Component } from 'react'
import './Profile.scss'
import { connect } from 'react-redux'
import axios from 'axios'
import Swal from 'sweetalert2'
import { updateBio, logoutUser } from '../../ducks/reducer'
import { Link } from 'react-router-dom'
import ReactModal from 'react-modal'

class Profile extends Component {
    state ={
        bioEdit: true,
        statusEdit: false,
        matches: [],
        userBio: '',
        showModal: false,
        //using matchProfile on state so the modal knows what the index of the user is.
        matchProfile: null,
        matchId: null
    }
    componentDidMount() {
        this.userMatch()
        ReactModal.setAppElement('body')
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
            // console.log(res.value)
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
    //passing in id as a param so when we invoke the method below we know what the id of the user that was clicked.
    handleOpenModal(id) {
        this.setState({
            showModal: true,
            matchProfile: id
        })
    }
    hanldeCloseModal() {
        this.setState({
            showModal: false
        })
    }
    //used async and await so that setState would set matchId state to the id param.
    async messageClick(id){
        // console.log(id)
        await this.setState({
            matchId: id
        })
        this.props.history.push(`/message/${this.state.matchId}`)
    }
    render() {
        console.log(this.state)
        const { matches } = this.state
        const { bio, profilePic, firstName, lastName } = this.props.reduxState
        const allMatches = matches.map((elm, index) => {
            //creating a var that is equal to the index of matchProfile
            let currMatch = matches[this.state.matchProfile]
            // console.log(currMatch)
            return(
                <div className="matches" key={elm.user_id}>
                    <span className='first-name'>{elm.first_name} <span className='last' >{elm.last_name}</span></span>
                    <p className='match-age'>Age, {elm.user_age}</p>
                    <img onClick={() => this.handleOpenModal(index)} className='match-img' src={elm.profile_pic} alt="Match Profile snapshot"/>
                    {/* rendering ReactModal onClick of user profile image, creates popup with user info. */}
                    <ReactModal 
                    isOpen={this.state.showModal}
                    closeTimeoutMS={500}
                    onRequestClose={this.hanldeCloseModal.bind(this)}>
                        <div className='match-profile'>
                            <button className='X-btn' onClick={this.hanldeCloseModal.bind(this)} >X</button>
                            <img className='match-profile-img' src={currMatch && currMatch.profile_pic} alt="match snapshot"/>
                            <div className="match-details">
                                <span className='first-name'>{currMatch && currMatch.first_name} <span className='last' >{currMatch && currMatch.last_name}</span></span>
                                <hr/>
                                <span>{currMatch && currMatch.status}</span>
                                <p className="match-profile-bio">{currMatch && currMatch.bio}</p>
                                <button onClick={() => {this.messageClick(currMatch.match_id)}} className="match-msg">Message</button>
                                <p>{currMatch && currMatch.match_id}</p>
                            </div>
                        </div>
                    </ReactModal>
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
