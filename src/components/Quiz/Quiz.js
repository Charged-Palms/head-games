import React, { Component } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'

class Quiz extends Component {
    state = {
        quiz: [],
        questionIndex: 0,
        numCorrect: -1
    }

    componentDidMount() {
        axios.get('/api/quizzes/questions/topics').then(res => {
            this.setState({quiz: res.data, numCorrect: 0})
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
        if (this.state.numCorrect === this.state.quiz.length) {
            this.props.history.push('/profile')
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
                        <div>
                            {quiz[questionIndex].question}
                        </div>
                        <div>
                            {answer}
                        </div>
                    </div>
                : questionIndex === quiz.length && this.state.numCorrect !== -1 ? 
                    <div>
                        <div>
                            Thank you for completing this quiz!
                            {this.state.numCorrect === quiz.length ? <div>
                                You have answered all the questions correctly!
                            </div> :null}
                        </div>
                        <div>
                            <button onClick={() => this.handleContinue()}>Continue</button>
                        </div>
                    </div>
            :null}
            </div>
        )
    }
}

export default withRouter(Quiz)