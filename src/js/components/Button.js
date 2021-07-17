import React from "react"
import { connect } from "react-redux"
// import * as d3 from 'd3'
// import { changeKnob } from "../actions/index";

const mapStateToProps = (state, ownProps) => {
  return { 
    // knobValue: state.synths.filter(o=>{return o.id === ownProps.synthID})[0].knobs.filter(o=>{ return o.id === ownProps.id })[0].value,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // changeKnob: payload => dispatch(changeKnob(payload))
  }
}

export class ConnectedButton extends React.Component {
  
  constructor(props) {
    super(props)
    this.buttonRef = React.createRef()
    this.state = {
      currentlyPressed: false,
      active: false
    }
    this.mouseDown = this.mouseDown.bind(this)
    this.mouseUp = this.mouseUp.bind(this)
  }

  componentDidMount () {
  }

  componentDidUpdate () {
  }

  mouseDown () {
    this.setState({
      currentlyPressed: true,
      active: !this.state.active
    })
  }
  mouseUp () {
    this.setState({
      currentlyPressed: false
    })
  }

  render () {
    return (      
      <g ref={this.buttonRef} 
        transform={`translate(${this.props.position.x} ${this.props.position.y})`} 
        style={{cursor: 'pointer'}}
        onMouseDown={this.mouseDown}
        onMouseUp={this.mouseUp}>
          {
            (()=>{
              switch (this.props.type) {
                case 'A': return (
                  <VariantA currentlyPressed={ this.state.currentlyPressed } active={ this.state.active } />
                )
                case 'B': return (
                  <VariantB currentlyPressed={ this.state.currentlyPressed } active={ this.state.active } />
                )
                default: return (
                  <></>
                )
              }              
            })()
          }
          
      </g>
    )
  }
}

const VariantA = ({ currentlyPressed, active }) => (
  <>
    <rect x='0' y='0' width='30' height='30' rx='4'
      fill='#EEE' stroke='#AAA' 
      filter={currentlyPressed ? null : 'url(#button-shadow)' }/>
    <rect x='5' y='5' width='20' height='5' fill={ active ? 'orange' : '#333' } stroke='none' rx='2'/>
  </>
)

const VariantB = ({ currentlyPressed, active }) => (
  <>
    <rect x='0' y='0' width='30' height='30' rx='4'
      fill={ active ? 'orange' : '#EEE' } stroke='#AAA' 
      filter={currentlyPressed ? null : 'url(#button-shadow)' }/>    
  </>
)


const Button = connect(mapStateToProps, mapDispatchToProps)(ConnectedButton);

export default Button;