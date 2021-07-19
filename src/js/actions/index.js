// src/js/actions/index.js
import { 
  KNOB_CHANGE, 
  MOVE_WIRE, 
  BUTTON_ACTION,
  NOTE_PRESSED
} from "../constants/action-types"

export function changeKnob(payload) {
  return { type: KNOB_CHANGE, payload }
}

export function moveWire(payload) {
  return { type: MOVE_WIRE, payload }
}

export function buttonAction(payload) {
  return { type: BUTTON_ACTION, payload }
}

export function notePressed(payload) {
  return { type: NOTE_PRESSED, payload }
}