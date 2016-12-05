import { flow, nthArg } from 'lodash'
import { combineReducers, createStore } from 'redux'
import reducer, { REDUCER_KEY } from '../src'

export const store = createStore(combineReducers({ [REDUCER_KEY]: reducer }))

const sillyReducer = (state = { count: 0 }, { type }) => {
  if (type === 'update') return ({ count: state.count + 1 })
  return state
}
const helpMockWindowStore = createStore(sillyReducer)

export const winObj1 = {
  addEventListener: flow(nthArg(1), helpMockWindowStore.subscribe),
  document: {
    documentElement: {
      bodyFontSize: '16px',
      clientHeight: 100,
      clientWidth: 200,
    },
  },
}
export const winObj2 = {
  getComputedStyle: ({ bodyFontSize }) => ({ fontSize: bodyFontSize }),
}
export const winObj = { ...winObj1, ...winObj2 }

export function mockSizeChange(height, width) {
  winObj.document.documentElement.clientHeight = height
  winObj.document.documentElement.clientWidth = width
  return helpMockWindowStore.dispatch({ type: 'update' })
}
export function mockHeightChange(height) {
  winObj.document.documentElement.clientHeight = height
  return helpMockWindowStore.dispatch({ type: 'update' })
}
export function mockWidthChange(width) {
  winObj.document.documentElement.clientWidth = width
  return helpMockWindowStore.dispatch({ type: 'update' })
}
