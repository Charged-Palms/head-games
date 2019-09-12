import React, { Component } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

//I need matchee's topic_id, matchee_id, question_time, and num_correct in props
// Later maybe access a quiz api?

class Quiz extends Component {
    state = {
        quiz: [],
        questionIndex: 0,
        numCorrect: -1,
        requiredAmount: 3
    }

    componentDidMount() {
        //axios.get(`/api/quizzes/questions/${this.props.topic_id}`).then(res => {
        axios.get('/api/quizzes/questions/topics').then(res => {
            this.setState({quiz: res.data, numCorrect: 0})
            // this.setState({quiz: res.data, numCorrect: 0, requiredAmount: this.props.num_correct})
        })
    }

    handleResponse = (id1, id2) => {
        if (id1 === id2) {
            this.setState({numCorrect: this.state.numCorrect + 1})
        }
        if (this.state.questionIndex < this.state.quiz.length) {
            this.setState({questionIndex: this.state.questionIndex + 1})
        }
    }

    handleContinue() {
        if (this.state.numCorrect >= this.state.requiredAmount) {
            //axios.put(`/api/users/matches/${this.props.user_id}`).then(res => {
            //this.props.history.push(go to messaging? go back to home)
            //})
            this.props.history.push('/home')
        } else {
            this.props.history.push('/home')
        }
    }

    render() {
        let {quiz, questionIndex} = this.state
        let answer = quiz.map((ele) => {
            return <button key={ele.question_id} onClick={() => this.handleResponse(ele.question_id, quiz[questionIndex].question_id)}>
                {ele.answer}
            </button>
        })
        return (
            <div>
                <h1>Quiz</h1>
                {quiz.length !== 0 && questionIndex < quiz.length ? 
                    <div>
                        <h2>
                            {quiz[questionIndex].question}
                        </h2>
                        <div>
                            {answer}
                        </div>
                    </div>
                : questionIndex === quiz.length && this.state.numCorrect !== -1 ? 
                    <div>
                        <div>
                            Thank you for completing this quiz!
                            {this.state.numCorrect >= this.state.requiredAmount ? <div>
                                You have answered enough questions correctly!
                            </div> : <div>
                                <div>
                                    You did not answer the required amount of questions correctly.
                                </div>
                                <h2>
                                    Sorry.
                                </h2>
                                <h1>
                                    {':('}
                                </h1>
                            </div>}
                        </div>
                        <div>
                            <button onClick={() => this.handleContinue()}>Continue</button>
                        </div>
                    </div>
            : <div>Loading certain doom...</div>}
            </div>
        )
    }
}

export default withRouter(Quiz)