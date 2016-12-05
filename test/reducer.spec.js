import test from 'tape'
import { isFunction } from 'lodash'
import reducer, { setHeight, setId, setRem, setSize, setWidth, reset } from '../src'
import { defaultState, setDimension } from '../src/reducer'

test('setDimension', (t) => {
  const func = setDimension('rem')
  t.ok(isFunction(func))
  t.equal(func(defaultState, null), defaultState)
  const res = func(defaultState, 10)
  t.equal(res.rem, 10)
  t.equal(res.remMax, 10)
  t.equal(func(res, 10), res)
  const res2 = func(res, 8)
  t.equal(res2.rem, 8)
  t.equal(res2.remMax, 10)
  t.end()
})
test('setHeight', (t) => {
  t.equal(reducer(undefined, setHeight(10)).height, 10)
  t.end()
})
test('setId', (t) => {
  t.equal(reducer(undefined, setId('Large')).id, 'Large')
  t.end()
})
test('setRem', (t) => {
  t.equal(reducer(undefined, setRem('12px')).rem, 12)
  t.end()
})
test('setSize', (t) => {
  const state = reducer(undefined, setSize(800, 900))
  t.equal(state.height, 800)
  t.equal(state.width, 900)
  t.equal(reducer(state, setSize(800, 900)), state)
  t.end()
})
test('setWidth', (t) => {
  t.equal(reducer(undefined, setWidth('1200')).width, '1200')
  t.end()
})
test('reset', (t) => {
  t.equal(reducer({}, reset()), defaultState)
  t.equal(reducer(undefined, reset()), defaultState)
  t.equal(reducer({ ...defaultState }, reset()), defaultState)
  t.end()
})
