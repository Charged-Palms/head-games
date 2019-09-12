import React, { Component } from 'react'
import axios from 'axios'

export class Quiz extends Component {
    state = {
        quiz: []
    }

    componentDidMount() {
        axios.get('/api/quizzes/questions/topics').then(res => {
            this.setState({quiz: res.data})
        })
    }

    handleResponse(id) {
        console.log(id)
    }

    render() {
        console.log(this.state)
        let answers = this.state.quiz.map((ele) => {
            return <button key={ele.question_id} onClick={() => this.handleResponse(ele.question_id)}>
                {ele.answer}
            </button>
        })
        let quiz = this.state.quiz.map((ele) => {
            return <div key={ele.question_id}>
                <div>
                    {ele.question}
                </div>
                <div>
                    {answers}
                </div>
            </div>
        })
        return (
            <div>
            <h1>Quiz</h1>
                {quiz}
            </div>
        )
    }
}

export default Quiz
