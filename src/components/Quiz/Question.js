import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {setNumCorrect} from '../../ducks/reducer'
import * as d3 from 'd3'
import './Question.css'
import Swal from 'sweetalert2'
var interval;

class Question extends Component {
    state={
        currentQuestion: -1
    }

    componentDidMount() {
        this.animatePageLoad()
        this.animateArcTimer()
        this.counter()
        this.setState({currentQuestion: this.props.match.params.questionID})
    }

    shuffleAnswers = (arr) => {
        let newArr = arr.slice()
        for (let i = newArr.length -1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1))
            var temp = newArr[i]
            newArr[i] = newArr[j]
            newArr[j] = temp
        }
        return newArr
    }

    animatePageLoad() {
        var box = d3.select('.quiz-content')
        box.style('margin-right', '100%')
        .transition()
        .duration(1000)
        .style('margin-right', '0%')
    }

    animatePageUnLoad() {
        var box = d3.select('.quiz-content')
        box.style('margin-left', '0%')
        .transition()
        .duration(1000)
        .style('margin-left', '500%')
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

    handleAnswer(response, correctAns) {
        if (response === correctAns) {
            this.counter(true)
            this.props.setNumCorrect(this.props.numberCorrect + 1)
            Swal.fire({
                type: 'success',
                width: '10rem',
                toast: true,
                position: 'top-start',
                timer: 1000,
                showConfirmButton: false
            })
        } else {
            Swal.fire({
                type: 'error',
                width: '10rem',
                toast: true,
                position: 'top-start',
                timer: 1000,
                showConfirmButton: false
            })
        }
        this.counter(true)
        if (Number(this.props.match.params.questionID) !== 3) {
            this.props.history.push(`/question/${Number(this.props.match.params.questionID) + 1}`)
        } else {
            this.counter(true)
            this.animatePageUnLoad()
            setTimeout(() => this.props.history.push('/quiz/true'), 1000)
        }
    }

    counter(stop = false) {
        if (stop) {
            clearTimeout(interval)
        } else {
            interval = setTimeout(() => {
                this.handleAnswer(1, 2)
            }, 10000)
        }
    }
    
    render() {
        const {questions} = this.props
        let question = questions[this.props.match.params.questionID].question
        let answers = questions.map((ele) => {
            return ele.answer
        })
        let answerArr = this.shuffleAnswers(answers)
        let corrAns = answerArr.indexOf(answers[this.props.match.params.questionID])
        let answerButtons = answerArr.map((ele, index) => {
            return <button key={index} onClick={() => this.handleAnswer(index, corrAns)}>{ele}</button>
        })
        return (
            <div className='quiz-main-content'>
                <div className='quiz-content'>
                    <div id='arc_box'>
                        <svg id='timer_arc'></svg>
                    </div>
                    <h2 id='question-title'>
                        {question}
                    </h2>
                    <div className='questions-answers'>
                        {answerButtons}
                    </div>
                </div>
            </div>
        )
    }

    componentDidUpdate() {
        if (this.state.currentQuestion !== this.props.match.params.questionID) {
            this.animateArcTimer()
            this.counter(true)
            this.counter()
        }
    }

    componentWillUnmount() {
        this.counter(true)
    }
    
}
        
function mapStateToProps(reduxState) {
    const {questions, numberCorrect} = reduxState
    return {questions, numberCorrect}
}

export default connect(mapStateToProps, {setNumCorrect})(withRouter(Question))