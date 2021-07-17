import React from "react"
import { connect } from "react-redux"
import * as d3 from 'd3'

const mapStateToProps = (state, ownProps) => {
  return { 
    startPositionX: state.wires.filter(o=>{ return o.id === ownProps.id })[0].positions[0].x,
    startPositionY: state.wires.filter(o=>{ return o.id === ownProps.id })[0].positions[0].y,
    endPositionX: state.wires.filter(o=>{ return o.id === ownProps.id })[0].positions[1].x,
    endPositionY: state.wires.filter(o=>{ return o.id === ownProps.id })[0].positions[1].y
  }
}

export class Wire extends React.Component {
  constructor(props) {
    super(props)
    this.textRef = React.createRef()
    this.state = {
      path: ''
    }
    this.startPositionX = this.props.startPositionX
    this.startPositionY = this.props.startPositionY
    this.endPositionX = this.props.endPositionX
    this.endPositionY = this.props.endPositionY
  }
  componentDidMount () {
    console.log('wire did mount')
    this.updateWire()
  }

  updateWire () {
    const positions = [
      { x: this.props.startPositionX, y: this.props.startPositionY },
      { x: this.props.endPositionX, y: this.props.endPositionY },
    ]
    const yOffset = 100

    const midPoint = { x: positions[0].x + (Math.abs(positions[1].x - positions[0].x) * 0.5), y: (positions[1].y > positions[0].y ? positions[1].y : positions[0].y) + yOffset }
    const pts = [
      positions[0],
      midPoint,
      positions[1]
    ]
    console.log(pts)
    this.setState({
      path: d3.line().x(d=>d.x).y(d=>d.y).curve(d3.curveBasis)(pts)
    })
  }

  componentDidUpdate () {
    console.log('updated wire')
    if(this.startPositionX !== this.props.startPositionX || 
      this.startPositionY !== this.props.startPositionY || 
      this.endPositionX !== this.props.endPositionX || 
      this.endPositionY !== this.props.endPositionY) {
      
        this.startPositionX = this.props.startPositionX
        this.startPositionY = this.props.startPositionY
        this.endPositionX = this.props.endPositionX
        this.endPositionY = this.props.endPositionY

        this.updateWire()
      }
  }

  render () {
    return (
      <path d={this.state.path} stroke='black' fill='none' strokeWidth='4' filter="url(#synth-shadow)"/>
    )
  }
}

const ConnectedWire = connect(mapStateToProps)(Wire)

export default ConnectedWire
