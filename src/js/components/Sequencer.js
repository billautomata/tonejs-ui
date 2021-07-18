import React from "react"
import { connect } from "react-redux"
import * as d3 from 'd3'
import Widget from './Widget'


const mapStateToProps = (state, ownProps) => {
  const synth = state.synths.filter(o=>{ return o.id === ownProps.id })[0]
  const activeTrack = synth.buttons.filter(o => { return o.buttonGroup === 'select-track' && o.value === true})[0].name
  const activeStep = synth.buttons.filter(o => { return o.buttonGroup === 'select-step' && o.value === true})[0].name
  console.log('activeTrack',activeTrack,'activeStep',activeStep)
  const activeButton = synth.buttons.filter(o => { return o.name === `track_${activeTrack}_step_${activeStep}`})[0]
  return { 
    notes: activeButton.noteData,
    wires: state.wires
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
          d3.range(7).map(n=>{
            return (
              <g transform={`translate(${n*20} ${0})`}>
                <rect x='0' y='0' height='60' width='20' stroke={ this.props.notes.indexOf(this.naturalNoteNames[n])===-1 ? '#AAA' : 'orange' } fill='white' rx='2'/>
              </g>
            )
          })
        }
        {
          d3.range(5).map(n=>{
            return (
              <g transform={`translate(${12.5+(this.sharpsOrdinals(n)*20)} ${0})`}>
                <rect x='0' y='0' height='35' width='15' stroke={ this.props.notes.indexOf(this.sharpNoteNames[n])===-1 ? '#AAA' : 'orange' } fill='black' rx='2'/>
              </g>
            )
          })
        }
      </g>
    )
  }
}


const Sequencer = connect(mapStateToProps)(ConnectedSequencer);

export default Sequencer;