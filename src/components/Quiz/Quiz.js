import React, { Component } from 'react'
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import * as d3 from 'd3'
import Timer from 'react-compound-timer'
import './Quiz.css'

//I need matchee_id in props
// Later maybe access a quiz api?
// Styling using d3?
// Put back send text function call

class Quiz extends Component {
    constructor() {
        super()

        this.state = {
            quiz: [],
            questionIndex: 0,
            numCorrect: -1,
            requiredAmount: 3,
            text: {
                recipient: '4356100129',
                textmessage: 'match'
            },
            timeReset: false,
            stopped: false
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

    sendText = () => {
        const { text } = this.state 
        //pass textmessage GET variables via query string
        axios.get(`/send-text?recipient=${text.recipient}&textmessage=${text.textmessage}`)
    }

    handleResponse = (id1, id2) => {
        if (id1 === id2) {
            this.setState({numCorrect: this.state.numCorrect + 1})
        }
        if (this.state.questionIndex < this.state.quiz.length) {
            this.setState({questionIndex: this.state.questionIndex + 1})
        }
        if (this.state.questionIndex !== this.state.quiz.length) {
            this.animateArcTimer()
        }

        if (this.state.numCorrect  >= 1 && this.state.questionIndex === this.state.quiz.length -1) {
                this.handleStop()
            d3.selectAll('path').transition()
            .duration(1)
            .style('fill', 'transparent')
        }
    }

    handleClicked() {
        this.setState({timeReset: true})
    }

    handleStop() {
        this.setState({stopped: true})
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
        .innerRadius(0)
        .outerRadius(40)
        .startAngle(0)

        var arc2 = d3.arc()
        .innerRadius(0)
        .outerRadius(30)
        .startAngle(0)

        var svg = d3.select('#timer_arc'),
        width = 56,
        height = 54,
        g = svg.append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')

        //eslint-disable-next-line
        var background = g.append('path')
        .datum({endAngle: 2 * Math.PI})
        .style('fill', 'transparent')
        .attr('d', arc2)

        var foreground = g.append('path')
        .datum({endAngle: 2 * Math.PI})
        .style('fill', 'white')
        .attr('d', arc)

        function changeCircle() {
            foreground
            .transition()
            // .style('fill', 'green')
            .duration(0)
            .attrTween('d', arcTween(2 * Math.PI), 1500)
            .transition()
            .ease(d3.easeLinear)
            .duration(5000)
            .attrTween('d', arcTween(0), 1500)
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
        let {quiz, questionIndex, timeReset} = this.state
        let answer = quiz.map((ele) => {
            return <button key={ele.question_id} onClick={() => {this.handleResponse(ele.question_id, quiz[questionIndex].question_id); this.handleClicked()}}>
                {ele.answer}
            </button>
        })
        return (
            <div className='quiz-main-content'>
                <Timer
                    initialTime={20000}
                    direction='backward'
                    checkpoints={[
                        {time: 15000,
                        callback: () => {this.handleResponse(1,2)
                        //         if (reset) {
                        //             this.reset()
                        //             this.setState({reset: false})
                                // }
                            }
                        },

                        {time: 10000,
                            callback: () => {this.handleResponse(1,2)
                                // if (reset) {
                                //     this.reset()
                                //     this.setState({reset: false})
                                // }
                            }
                        },

                        {time: 5000,
                            callback: () => {this.handleResponse(1,2)
                                // if (reset) {
                                //     this.reset()
                                //     this.setState({reset: false})
                                // }
                            }
                        },

                        {time: 0,
                            callback: () => {this.handleResponse(1,2)
                                // if (reset) {
                                //     this.reset()
                                //     this.setState({reset: false})
                                // }
                            }
                        }
                    ]}
                >
                    {({start, resume, pause, stop, reset}) => {
                        if (timeReset) {
                            reset()
                            this.setState({timeReset: false})
                        }
                        if (this.state.stopped) {
                            stop()
                        }
                    }}
                </Timer>
                <div id='arc_box'>
                    <svg id='timer_arc'></svg>
                </div>
                {quiz.length !== 0 && questionIndex < quiz.length ? 
                    <div className='quiz-content'>
                        <h2>
                            {quiz[questionIndex].question}
                        </h2>
                        <div className='quiz-answers'>
                            {answer}
                        </div>
                    </div>
                : questionIndex === quiz.length && this.state.numCorrect !== -1 ? 
                    <div className='quiz-content'>
                        <div>
                            <h1>
                                Thank you for completing this quiz!
                            </h1>
                            {this.state.numCorrect >= this.state.requiredAmount ? <h2>
                                You answered enough questions correctly!
                            </h2> : <div>
                                <h2>
                                    You did not answer the required amount of questions correctly.
                                </h2>
                                <h2>
                                    Sorry.
                                </h2>
                                <h1>
                                    {':('}
                                </h1>
                            </div>}
                        </div>
                        <div>
                            <button onClick={() => {this.handleContinue(); this.sendText()}}>Continue</button>
                        </div>
                    </div>
                : <div className='quiz-content'>Preparing Firing Squad...</div>}
            </div>
        )
    }
}

export default withRouter(Quiz)