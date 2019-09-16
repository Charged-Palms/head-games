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
        var arc = d3.arc()
        .innerRadius(40)
        .outerRadius(50)
        .startAngle(0)

        var arc2 = d3.arc()
        .innerRadius(0)
        .outerRadius(55)
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
            foreground.transition()
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

    
    // countDownCounter() {
    //     let counter = d3.select('#timer_count')
        
    //     function decrementCount() {
    //         if (this.state.countDown !== 0) {
    //             this.setState({countDown: this.state.countDown - 1})
    //             countDown()
    //         }
    //     }

    //     function countDown() {
    //         counter.transition()
    //         .duration(1000)
    //         .on('end', decrementCount)
    //     }

    //     countDown()
    // }

    componentDidMount() {
        this.animateCircleTimer()
        this.animateArcTimer()
        // this.countDownCounter()
    }
    
    render() {
        return (
            <div>
                <div>
                    <h1>Timer</h1>
                </div>
                <div>
                    <div id='timer_circle'>
                        {/* <div id='timer_num'>{this.state.countDown}</div> */}
                    </div>
                    <div id='arc_box'>
                        <svg id='timer_arc'></svg>
                    </div>
                    <div id='timer_count'>
                        {this.state.countDown}
                    </div>
                </div>
            </div>
        )
    }
}

export default Timer