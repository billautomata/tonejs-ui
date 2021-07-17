import React from "react"
import * as d3 from 'd3'

export class Sequencer extends React.Component {
  constructor(props) {
    super(props)
    this.sharpsOrdinals = d3.scaleOrdinal().domain(d3.range(5)).range([0,1,3,4,5])
  }
  componentDidMount () {
  }
  render () {
    return (
      <g transform={`translate(${this.props.position.x} ${this.props.position.y})`}>
        {
          d3.range(7).map(n=>{
            return (
              <g transform={`translate(${n*20} ${0})`}>
                <rect x='0' y='0' height='60' width='20' stroke='#AAA' fill='white' rx='2'/>
              </g>
            )
          })
        }
        {
          d3.range(5).map(n=>{
            return (
              <g transform={`translate(${12.5+(this.sharpsOrdinals(n)*20)} ${0})`}>
                <rect x='0' y='0' height='35' width='15' stroke='#AAA' fill='black' rx='2'/>
              </g>
            )
          })
        }
      </g>
    )
  }
}

export default Sequencer;