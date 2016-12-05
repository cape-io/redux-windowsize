import { cond, constant, debounce, flow, get, map, over, property, stubTrue } from 'lodash'
import { gte as maxWidth } from 'lodash/fp'
import { setRem, setSize, setSizeArr, setHeight, setWidth } from './actions'

export const doc = property('document.documentElement')
export const getHeight = flow(doc, property('clientHeight'))
export const getWidth = flow(doc, property('clientWidth'))
export const getRem = windowObj => flow(
  doc, windowObj.getComputedStyle, property('fontSize')
)(windowObj)

export const createRemAction = flow(getRem, setRem)
export const createHeightAction = flow(getHeight, setHeight)
export const createSizeAction = flow(over(getHeight, getWidth), setSizeArr)
export const createWidthAction = flow(getWidth, setWidth)

export function createListener(actionCreator) {
  return (dispatch, windowObj, wait = 50) => windowObj.addEventListener(
    'resize', debounce(() => dispatch(actionCreator(windowObj)), wait)
  )
}
// listenSize(dispatch, windowObj, 50)
export const listenSize = createListener(createSizeAction)
export const listenHeight = createListener(createHeightAction)
export const listenWidth = createListener(createWidthAction)

export function listenResize({ dispatch, getState }, windowObj, wait, reducerPath = 'windowSize') {
  function actionCreator(windowObject) {
    const state = get(getState(), reducerPath)
    const height = getHeight(windowObject)
    const width = getWidth(windowObject)
    if (state.height === height) return setWidth(width)
    if (state.width === width) return setHeight(height)
    return setSize(height, width)
  }
  return createListener(actionCreator)(dispatch, windowObj, wait)
}

export const sizeIdSelector = (biggestId, sizes) => cond(
  map(sizes, ([size, id]) => [maxWidth(size), constant(id)])
  .concat([[stubTrue, constant(biggestId)]])
)
