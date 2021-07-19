import React from "react"
import { connect } from "react-redux"
import * as d3 from 'd3'
import { notePressed } from '../../actions/index'


const mapStateToProps = (state, ownProps) => {
  const synth = state.synths.filter(o=>{ return o.id === ownProps.id })[0]
  const activeTrack = synth.buttons.filter(o => { return o.buttonGroup === 'select-track' && o.value === true})[0].name
  const activeStep = synth.buttons.filter(o => { return o.buttonGroup === 'select-step' && o.value === true})[0].name
  // console.log('activeTrack',activeTrack,'activeStep',activeStep)
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

export class ConnectedKeybed extends React.Component {
  constructor(props) {
    super(props)
    this.noteClicked = this.noteClicked.bind(this)
    this.sharpsOrdinals = d3.scaleOrdinal().domain(d3.range(5)).range([0,1,3,4,5])
    this.naturalNoteNames = ['C','D','E','F','G','A','B']
    this.sharpNoteNames = ['C#','D#','F#','G#','A#']
  }

  componentDidMount () {
    // console.log('octave',this.props.octave)
  }
  componentDidUpdate () {
    // console.log(this.props.notes)
  }

  noteClicked (note) {
    // return console.log('octave',this.props.octave)
    this.props.notePressed({
      synthID: this.props.id,
      activeTrack: this.props.activeTrack,
      activeStep: this.props.activeStep,
      noteName: note,
      noteOctave: this.props.octave
    })
  }
  render () {
    return (
      <g transform={`translate(${this.props.position.x} ${this.props.position.y})`}>
        {
          d3.range(7).map(n=>{
            return (
              <g transform={`translate(${n*20} ${0})`}>
                <rect x='0' y='0' 
                  height='60' width='20' 
                  fill={ this.props.notes[`${this.naturalNoteNames[n]}${this.props.octave}`] !== true ? '#EEE' : 'orange' } 
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
                  fill={ this.props.notes[`${this.sharpNoteNames[n]}${this.props.octave}`] !== true ? '#333' : 'orange' } 
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

const Keybed = connect(mapStateToProps,mapDispatchToProps)(ConnectedKeybed);

export default Keybed;