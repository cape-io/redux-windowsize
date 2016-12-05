import { spread } from 'lodash'
import { createSimpleAction, noopAction } from 'cape-redux'

export const SET_HEIGHT = 'windowsize/SET_HEIGHT'
export const setHeight = createSimpleAction(SET_HEIGHT)

// setId('Large')
export const SET_ID = 'windowsize/SET_ID'
export const setId = createSimpleAction(SET_ID)

// setRem(16) or setRem(16px)
export const SET_REM = 'windowsize/SET_REM'
export const setRem = createSimpleAction(SET_REM, parseFloat)

// setSize(height, width)
export const SET_SIZE = 'windowsize/SET_SIZE'
export const setSize = createSimpleAction(SET_SIZE, (height, width) => ({ height, width }))
export const setSizeArr = spread(setSize)

export const SET_WIDTH = 'windowsize/SET_WIDTH'
export const setWidth = createSimpleAction(SET_WIDTH)

export const RESET = 'windowsize/RESET'
export const reset = noopAction(RESET)
