import React from "react"
import { connect } from "react-redux"
import * as d3 from 'd3'
import Widget from './Widget'
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
    notes: activeButton.noteData,
    wires: state.wires
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
    this.noteClicked = this.noteClicked.bind(this)
    this.sharpsOrdinals = d3.scaleOrdinal().domain(d3.range(5)).range([0,1,3,4,5])
    this.naturalNoteNames = ['C','D','E','F','G','A','B']
    this.sharpNoteNames = ['C#','D#','F#','G#','A#']
  }

  componentDidMount () {
  }
  componentDidUpdate () {
    console.log(this.props.notes)
  }

  noteClicked (note) {
    this.props.notePressed({
      synthID: this.props.id,
      activeTrack: this.props.activeTrack,
      activeStep: this.props.activeStep,
      noteName: note
    })
  }
  render () {
    return (
      <g transform={`translate(${this.props.position.x} ${this.props.position.y})`}>
        <Widget {...this.props}/>
        {
          d3.range(7).map(n=>{
            return (
              <g transform={`translate(${n*20} ${0})`}>
                <rect x='0' y='0' 
                  height='60' width='20' 
                  fill={ this.props.notes[this.naturalNoteNames[n]] !== true ? '#EEE' : 'orange' } 
                  stroke='#FFF' rx='2'
                  onMouseDown={()=>{this.noteClicked(this.naturalNoteNames[n])}}
                />
              </g>
            )
          })
        }
        {
          d3.range(5).map(n=>{
            return (
              <g transform={`translate(${12.5+(this.sharpsOrdinals(n)*20)} ${0})`}>
                <rect x='0' y='0' 
                  height='35' width='15' 
                  fill={ this.props.notes[this.sharpNoteNames[n]] !== true ? '#333' : 'orange' } 
                  stroke='#FFF' rx='2'
                  onMouseDown={()=>{this.noteClicked(this.sharpNoteNames[n])}}
                />
              </g>
            )
          })
        }
      </g>
    )
  }
}


const Sequencer = connect(mapStateToProps,mapDispatchToProps)(ConnectedSequencer);

export default Sequencer;