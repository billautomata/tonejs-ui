// src/js/actions/index.js
import { KNOB_CHANGE, MOVE_WIRE } from "../constants/action-types";

export function changeKnob(payload) {
  return { type: KNOB_CHANGE, payload }
}

export function moveWire(payload) {
  return { type: MOVE_WIRE, payload }
}