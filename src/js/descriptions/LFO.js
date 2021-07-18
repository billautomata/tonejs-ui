import * as d3 from 'd3'

export default function LFO () {
  return {
    'labels': [
      { text: 'LFO', position: { x: 0, y: 0 }, dimensions: { width: 108, height: 200 }, shadow: true },
      { text: 'RANGE', position: { x: 3, y: 125 }, dimensions: { width: 102, height: 50 } },
    ],
    'knobs': [
      { knobType: 'circle', position: { x: 50, y: 50 }, size: 50, name: 'Hz', attribute: 'frequency', outputRange: [0.01, 10], defaultValue: 5, value: 5 },
    ],
    'buttons': []
  }
}