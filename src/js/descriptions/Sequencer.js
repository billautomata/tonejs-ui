import * as d3 from 'd3'
import * as _ from 'lodash'

const nTracks = 4
const nSteps = 32

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
  return { type: 'D', 
    position: { x: 8, y: 74+(track*23) }, 
    size: 12,
    name: (track), action: (toneObject) => {}, 
    defaultValue: false, value: false, 
    buttonGroup: 'select-track' 
  }
})
trackSelectionButtons[0].value = true

const stepSelectionButtons = d3.range(nSteps).map(step=>{
  return { type: 'D', 
    position: { x: 29+(step*23), y: 72+(nTracks*23) }, 
    size: 12,
    name: (step), action: (toneObject) => {}, 
    defaultValue: false, value: false, 
    buttonGroup: 'select-step' 
  }
})
stepSelectionButtons[0].value = true

export default function Sequencer () {
  return {
    'labels': [
      { text: 'POLYPHONIC SEQUENCER', position: { x: 0, y: 0 }, dimensions: { width: 780, height: 340 }, shadow: true },
    ],
    'knobs': [],
    'buttons': sequenceButtons.concat(trackSelectionButtons).concat(stepSelectionButtons)
  }
}