import { createReducer } from 'cape-redux'
import { merge, setKey } from 'cape-lodash'
import { SET_HEIGHT, SET_ID, SET_REM, SET_SIZE, SET_WIDTH } from './actions'

export const defaultState = {
  height: null,
  id: null,
  rem: null,
  width: null,
}

export const reducers = {
  [SET_HEIGHT]: setKey('height'),
  [SET_ID]: setKey('id'),
  [SET_REM]: setKey('rem'),
  [SET_SIZE]: merge,
  [SET_WIDTH]: setKey('width'),
}
export default createReducer(reducers, defaultState)
