import { property } from 'lodash'
import { createStructuredSelector } from 'reselect'

export const REDUCER_KEY = 'windowSize'
export const getWindowSize = property(REDUCER_KEY)
export const getWindowHeight = property([REDUCER_KEY, 'height'])
export const getWindowHeightMax = property([REDUCER_KEY, 'heightMax'])
export const getWindowWidth = property([REDUCER_KEY, 'width'])
export const getWindowWidthMax = property([REDUCER_KEY, 'widthMax'])
export const getHeightWidth = createStructuredSelector({
  height: getWindowHeight,
  width: getWindowWidth,
})
export const getHeightWidthMax = createStructuredSelector({
  height: getWindowHeight,
  heightMax: getWindowHeightMax,
  width: getWindowWidth,
  widthMax: getWindowWidthMax,
})
