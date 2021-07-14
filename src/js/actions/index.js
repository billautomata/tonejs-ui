// src/js/actions/index.js
import { ADD_ARTICLE, KNOB_CHANGE } from "../constants/action-types";

export function addArticle(payload) {
  return { type: ADD_ARTICLE, payload };
}

export function changeKnob(payload) {
  return { type: KNOB_CHANGE, payload }
}
