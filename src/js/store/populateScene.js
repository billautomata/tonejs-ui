import * as Tone from 'tone'
import { v4 as uuidv4 } from 'uuid'
import MonoSynth from '../descriptions/MonoSynth'
import LFO from '../descriptions/LFO'

const labelDescriptions = {
  'monosynth': MonoSynth().labels,
  'lfo': LFO().labels
}

const knobDescriptions = {
  'monosynth': MonoSynth().knobs,
  'lfo': LFO().knobs
}

export default function loadScene (scene, synths, wires, toneObjects) {
  scene.forEach(sceneElement=>{
    sceneElement.knobs = knobDescriptions[sceneElement.type].map(o=>{ o.id = uuidv4(); return o })
    sceneElement.labels = labelDescriptions[sceneElement.type].map(o=>{ return o })
    synths.push(sceneElement)
  
    let toneObject = {}
    if (sceneElement.type === 'monosynth') {
      toneObject = new Tone.MonoSynth()
    }
    toneObject.id = sceneElement.id  
    // toneObject.toDestination()
    toneObjects.push(toneObject)
  })  
}