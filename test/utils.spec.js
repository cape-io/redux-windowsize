import test from 'tape'
import { delay } from 'lodash'
import {
  createHeightAction, createListener, createRemAction, createSizeAction,
  createWidthAction, doc, getHeight, getRem, getWidth,
  listenHeight, listenResize, listenSize, listenWidth,
} from '../src'
import { mockSizeChange, store, winObj } from './mock'

test('doc', (t) => {
  t.equal(doc(winObj), winObj.document.documentElement)
  t.end()
})
test('getHeight', (t) => {
  t.equal(getHeight(winObj), winObj.document.documentElement.clientHeight)
  t.end()
})
test('getWidth', (t) => {
  t.equal(getWidth(winObj), winObj.document.documentElement.clientWidth)
  t.end()
})
test('getRem', (t) => {
  t.equal(getRem(winObj), '16px')
  t.end()
})
test('createRemAction', (t) => {
  t.deepEqual(createRemAction(winObj), { payload: 16, type: 'windowsize/SET_REM' })
  t.end()
})
test('createHeightAction', (t) => {
  t.deepEqual(createHeightAction(winObj), { payload: 100, type: 'windowsize/SET_HEIGHT' })
  t.end()
})
test('createSizeAction', (t) => {
  const sizeAct = { payload: { height: 100, width: 200 }, type: 'windowsize/SET_SIZE' }
  t.deepEqual(
    createSizeAction(winObj),
    sizeAct
  )
  t.end()
})
test('createWidthAction', (t) => {
  t.deepEqual(createWidthAction(winObj), { payload: 200, type: 'windowsize/SET_WIDTH' })
  t.end()
})
test('createListener', (t) => {
  t.plan(2)
  const func = createListener(createSizeAction)
  t.equal(typeof func, 'function')
  const sizeAct = { payload: { height: 110, width: 220 }, type: 'windowsize/SET_SIZE' }
  const disp = act => t.deepEqual(act, sizeAct)
  const unsub = func(disp, winObj) // using redux to mock window functionality.
  // test debounce
  mockSizeChange(101, 202)
  mockSizeChange(111, 222)
  // Final size expected
  mockSizeChange(110, 220)
  unsub() // unsub from redux.
})
test('listenSize', (t) => {
  t.plan(1)
  const sizeAct = { payload: { height: 111, width: 222 }, type: 'windowsize/SET_SIZE' }
  const disp = act => t.deepEqual(act, sizeAct)
  const unsub = listenSize(disp, winObj) // using redux to mock window functionality.
  mockSizeChange(101, 202)
  mockSizeChange(110, 220)
  mockSizeChange(111, 222)
  unsub() // unsub from redux.
})
test('listenHeight', (t) => {
  t.plan(1)
  const expectedAction = { payload: 123, type: 'windowsize/SET_HEIGHT' }
  const disp = act => t.deepEqual(act, expectedAction)
  const unsub = listenHeight(disp, winObj) // using redux to mock window functionality.
  mockSizeChange(101, 202)
  mockSizeChange(110, 220)
  mockSizeChange(123, 222)
  unsub() // unsub from redux.
})
test('listenWidth', (t) => {
  t.plan(1)
  const expectedAction = { payload: 234, type: 'windowsize/SET_WIDTH' }
  const disp = act => t.deepEqual(act, expectedAction)
  const unsub = listenWidth(disp, winObj) // using redux to mock window functionality.
  mockSizeChange(101, 202)
  mockSizeChange(110, 220)
  mockSizeChange(123, 234)
  unsub() // unsub from redux.
})
test('listenResize', (t) => {
  t.plan(3)
  const actions = [
    { payload: { height: 200, width: 400 }, type: 'windowsize/SET_SIZE' },
    { payload: 210, type: 'windowsize/SET_HEIGHT' },
    { payload: 800, type: 'windowsize/SET_WIDTH' },
  ]
  const dispatch = (act) => { t.deepEqual(act, actions.shift()); store.dispatch(act) }
  listenResize({ ...store, dispatch }, winObj, 5)
  mockSizeChange(200, 400)
  delay(mockSizeChange, 10, 210, 400)
  delay(mockSizeChange, 20, 210, 800)
})
