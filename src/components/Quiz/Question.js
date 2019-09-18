import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as d3 from 'd3'
import './Question.css'
import Swal from 'sweetalert2'
import Timer from 'react-compound-timer'

class Question extends Component {
    shuffleAnswers(arr) {
        return arr
    }
    
    render() {
        console.log(this.props)
        const {questions} = this.props
        let question = questions[this.props.match.params.questionID].question
        let answers = questions.map((ele) => {
            return ele.answer
        })
        let answerArr = this.shuffleAnswers(answers)
        return (
            <div className='question-display'>
                {question}
                {answerArr}
            </div>
        )
    }
    
}
        
function mapStateToProps(reduxState) {
    const {questions} = reduxState
    return {questions}
}


export default connect(mapStateToProps)(withRouter(Question))