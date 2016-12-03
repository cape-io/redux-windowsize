import test from 'tape'
import reducer, { setHeight, setId, setRem, setSize, setWidth } from '../src'

test('setHeight', (t) => {
  t.equal(reducer(undefined, setHeight('10')).height, 10)
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
  t.end()
})
test('setWidth', (t) => {
  t.equal(reducer(undefined, setWidth('1200')).width, 1200)
  t.end()
})
