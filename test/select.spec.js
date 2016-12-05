import test from 'tape'

import {
  getWindowSize, getHeightWidth, getWindowHeight, getWindowWidth, getHeightWidthMax,
  reset, setId, setSize, setHeight, setWidth,
} from '../src'
import { defaultState } from '../src/reducer'
import { store } from './mock'

const { dispatch, getState } = store
test('getWindowSize', (t) => {
  t.equal(getWindowSize(getState()), defaultState)
  dispatch(reset())
  t.equal(getWindowSize(getState()), defaultState)
  t.end()
})
test('getWindowHeight', (t) => {
  t.equal(getWindowHeight(getState()), null)
  dispatch(setHeight(10))
  t.equal(getWindowHeight(getState()), 10)
  dispatch(reset())
  t.end()
})
test('getWindowWidth', (t) => {
  t.equal(getWindowWidth(getState()), null)
  dispatch(setWidth(20))
  t.equal(getWindowWidth(getState()), 20)
  dispatch(reset())
  t.end()
})
test('getHeightWidth', (t) => {
  const res = getHeightWidth(getState())
  t.deepEqual(res, { height: null, width: null })
  dispatch(setId('big'))
  t.equal(getHeightWidth(getState()), res)
  dispatch(setSize(10, 20))
  t.deepEqual(getHeightWidth(getState()), { height: 10, width: 20 })
  dispatch(reset())
  t.end()
})
test('getHeightWidthMax', (t) => {
  const res = getHeightWidthMax(getState())
  t.deepEqual(res, { height: null, heightMax: null, width: null, widthMax: null })
  dispatch(setHeight(10))
  t.deepEqual(getHeightWidthMax(getState()),
    { height: 10, heightMax: 10, width: null, widthMax: null }
  )
  dispatch(setHeight(12))
  t.deepEqual(getHeightWidthMax(getState()),
    { height: 12, heightMax: 12, width: null, widthMax: null }
  )
  dispatch(setHeight(8))
  t.deepEqual(getHeightWidthMax(getState()),
    { height: 8, heightMax: 12, width: null, widthMax: null }
  )
  dispatch(setWidth(20))
  t.deepEqual(getHeightWidthMax(getState()),
    { height: 8, heightMax: 12, width: 20, widthMax: 20 }
  )
  dispatch(setWidth(22))
  t.deepEqual(getHeightWidthMax(getState()),
    { height: 8, heightMax: 12, width: 22, widthMax: 22 }
  )
  dispatch(setWidth(19))
  const ste = getHeightWidthMax(getState())
  t.deepEqual(ste,
    { height: 8, heightMax: 12, width: 19, widthMax: 22 }
  )
  dispatch(setId('small'))
  t.equal(getHeightWidthMax(getState()), ste)
  t.end()
})
