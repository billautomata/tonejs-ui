import React from "react"
import * as d3 from 'd3'

export class SynthLabel extends React.Component {
  constructor(props) {
    super(props)
    this.textRef = React.createRef()
    console.log('this props', this.props)
    console.log('this state', this.state)
    this.state = {
      rectWidth: 0
    }
  }
  componentDidMount () {
    const text = d3.select(this.textRef.current)
    console.log(text.node().getBBox())
    this.setState({
      rectWidth: text.node().getBBox().width
    })
  }
  render () {
    return (
      <g transform={`translate(${this.props.position.x} ${this.props.position.y})`}  style={{ userSelect: 'none', pointerEvents: 'none', filter: this.props.shadow ? 'url(#synth-shadow)' : null }}>
        <rect x='-5' y='-5' width={this.props.dimensions.width} height={this.props.dimensions.height} fill='white' stroke='#AAA' rx='4'/>
        <g transform='translate(0 -6)'>
          <rect x='2' y='-12' width={this.state.rectWidth+4} height='16' fill='white' stroke='#AAA' rx='2'/>
          <text x='6' y='0' ref={this.textRef} fontSize='12' letterSpacing='1px' style={{ textTransform: 'uppercase' }}>{this.props.text}</text>
        </g>
      </g>
    )
  }
}

export default SynthLabel;