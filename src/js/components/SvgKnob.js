// src/js/components/List.js

import React from "react"
import { connect } from "react-redux"
import * as d3 from 'd3'
import { changeKnob } from "../actions/index";

const mapStateToProps = (state, ownProps) => {
  return { 
    knobValue: state.synths.filter(o=>{return o.id === ownProps.synthID})[0].knobs.filter(o=>{ return o.id === ownProps.id })[0].value,
    knobId: ownProps.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeKnob: payload => dispatch(changeKnob(payload))
  }
}

export class ConnectedKnob extends React.Component {
  
  constructor(props) {
    super(props)
    this.circleRef = React.createRef()
    this.textRef = React.createRef()
    this.scaleIndicatorCircle = d3.scaleLinear().domain([0,100]).range([-130,130])
    this.scaleIndicatorSlider = d3.scaleLinear().domain([0,100]).range([100,0])
  }

  componentDidMount () {    
    console.log('knob value', this.props.knobValue)
    const dragHandler = d3.drag().on('drag', dragged)
    const self = this
    function dragged (event) {
      // console.log(d3.select(this))
      // console.log(event)
      // console.log([event.x, event.y, event.dx, event.dy].join('\t'))
      self.props.changeKnob({ synthID: self.props.synthID, id: self.props.id, value: self.props.knobValue - event.dy })
    }
    dragHandler(d3.select(this.circleRef.current))
  }

  componentDidUpdate () {
    console.log('update')
  }

  render () {
    return (      
      <>
        <g transform={`translate(${this.props.position.x} ${this.props.position.y})`}>
          {
            this.props.knobType === 'slider' ? <>
              <g>
                <rect x='0' y='0' width='10' height='100' fill='black'/>
                <rect ref={this.circleRef} x='-15' y={this.scaleIndicatorSlider(this.props.knobValue)} width='40' height='20' fill='red'/>
                <text ref={this.textRef} x='0' y='0' dy='0.33em' 
                  fill='black' textAnchor='middle'
                  style={{userSelect: 'none', pointerEvents: 'none'}}>{this.props.knobValue}</text>
              </g>
            </> : <>
              <circle ref={this.circleRef} cx='0' cy='0' r='30'/>
              <line x1='0' y1='-10' x2='0' y2='-30' strokeWidth='5' transform={`rotate(${this.scaleIndicatorCircle(this.props.knobValue)})`} stroke='#F00'/>
              <line x1='0' y1='-20' x2='0' y2='-30' transform='rotate(-130)' stroke='#FFF'/>
              <line x1='0' y1='-20' x2='0' y2='-30' transform='rotate(130)' stroke='#FFF'/>        
              <text ref={this.textRef} x='0' y='0' dy='0.33em' 
                fill='white' textAnchor='middle'
                style={{userSelect: 'none', pointerEvents: 'none'}}>{this.props.knobValue}</text>
            </>
          }
        </g>
      </>
    )
  }
}

const SvgKnob = connect(mapStateToProps, mapDispatchToProps)(ConnectedKnob);

export default SvgKnob;