import React, {Component} from 'react'
import * as d3 from 'd3'
import './Question.css'
import Swal from 'sweetalert2'
import Timer from 'react-compound-timer'

class Question extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questions: props.questions,
            answers: props.answers,
            currentQuestion: props.currentQuestion,
            quizLength: props.quizLength,
            question: '',
            questionsAnswers: [],
            correctAnswer: -1,
            quiz: []
        }
    }

    componentDidMount() {
        this.animateArcTimer()
        this.selectCurrentQuestion(this.state.currentQuestion)
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
            .duration(10000)
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

    selectCurrentQuestion(current) {
        let {questions, answers} = this.state
        let tempArr = []
        let tempQuestionArr = []
        let tempAnswerArr = []
        let questIndex = Math.floor(Math.random() * 4)
        let insertInd = 0
        for (let i = 0; i < 4; i++) {
            let r = Math.floor(Math.random() * questions.length)
            if (tempArr.indexOf(questIndex) === -1) {
                insertInd = Math.floor(Math.random() * 2)
            }
            if (insertInd) {
                tempArr.push(questIndex)
                insertInd = 0
            } else if (tempArr.indexOf(r) === -1) {
                tempArr.push(r)
            } else {
                i--
            }
        }
        for (let i = 0; i < tempArr.length; i++) {
                tempQuestionArr.push(questions[tempArr[i]])
                tempAnswerArr.push(answers[tempArr[i]])
        }
        this.setState({quiz: tempQuestionArr, questionsAnswers: tempAnswerArr, correctAnswer: questIndex})
    }

    handleAnswer(ind) {
        if (ind === this.state.correctAnswer) {
            Swal.fire({
                type: 'success',
                width: '10rem',
                toast: true,
                position: 'top-start',
                timer: 1000,
                showConfirmButton: false
            })
            this.props.numCorrect()
            this.props.nextQuestion()
        } else {
            Swal.fire({
                type: 'error',
                width: '10rem',
                toast: true,
                position: 'top-start',
                timer: 1000,
                showConfirmButton: false
            })
            this.props.nextQuestion()
        }
    }

    render() {
        let answers = this.state.questionsAnswers.map((ele, index) => {
            return <button key={index} onClick={() => this.handleAnswer(index)}>
                {ele}
            </button>
        })
        return (
            <div className='question-display'>
                <Timer
                    initialTime={10000}
                    direction='backward'
                    checkpoints={[
                        {time: 0,
                        callback: () => this.handleAnswer(-1)
                    }
                    ]}
                >
                </Timer>
                <div id='arc_box'>
                    <svg id='timer_arc'></svg>
                </div>
                <h2>
                    {this.state.questions[this.state.currentQuestion]}
                </h2>
                <div>
                    {answers}
                </div>
            </div>
        )
    }
    
    // componentDidUpdate(prevState) {
    //     if (this.state.currentQuestion !== prevState.currentQuestion) {
    //         this.animateArcTimer()
    //         this.selectCurrentQuestion()
    //     }
    // }
}


export default Question