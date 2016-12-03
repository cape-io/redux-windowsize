import { flow, spread } from 'lodash'
import { createAction } from 'cape-redux'

export const getNum = flow(parseFloat)

export const SET_HEIGHT = 'windowsize/SET_HEIGHT'
export const setHeight = createAction(SET_HEIGHT, getNum)

// setId('Large')
export const SET_ID = 'windowsize/SET_ID'
export const setId = createAction(SET_ID)

// setRem(16) or setRem(16px)
export const SET_REM = 'windowsize/SET_REM'
export const setRem = createAction(SET_REM, getNum)

// setSize(height, width)
export const SET_SIZE = 'windowsize/SET_SIZE'
export const setSize = createAction(SET_SIZE, (height, width) => ({ height, width }))
export const setSizeArr = spread(setSize)

export const SET_WIDTH = 'windowsize/SET_WIDTH'
export const setWidth = createAction(SET_WIDTH, getNum)
