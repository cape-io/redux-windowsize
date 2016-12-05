import { eq } from 'lodash'
import { createReducer } from 'cape-redux'
import { setKey } from 'cape-lodash'
import { SET_HEIGHT, SET_ID, SET_REM, SET_SIZE, SET_WIDTH } from './actions'

export const defaultState = {
  height: null,
  heightMax: null,
  id: null,
  rem: null,
  width: null,
  widthMax: null,
}
export function setDimension(id) {
  const maxKey = `${id}Max`
  return (state, payload) => {
    if (eq(state[id], payload)) return state
    return { ...state, [id]: payload, [maxKey]: Math.max(state[maxKey] || 0, payload) }
  }
}
export const heightReducer = setDimension('height')
export const widthReducer = setDimension('width')
export const sizeReducer = (state, { width, height }) => heightReducer(
  widthReducer(state, width), height
)

export const reducers = {
  [SET_HEIGHT]: heightReducer,
  [SET_ID]: setKey('id'),
  [SET_REM]: setKey('rem'),
  [SET_SIZE]: sizeReducer,
  [SET_WIDTH]: widthReducer,
}
export default createReducer(reducers, defaultState)
