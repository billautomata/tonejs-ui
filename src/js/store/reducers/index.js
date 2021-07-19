import { 
  KNOB_CHANGE, 
  MOVE_WIRE, 
  BUTTON_ACTION,
  NOTE_PRESSED
} from "../../constants/action-types"
// import * as d3 from 'd3'
import { v4 as uuidv4 } from 'uuid'
import populateScene from '../populateScene'
import * as Tone from 'tone'

const loopA = new Tone.Loop(time => {
  console.log(time)
	toneObjects[0].triggerAttackRelease("C4", "8n", time)
}, "4n")

window.addEventListener('keydown', ()=>{
  return
  Tone.start()
  loopA.start(0)
  Tone.Transport.start()
})

const toneObjects = []  // sound objects
const synths = []       // UI state objects
const wires = []        // UI connections between tone objects

const scene = [
  { 
    type: 'monosynth', 
    id: uuidv4(),
    position: { x: 10, y: 30 },
  },
  {
    type: 'lfo',
    id: uuidv4(),
    position: { x: 10, y: 500 }
  },
  {
    type: 'sequencer',
    id: uuidv4(),
    position: { x: 150, y: 400 }
  }
]

populateScene(scene, synths, wires, toneObjects)

// // connect LFO
// const LFO = new Tone.LFO(1,100,1000)
// LFO.connect(toneObjects[0].filter.frequency)

// const meter = new Tone.DCMeter()
// LFO.connect(meter)

// toneObjects.push(LFO)

toneObjects.forEach(o=>{
  console.log('ToneObject', typeof(o), o.name)
})

// setInterval(()=>{
//   console.log('lfo value', meter.getValue())
// },100)

const initialState = {
  synths,
  wires
};

function rootReducer(state = initialState, action) {
  if (action.type === KNOB_CHANGE) {
    const newKnobValue = Math.max(Math.min(action.payload.value,100),0)
    // assign the new value of the knob
    state.synths.filter(o=>{ return o.id === action.payload.synthID })[0].knobs.filter(o=>{ return o.id === action.payload.id })[0].value = newKnobValue
    // find the object in the scene and change the settings the knob is associated with
    const toneObject = toneObjects.filter(o=>{return o.id === action.payload.synthID})[0]
    if (action.payload.attribute.indexOf('.') === -1) {
      const o = {}
      o[action.payload.attribute] = action.payload.scaleAttribute(newKnobValue)
      toneObject.set(o)
      // toneObject[action.payload.attribute].value = action.payload.scaleAttribute(newKnobValue)
    } else {
      const attributeChain = action.payload.attribute.split('.')
      if(attributeChain.length === 2) {
        const obj = {}
        obj[attributeChain[1]] = action.payload.scaleAttribute(newKnobValue)
        toneObject[attributeChain[0]].set(obj)        
      }
    }
    return Object.assign({}, state, { synths: state.synths })
  } else if (action.type === MOVE_WIRE) {
    const wire = state.wires.filter(o => { return action.payload.id === o.id })[0]
    console.log(JSON.stringify(wire))
    wire.positions[1].x = action.payload.position.x
    wire.positions[1].y = action.payload.position.y
    Object.assign({}, wire, { positions: wire.positions })    
    console.log('move wire called')
    // console.log('move wire called', wire)
    // wire.positions[1].x = action.payload.position.x
    // wire.positions[1].y = action.payload.position.y
    return Object.assign({}, state, { wires: state.wires })
  } else if (action.type === BUTTON_ACTION ) {
    const toneObject = toneObjects.filter(o=>{return o.id === action.payload.synthID})[0]
    const btn = state.synths.filter(o=>{ return o.id === action.payload.synthID })[0].buttons.filter(o=>{ return o.id === action.payload.id })[0]
    // console.log(toneObject)
    action.payload.fn(toneObject)
    if(action.payload.buttonGroup !== undefined) {
      state.synths.filter(o=>{ return o.id === action.payload.synthID })[0]
        .buttons.filter(o=>{ return o.buttonGroup === action.payload.buttonGroup })
        .forEach(button=>{ button.value = false })
      btn.value = true
    } else {
      btn.value = !btn.value
    }       
    return Object.assign({}, state, { synths: state.synths })
  } else if (action.type === NOTE_PRESSED) {
    const synth = state.synths.filter(o=>{ return o.id === action.payload.synthID })[0]
    let btn = synth.buttons.filter(o => { return o.name === `track_${action.payload.activeTrack}_step_${action.payload.activeStep}`})[0]    
    const o = {}
    if(btn.noteData[`${action.payload.noteName}${action.payload.octave}`] !== undefined) {
      o[`${action.payload.noteName}${action.payload.noteOctave}`] = !btn.noteData[`${action.payload.noteName}${action.payload.noteOctave}`]
    } else {
      o[`${action.payload.noteName}${action.payload.noteOctave}`] = true
    }    
    btn.noteData = Object.assign({}, btn.noteData, o)
    btn = Object.assign({}, btn, { noteData: btn.noteData })    
    synth.buttons = Object.assign([], synth.buttons, { buttons: synth.buttons })
    return Object.assign({}, state, { synths: state.synths })
  }
  return state
}

export default rootReducer