import React from "react"
import { connect } from "react-redux"
import * as d3 from 'd3'
import Widget from './Widget'
import Keybed from './subcomponents/Keybed'
import { notePressed } from '../actions/index'


const mapStateToProps = (state, ownProps) => {
  const synth = state.synths.filter(o=>{ return o.id === ownProps.id })[0]
  const activeTrack = synth.buttons.filter(o => { return o.buttonGroup === 'select-track' && o.value === true})[0].name
  const activeStep = synth.buttons.filter(o => { return o.buttonGroup === 'select-step' && o.value === true})[0].name
  console.log('activeTrack',activeTrack,'activeStep',activeStep)
  const activeButton = synth.buttons.filter(o => { return o.name === `track_${activeTrack}_step_${activeStep}`})[0]
  return { 
    activeTrack,
    activeStep,
    notes: activeButton.noteData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    notePressed: payload => dispatch(notePressed(payload))
  }
}

export class ConnectedSequencer extends React.Component {
  constructor(props) {
    super(props)
    this.sharpsOrdinals = d3.scaleOrdinal().domain(d3.range(5)).range([0,1,3,4,5])
    this.naturalNoteNames = ['C','D','E','F','G','A','B']
    this.sharpNoteNames = ['C#','D#','F#','G#','A#']
  }

  componentDidMount () {
  }
  componentDidUpdate () {
    console.log(this.props.notes)
  }
  render () {
    return (
      <g transform={`translate(${this.props.position.x} ${this.props.position.y})`}>
        <Widget {...this.props}/>
        {
          d3.range(5).map(octave=>{
            return (
              <Keybed position={{ x: 25 + (octave*140), y: 5}} id={this.props.id} octave={octave+1}/>
            )
          })
        }        
      </g>
    )
  }
}


const Sequencer = connect(mapStateToProps,mapDispatchToProps)(ConnectedSequencer);

export default Sequencer;