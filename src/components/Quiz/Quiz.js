import React, { Component } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import * as d3 from 'd3'
import './Quiz.css'

//I need matchee_id in props
// Later maybe access a quiz api?
// Styling using d3?

class Quiz extends Component {
    constructor() {
        super()

        this.state = {
            quiz: [],
            questionIndex: 0,
            numCorrect: -1,
            requiredAmount: 3
            // ,
            // topic_id: null
        }

        this.handleResponse = this.handleResponse.bind(this)
    }

    componentDidMount() {
        //Gets topic id
        // axios.get(`/api/users/${matchee_id}`).then(res => {
            // this.setState({topic_id: res.data.topic_id})
        // })
        //Gets quiz questions
        //axios.get(`/api/quizzes/questions/${this.state.topic_id}`).then(res => {
        axios.get('/api/quizzes/questions/topics').then(res => {
            this.setState({quiz: res.data, numCorrect: 0})
            // this.setState({quiz: res.data, numCorrect: 0, requiredAmount: this.props.num_correct})
        })

        this.animateArcTimer()
        // this.innerTimer()
    }

    handleResponse = (id1, id2) => {
        if (id1 === id2) {
            this.setState({numCorrect: this.state.numCorrect + 1})
        }
        if (this.state.questionIndex < this.state.quiz.length) {
            this.setState({questionIndex: this.state.questionIndex + 1})
        }
        if (this.state.questionIndex === this.state.quiz.length) {

            this.animateArcTimer()
        }
    }

    handleContinue() {
        if (this.state.numCorrect >= this.state.requiredAmount) {
            //Goes to messaging
            //axios.put(`/api/users/matches/${this.props.user_id}`).then(res => {
            //this.props.history.push(go to messaging? go back to home)
            //})
            // Goes to home for now: once I can get matchee_id as props, then I can go to messaging
            this.props.history.push('/home')
        } else {
            this.props.history.push('/home')
        }
    }

    animateArcTimer() {
        var arc = d3.arc()
        .innerRadius(25)
        .outerRadius(30)
        .startAngle(0)

        var arc2 = d3.arc()
        .innerRadius(0)
        .outerRadius(35)
        .startAngle(0)

        var svg = d3.select('#timer_arc'),
        width = 200,
        height = 150,
        g = svg.append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

        var background = g.append('path')
        .datum({endAngle: 2 * Math.PI})
        .style('fill', 'gray')
        .attr('d', arc2)

        var foreground = g.append('path')
        .datum({endAngle: 2 * Math.PI})
        .style('fill', 'white')
        .attr('d', arc)

        function changeCircle() {
            foreground
            .attr('d', arcTween(2 * Math.PI))
            .transition()
            .duration(5000)
            .attrTween('d', arcTween(0), 1500)
            // .on('end', handleResponse)
            // .style('fill', 'red')
        }

        function arcTween(newAngle) {
            return function(d) {
                var interpolate = d3.interpolate(d.endAngle, newAngle)
                return function(t) {
                    d.endAngle = interpolate(t)
                    return arc(d)
                }
            }
        }

        changeCircle()
    }

    innerTimer() {
        setInterval(function(){
            console.log('hi')
            this.handleResponse()
        }, 5000)
    }

    render() {
        let {quiz, questionIndex} = this.state
        let answer = quiz.map((ele) => {
            return <button key={ele.question_id} onClick={() => this.handleResponse(ele.question_id, quiz[questionIndex].question_id)}>
                {ele.answer}
            </button>
        })
        return (
            <div className='quiz-main-content'>
                <div id='arc_box'>
                            <svg id='timer_arc'></svg>
                        </div>
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