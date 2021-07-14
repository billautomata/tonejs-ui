import { ADD_ARTICLE, KNOB_CHANGE } from "../../constants/action-types";
import * as Tone from 'tone'
import * as d3 from 'd3'
import { v4 as uuidv4 } from 'uuid';

// const synth = new Tone.MonoSynth()
// synth.toDestination()
// synth.envelope.set({release: 1.5})

// const scaleFrequency = d3.scaleLinear().domain([0,100]).range([0,5])

// const loopA = new Tone.Loop(time => {
//   console.log(time)
// 	synth.triggerAttackRelease("C4", "8n", time);
// }, "4n")


const knobDescriptions = {
  'monosynth': [
    { knobType: 'circle', position: { x: 50, y: 50 }, size: 50, name: 'volume', attribute: 'volume', outputRange: [-100, 0], defaultValue: -10, value: 0 },
    { knobType: 'slider', position: { x: 150, y: 50 }, size: 50, name: 'attack', attribute: 'envelope.attack', outputRange: [0, 5], defaultValue: 0.1, value: 0 }
  ]  
}

const synths = [
  { 
    type: 'monosynth', 
    id: uuidv4(),
    position: { x: 10, y: 20 },
    knobs: knobDescriptions['monosynth'].map(o=>{ o.id = uuidv4(); return o })
  }
]


// window.addEventListener('keydown', ()=>{
//   return
//   Tone.start()
//   loopA.start(0)
//   Tone.Transport.start()
// })

const initialState = {
  articles: [],
  synths
};

function rootReducer(state = initialState, action) {
  console.log(action.payload)
  if (action.type === ADD_ARTICLE) {
    return Object.assign({}, state, {
      articles: state.articles.concat(action.payload)
    });
  }
  if (action.type === KNOB_CHANGE) {
    state.synths.filter(o=>{ return o.id === action.payload.synthID })[0].knobs.filter(o=>{ return o.id === action.payload.id })[0].value = Math.max(Math.min(action.payload.value,100),0)
    // console.log(scaleFrequency(state.knobValues[action.payload.id]))
    // synth.envelope.set({ attack: scaleFrequency(state.knobValues[action.payload.id]) })
    return Object.assign({}, state, { synths: state.synths })
  }
  
  return state;
}

export default rootReducer;