import { ADD_ARTICLE, KNOB_CHANGE } from "../../constants/action-types"
import * as Tone from 'tone'
import * as d3 from 'd3'
import { v4 as uuidv4 } from 'uuid';

// const synth = new Tone.MonoSynth()
// synth.toDestination()
// synth.envelope.set({release: 1.5})

// const scaleFrequency = d3.scaleLinear().domain([0,100]).range([0,5])

const labelDescriptions = {
  'monosynth': [
    { text: 'MONO SYNTH', position: { x: 0, y: 0 }, dimensions: { width: 540, height: 300 }, shadow: true },
    { text: 'Envelope', position: { x: 130, y: 20 }, dimensions: { width: 155, height: 166 } },
    { text: 'Filter Envelope', position: { x: 300, y: 20 }, dimensions: { width: 225, height: 166 } }
  ]
}

const knobDescriptions = {
  'monosynth': [
    // { knobType: 'circle', position: { x: 50, y: 50 }, size: 50, name: 'Level', attribute: 'volume', outputRange: [-100, 0], defaultValue: -10, value: 20 },
    { knobType: 'circle', position: { x: 30, y: 60 }, size: 50, name: 'Detune', attribute: 'detune', outputRange: [-50, 50], defaultValue: 0, value: 50 },
    { knobType: 'slider', position: { x: 150, y: 95 }, size: 50, name: 'A', attribute: 'envelope.attack', outputRange: [0, 5], defaultValue: 0.1, value: 50 },
    { knobType: 'slider', position: { x: 185, y: 95 }, size: 50, name: 'D', attribute: 'envelope.decay', outputRange: [0, 5], defaultValue: 0.1, value: 20 },
    { knobType: 'slider', position: { x: 220, y: 95 }, size: 50, name: 'S', attribute: 'envelope.sustain', outputRange: [0, 1], defaultValue: 0.1, value: 70 },
    { knobType: 'slider', position: { x: 255, y: 95 }, size: 50, name: 'R', attribute: 'envelope.release', outputRange: [0, 5], defaultValue: 0.1, value: 80 },
    { knobType: 'slider', position: { x: 320, y: 95 }, size: 50, name: 'Freq', attribute: 'filterEnvelope.baseFrequency', outputRange: [0, 5000], defaultValue: 0.1, value: 70 },
    { knobType: 'slider', position: { x: 355, y: 95 }, size: 50, name: 'Q', attribute: 'filter.Q', outputRange: [0, 5], defaultValue: 0.1, value: 80 },        
    { knobType: 'slider', position: { x: 390, y: 95 }, size: 50, name: 'A', attribute: 'filterEnvelope.attack', outputRange: [0, 5], defaultValue: 0.1, value: 50 },
    { knobType: 'slider', position: { x: 425, y: 95 }, size: 50, name: 'D', attribute: 'filterEnvelope.decay', outputRange: [0, 5], defaultValue: 0.1, value: 20 },
    { knobType: 'slider', position: { x: 460, y: 95 }, size: 50, name: 'S', attribute: 'filterEnvelope.sustain', outputRange: [0, 1], defaultValue: 0.1, value: 70 },
    { knobType: 'slider', position: { x: 495, y: 95 }, size: 50, name: 'R', attribute: 'filterEnvelope.release', outputRange: [0, 5], defaultValue: 0.1, value: 80 }    
  ]  
}


const loopA = new Tone.Loop(time => {
  console.log(time)
	toneObjects[0].triggerAttackRelease("C4", "8n", time)
}, "4n")

window.addEventListener('keydown', ()=>{
  // return
  Tone.start()
  loopA.start(0)
  Tone.Transport.start()
})

const toneObjects = []  // sound objects
const synths = []       // state objects

const scene = [
  { 
    type: 'monosynth', 
    id: uuidv4(),
    position: { x: 10, y: 30 },
  }
]

scene.forEach(sceneElement=>{
  sceneElement.knobs = knobDescriptions[sceneElement.type].map(o=>{ o.id = uuidv4(); return o })
  sceneElement.labels = labelDescriptions[sceneElement.type].map(o=>{ return o })
  synths.push(sceneElement)

  let toneObject = {}
  if (sceneElement.type === 'monosynth') {
    toneObject = new Tone.MonoSynth()
  }
  toneObject.id = sceneElement.id  
  toneObject.toDestination()
  toneObjects.push(toneObject)
})

const initialState = {
  articles: [],
  synths
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    })
  }
  if (action.type === KNOB_CHANGE) {
    const newKnobValue = Math.max(Math.min(action.payload.value,100),0)
    state.synths.filter(o=>{ return o.id === action.payload.synthID })[0].knobs.filter(o=>{ return o.id === action.payload.id })[0].value = newKnobValue
    const toneObject = toneObjects.filter(o=>{return o.id === action.payload.synthID})[0]
    if (action.payload.attribute.indexOf('.') === -1) {
      toneObject[action.payload.attribute].value = action.payload.scaleAttribute(newKnobValue)
    } else {
      const attributeChain = action.payload.attribute.split('.')
      if(attributeChain.length === 2) {
        const obj = {}
        obj[attributeChain[1]] = action.payload.scaleAttribute(newKnobValue)
        toneObject[attributeChain[0]].set(obj)        
      }
    }
    
    return Object.assign({}, state, { synths: state.synths })
  }
  return state
}

export default rootReducer