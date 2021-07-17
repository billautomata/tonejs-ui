export default function MonoSynth () {
  return {
    'labels': [
      { text: 'MONO SYNTH', position: { x: 0, y: 0 }, dimensions: { width: 540, height: 300 }, shadow: true },
      { text: 'Envelope', position: { x: 130, y: 20 }, dimensions: { width: 155, height: 166 } },
      { text: 'Filter Envelope', position: { x: 300, y: 20 }, dimensions: { width: 225, height: 166 } }
    ],
    'knobs': [
      { knobType: 'circle', position: { x: 40, y: 165 }, size: 50, name: 'Level', attribute: 'volume', outputRange: [-100, 0], defaultValue: 20, value: 20 },
      { knobType: 'circle', position: { x: 40, y: 60 }, size: 50, name: 'Detune', attribute: 'detune', outputRange: [-50, 50], defaultValue: 50, value: 50 },
      { knobType: 'slider', position: { x: 150, y: 95 }, size: 50, name: 'A', attribute: 'envelope.attack', outputRange: [0, 5], defaultValue: 50, value: 50 },
      { knobType: 'slider', position: { x: 185, y: 95 }, size: 50, name: 'D', attribute: 'envelope.decay', outputRange: [0, 5], defaultValue: 20, value: 20 },
      { knobType: 'slider', position: { x: 220, y: 95 }, size: 50, name: 'S', attribute: 'envelope.sustain', outputRange: [0, 1], defaultValue: 70, value: 70 },
      { knobType: 'slider', position: { x: 255, y: 95 }, size: 50, name: 'R', attribute: 'envelope.release', outputRange: [0, 5], defaultValue: 80, value: 80 },
      { knobType: 'slider', position: { x: 320, y: 95 }, size: 50, name: 'Freq', attribute: 'filterEnvelope.baseFrequency', outputRange: [0, 5000], defaultValue: 10, value: 10 },
      { knobType: 'slider', position: { x: 355, y: 95 }, size: 50, name: 'Q', attribute: 'filter.Q', outputRange: [0, 5], defaultValue: 80, value: 80 },        
      { knobType: 'slider', position: { x: 390, y: 95 }, size: 50, name: 'A', attribute: 'filterEnvelope.attack', outputRange: [0, 5], defaultValue: 50, value: 50 },
      { knobType: 'slider', position: { x: 425, y: 95 }, size: 50, name: 'D', attribute: 'filterEnvelope.decay', outputRange: [0, 5], defaultValue: 20, value: 20 },
      { knobType: 'slider', position: { x: 460, y: 95 }, size: 50, name: 'S', attribute: 'filterEnvelope.sustain', outputRange: [0, 1], defaultValue: 70, value: 70 },
      { knobType: 'slider', position: { x: 495, y: 95 }, size: 50, name: 'R', attribute: 'filterEnvelope.release', outputRange: [0, 5], defaultValue: 80, value: 80 }    
    ],
    'buttons': [
      { type: 'B', position: { x: 130, y: 200 }, name: 'sine', action: (toneObject) => { toneObject.oscillator.set({ type: 'sine' }) }, defaultValue: false, value: true },
      { type: 'B', position: { x: 180, y: 200 }, name: 'tri', action: (toneObject) => { toneObject.oscillator.set({ type: 'triangle' }) }, defaultValue: false, value: false },
      { type: 'B', position: { x: 230, y: 200 }, name: 'saw', action: (toneObject) => { toneObject.oscillator.set({ type: 'sawtooth' }) }, defaultValue: false, value: false } ,           
    ]
  }
}