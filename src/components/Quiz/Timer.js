import React, {Component} from 'react'
import * as d3 from 'd3'

class Timer extends Component {
    state = {
        countDown: 5
    }
    animateCircleTimer() {
        let timerCircle = d3.select('#timer_circle')
        .append('svg')
        .style('border', '3px solid black')
        .style('border-radius', '50%')
        .style('width', '50px')
        .style('height', '50px')
        .style('background', 'green')

        function yellowShift() {
            timerCircle.transition()
            .duration(3000)
            .style('background', 'yellow')
            .on('end', redShift)
        }

        function redShift() {
            timerCircle.transition()
            .duration(2000)
            .style('background', 'red')
        }

        yellowShift()
    }

    animateArcTimer() {
        let arcTimer = d3.select('#timer_arc').append('svg:svg')
        
        // var arc = d3.svg.arc()
        // .innerRadius(50)
        // .outerRadius(70)
        // .startAngle(45 * (Math.PI/180)) //converting from degs to radians
        // .endAngle(3) //just radians
    }

    componentDidMount() {
        this.animateCircleTimer()
        // this.animateArcTimer()
    }

    render() {
        let arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(100)
        return (
            <div>
                <div>
                    <h1>Timer</h1>
                </div>
                <div>
                    <div id='timer_circle'>
                        {/* <div id='timer_num'>{this.state.countDown}</div> */}
                    </div>
                    <div id='timer_arc'>
                        <path d={arc()}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Timer