import * as Tone from 'tone'
import { v4 as uuidv4 } from 'uuid'
import LFO from '../descriptions/LFO'
import MonoSynth from '../descriptions/MonoSynth'
import Sequencer from '../descriptions/Sequencer'

const labelDescriptions = {
  'lfo': LFO().labels,
  'monosynth': MonoSynth().labels,
  'sequencer': Sequencer().labels,
}

const knobDescriptions = {
  'lfo': LFO().knobs,
  'monosynth': MonoSynth().knobs,
  'sequencer': Sequencer().knobs,
}

const buttonDescriptions = {
  'lfo': LFO().buttons,
  'monosynth': MonoSynth().buttons,
  'sequencer': Sequencer().buttons
}

const metadatas = {
  'lfo': LFO().metadata,
  'monosynth': MonoSynth().metadata,
  'sequencer': Sequencer().metadata
}

export default function loadScene (scene, synths, wires, toneObjects) {
  scene.forEach(sceneElement=>{
    sceneElement.buttons = buttonDescriptions[sceneElement.type].map(o=>{ o.id = uuidv4(); return o })
    sceneElement.knobs = knobDescriptions[sceneElement.type].map(o=>{ o.id = uuidv4(); return o })
    sceneElement.labels = labelDescriptions[sceneElement.type].map(o=>{ return o })
    sceneElement.metadata = metadatas[sceneElement.type]
    console.log(sceneElement)
    synths.push(sceneElement)
  
    let toneObject = {}
    if (sceneElement.type === 'monosynth') {
      toneObject = new Tone.MonoSynth()
    } else if (sceneElement.type === 'lfo') {
      toneObject = new Tone.LFO()
    }
    toneObject.id = sceneElement.id  
    if(toneObject.toDestination) {
      toneObject.toDestination()
    }    
    toneObjects.push(toneObject)
  })  
}