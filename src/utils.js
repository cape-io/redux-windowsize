import { cond, constant, debounce, flow, map, over, property, stubTrue } from 'lodash'
import { gte as maxWidth } from 'lodash/fp'
import { setRem, setSizeArr, setWidth } from './actions'

export const doc = property('document.documentElement')
export const getHeight = flow(doc, property('clientHeight'))
export const getWidth = flow(doc, property('clientWidth'))

export const createRemAction = windowObj => flow(
  doc, windowObj.getComputedStyle, property('fontSize'), setRem
)(windowObj)
export const createSizeAction = flow(over(getHeight, getWidth), setSizeArr)
export const createWidthAction = flow(getWidth, setWidth)

export function createListener(actionCreator) {
  return (dispatch, windowObj, wait = 50) => windowObj.addEventListener(
    'resize', debounce(() => dispatch(actionCreator(windowObj)), wait)
  )
}
// listenSize(dispatch, windowObj, wait = 50)
export const listenSize = createListener(createSizeAction)
export const listenWidth = createListener(createWidthAction)

export const sizeIdSelector = (biggestId, sizes) => cond(
  map(sizes, ([size, id]) => [maxWidth(size), constant(id)])
  .concat([[stubTrue, constant(biggestId)]])
)
