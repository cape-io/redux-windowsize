import { property } from 'lodash'
import { createStructuredSelector } from 'reselect'

export const REDUCER_KEY = 'windowSize'
export const getWindowSize = property(REDUCER_KEY)
export const getHeightWidth = createStructuredSelector({
  heigth: property([REDUCER_KEY, 'height']),
  width: property([REDUCER_KEY, 'width']),
})
