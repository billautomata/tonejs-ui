import React from "react"
import { connect } from "react-redux"
// import * as d3 from 'd3'
// import { changeKnob } from "../actions/index";
import { buttonAction } from '../../actions/index'

const mapStateToProps = (state, ownProps) => {
  // console.log('button synth id', ownProps.synthID)
  const synth = state.synths.filter(o=>{return o.id === ownProps.synthID})[0]
  if(synth === undefined) {
    return {}
  }
  const button = synth.buttons.filter(o=>{ return o.id === ownProps.id })[0]
  return { 
    buttonValue: button.value,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    buttonAction: payload => dispatch(buttonAction(payload))
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
    // console.log('button mounted', this.props)
  }

  componentDidUpdate () {
  }

  mouseDown () {
    this.setState({
      currentlyPressed: true,
      active: !this.state.active
    })
    if(this.props.local === undefined) {
      this.props.buttonAction({
        buttonGroup: this.props.buttonGroup,
        id: this.props.id,
        fn: this.props.action,
        synthID: this.props.synthID, 
      })  
    }
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
                  <VariantA currentlyPressed={ this.state.currentlyPressed } active={ this.props.buttonValue } name={ this.props.name } />
                )
                case 'B': return (
                  <VariantB currentlyPressed={ this.state.currentlyPressed } active={ this.props.buttonValue } name={ this.props.name } />
                )
                case 'C': return (
                  <VariantC currentlyPressed={ this.state.currentlyPressed } active={ this.props.buttonValue } name={ this.props.name } labelSettings={ this.props.labelSettings } />
                )
                case 'D': return (
                  <VariantD currentlyPressed={ this.state.currentlyPressed } active={ this.props.buttonValue } name={ this.props.name } size={ this.props.size } />
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

const VariantA = ({ currentlyPressed, active, name }) => (
  <>
    <rect x='0' y='0' width='30' height='30' rx='4'
      fill='#EEE' stroke='#AAA' 
      filter={currentlyPressed ? null : 'url(#button-shadow)' }/>
    <rect x='5' y='5' width='20' height='5' fill={ active ? 'orange' : '#333' } stroke='none' rx='2'/>
    <text x='15' y='45' dy='0.33em' textAnchor='middle' fontSize='14' fill='#333' fontWeight='500' style={{textTransform: 'uppercase'}}>{name}</text>
  </>
)

const VariantB = ({ currentlyPressed, active, name }) => (
  <>
    <rect x='0' y='0' width='30' height='30' rx='4'
      fill={ active ? 'orange' : '#EEE' } stroke='#AAA' 
      filter={currentlyPressed ? null : 'url(#button-shadow)' }/>    
    <text x='15' y='45' dy='0.33em' textAnchor='middle' fontSize='14' fill='#333' fontWeight='500' style={{textTransform: 'uppercase'}}>{name}</text>      
  </>
)

const VariantC = ({ currentlyPressed, active, name, labelSettings }) => (
  <>
    <rect x='0' y='0' width='20' height='20' rx='2'
      fill={ active ? 'orange' : '#EEE' } stroke='#AAA' 
      filter={currentlyPressed ? null : 'url(#button-shadow)' }/>    
    {(()=>{
      if (labelSettings) {
        return (
          <text {...labelSettings}>{name}</text>
        )
      }
    })()}
  </>
)

const VariantD = ({ currentlyPressed, active, name, size }) => (
  <>
    <rect x='0' y='0' width={size} height={size} rx='2'
      fill={ active ? 'orange' : '#EEE' } stroke='#AAA' 
      filter={currentlyPressed ? null : 'url(#button-shadow)' }/>    
  </>
)

const Button = connect(mapStateToProps, mapDispatchToProps)(ConnectedButton);

export default Button;