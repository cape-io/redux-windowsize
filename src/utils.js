import { debounce, flow, over, property } from 'lodash'
import { setRem, setSizeArr, setWidth } from './actions'

export const doc = property('document.documentElement')
export const getHeight = flow(doc, property('clientHeight'))
export const getWidth = flow(doc, property('clientWidth'))

export const createRemAction = windowObj => setRem(windowObj.getComputedStyle(doc(windowObj)))
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
