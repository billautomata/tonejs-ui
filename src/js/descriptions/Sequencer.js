import * as d3 from 'd3'
import * as _ from 'lodash'

const nTracks = 6
const nSteps = 32
const bpm = 120

const sequenceButtons = _.flatten(d3.range(nTracks).map(track=>{
  return d3.range(nSteps).map(step=>{
    return { 
      type: 'C', 
      position: { x: 25+(step*23), y: 70+(track*23) }, 
      name: `track_${track}_step_${step}`, 
      action: (toneObject) => {}, 
      defaultValue: false, value: false,
      noteData: {}
    }
  })
}))

sequenceButtons[0].noteData = {
  'C3': true,
  'D#3': true,
  'G3': true,
}

const trackSelectionButtons = d3.range(nTracks).map(track=>{
  return { 
    type: 'D', 
    position: { x: 8, y: 74+(track*23) }, 
    size: 12,
    name: (track), action: (toneObject) => {}, 
    defaultValue: false, value: false, 
    buttonGroup: 'select-track' 
  }
})
trackSelectionButtons[0].value = true

const stepSelectionButtons = d3.range(nSteps).map(step=>{
  return { 
    type: 'D', 
    position: { x: 29+(step*23), y: 72+(nTracks*23) }, 
    size: 12,
    name: (step), action: (toneObject) => {}, 
    defaultValue: false, value: false, 
    buttonGroup: 'select-step' 
  }
})
stepSelectionButtons[0].value = true

const clockButtons = d3.range(6).map(n=>{
  return {
    type: 'C',
    position: { x: 131+(n*24), y: 288 },
    size: 30,
    name: (Math.floor(Math.pow(2,n))),
    action: () => {},
    defaultvalue: false, value: false,
    buttonGroup: 'clock',
    labelSettings: { x: 10, y: 32, textAnchor: 'middle', fontSize: '10', fontWeight: 300 }
  }
})

clockButtons[4].value = true

const directionButtons = d3.range(4).map(n=>{
  return {
    type: 'C',
    position: { x: 381+(n*24), y: 288 },
    size: 30,
    name: ['→','←','↔','?'][n],
    action: () => {},
    defaultvalue: false, value: false,
    buttonGroup: 'direction',
    labelSettings: { x: 10, y: 32 + (n < 2 ? 1 : 0), textAnchor: 'middle', fontSize: '12', fontWeight: 500 }
  }
})
directionButtons[0].value = true

export default function Sequencer () {
  return {
    'labels': [
      { text: 'POLYPHONIC SEQUENCER', position: { x: 0, y: 0 }, dimensions: { width: 950, height: 340 }, shadow: true },
      { text: 'TRANSPORT', position: { x: 8, y: 282 }, dimensions: { width: 115, height: 48 } },
      { text: 'STEP LENGTH', position: { x: 131, y: 282 }, dimensions: { width: 152, height: 48 } },
      { text: 'TEMPO', position: { x: 291, y: 282 }, dimensions: { width: 84, height: 48 } },
      { text: 'Direction', position: { x: 381, y: 282 }, dimensions: { width: 103, height: 48 } },
    ],
    'knobs': [],
    'buttons': sequenceButtons.concat(trackSelectionButtons).concat(stepSelectionButtons).concat(clockButtons).concat(directionButtons),
    'metadata': {
      nTracks, nSteps, bpm
    }
  }
}