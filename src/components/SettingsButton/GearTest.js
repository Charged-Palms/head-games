import React, {Component} from 'react'
import {ReactComponent as Gear} from './settings.svg'
import {ReactComponent as Head} from './head.svg'
import * as d3 from 'd3'
import './SettingsButton.css'


class GearTest extends Component {
    spinGear() {

        var gear = d3.select('#Capa_1')
        spinning()
        
        // function spinBack() {
        //     gear
        //     .attr('transform', 'rotate(0, 0, 0)')
        //     .transition()
        //     .duration(2000)
        //     .attr('transform', 'rotate(-180, 0, 0)')
        //     .on('end', spinning)
        // }

        function spinning() {
            gear
            .attr('transform', 'rotate(0, 0, 0)')
            .transition()
            .duration(2000)
            .attr('transform', 'rotate(-180, 0, 0)')
            .on('end', spinBreak)
        }

        function spinBreak() {
            gear
            .transition()
            .duration(2000)
            .attr('transform', 'rotate(-135, 0, 0)')
            .on('end', spinning)
        }
        
    }

    componentDidMount() {
        this.spinGear()
    }

    render() {
        return (
            <div>
                <div className='button-box'>
                    <div className='gear-box'>
                        <Gear/>
                    </div>
                    <div className='head-box'>
                        <Head/>
                    </div>
                </div>
            </div>
        )
    }
}

export default GearTest