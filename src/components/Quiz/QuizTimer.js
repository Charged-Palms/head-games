import React, {Component} from 'react'
import * as d3 from 'd3'

class QuizTimer extends Component {
    componentDidMount() {
        this.drawChart()
    }

    drawChart() {

        const svg = d3.select('div').append('svg').attr('width', 700).attr('height', 300)

        svg.select('svg')
            .transition()
            .duration(2500)
            .attr('transform', 'rotate(-180, 200, 100')
            .transition()
            .duration(2500)
            .attr('transform', 'rotate(0, 200, 100')
            .on('end', this.drawChart)
    }

    render() {
        return <div></div>
    }
}

export default QuizTimer