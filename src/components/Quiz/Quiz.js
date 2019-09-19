import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {setQuestions, setNumCorrect, setUser} from '../../ducks/reducer'
import './Quiz.css'
import * as d3 from 'd3'

class Quiz extends Component {
    state = {
        finishedQuiz: false,
        text: {
            recipient: '4356100129',
            textmessage: 'match'    
        },
        topicName: ''
    }

    componentDidMount() {
        this.onLoadAnimation()
        this.setState({finishedQuiz: (this.props.match.params.finishedQuiz === 'true')})
        axios.get(`/api/quizzes/questions/${this.props.swipedUserId}`).then(res => {
            this.props.setQuestions(res.data)
        })
        axios.get(`/api/quizzes/topics/${this.props.swipedUserId}`).then(res => {
            this.setState({topicName: res.data})
        })
    }

    onLoadAnimation() {
        let box = d3.select('.quiz-content')

        box.style('margin-right', '100%')
        .transition()
        .duration(1000)
        .style('margin-right', '0%')
    }

    animatePageUnLoad() {
        let box = d3.select('.quiz-content')
        box.style('margin-left', '0%')
        .transition()
        .duration(1000)
        .style('margin-left', '500%')
    }

    handleStartQuiz() {
        this.props.setNumCorrect(0)
        this.animatePageUnLoad()
        setTimeout(() => this.props.history.push('/question/0'), 1000)
    }

    sendText = () => {
        const { text } = this.state 
        //pass textmessage GET variables via query string
        axios.get(`/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`)
    }
    
    handleFinishQuiz() {
        if (this.props.numberCorrect >= 3) {
            axios.put(`/api/users/matches/${this.props.swipedUserId}`)
            this.sendText()
        }
        this.props.setUser({swipedUserId: null})
        this.props.history.push('/home')
    }

    render() {
        let numCorr = this.props.numberCorrect
        return(
            <div className='quiz-main-content'>
                <div className='quiz-content'>
                    {this.state.finishedQuiz ?
                        <div>
                            <div>
                                {numCorr >= 3 ? <div className='winScreen'>
                                    <h1>
                                        Success!
                                    </h1>
                                    <h2>
                                        You successfully answered enough questions!
                                    </h2>
                                </div>
                                : <div className='loseScreen'>
                                    <h1>
                                        Failure!
                                    </h1>
                                    <h2>
                                        You did not answer enough questions. Sorry.
                                    </h2>
                                    <h1>
                                        {':('}
                                    </h1>
                                </div>
                                }
                            </div>
                            <button id='quiz-stop' onClick={() => this.handleFinishQuiz()}>{'>>> Continue >>>'}</button>
                        </div>
                        : <div>
                            <h1>
                                Start Quiz
                            </h1>
                            <h2>
                                Topic: {this.state.topicName}
                            </h2>
                            <button id='quiz-start' onClick={() => this.handleStartQuiz()}>{'>>> Start <<<'}</button>
                            <button id='quiz-start' onClick={() => this.props.history.push('/home')}>{'<<< Back to Home'}</button>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    const {numberCorrect, swipedUserId} = reduxState
    return {numberCorrect, swipedUserId}
}

export default connect(mapStateToProps, {setQuestions, setNumCorrect, setUser})(withRouter(Quiz))