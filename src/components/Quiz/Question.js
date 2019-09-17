import React, {Component} from 'react'
import * as d3 from 'd3'
import './Question.css'
import { arrayExpression } from '@babel/types'

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
        console.log(this.state)
        console.log(this.props)
        if (this.state.questions.length) {
            this.selectCurrentQuestion(this.state.currentQuestion)
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
        console.log(questions)
        let question = questions[current]
        let correctAnswer = answers[current]
        let tempArr = []
        let tempQuestionArr = []
        let tempAnswerArr = []
        let questIndex = Math.floor(Math.random() * 4)
        for (let i = 0; i < 4; i++) {
            let r = Math.floor(Math.random() * questions.length) + 1
            if (tempArr.indexOf(r) === -1) {
                i--
            } else {
                tempArr.push(r)
            }
            console.log(r)
        }
        for (let i = 0; i < tempArr.length; i++) {
            if (i !== questIndex) {
                tempQuestionArr.push(questions[tempArr[i]])
                tempAnswerArr.push(answers[tempArr[i]])
            } else {
                tempQuestionArr.push(question)
                tempAnswerArr.push(correctAnswer)
            }
        }
        this.setState({quiz: tempQuestionArr, questionsAnswers: tempAnswerArr, correctAnswer: questIndex})
    }

    render() {
        let answers = this.state.questionsAnswers.map((ele, index) => {
            return <div key={index}>
                {ele}
            </div>
        })
        return (
            <div className='question-display'>
                <div id='arc_box'>
                    <svg id='timer_arc'></svg>
                </div>
                <div>
                    {answers}
                </div>
            </div>
        )
    }
}

export default Question