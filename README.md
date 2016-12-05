# redux-windowsize

## Install

```bash
$ npm i --save lodash-humps
```

## Usage

```javascript
import windowSize, { createSizeAction, listenResize, REDUCER_KEY } from 'redux-windowsize'
const reducers = {
  [REDUCER_KEY], windowSize,
}
const reducer = combineReducers(reducerIndex)
const store = createStore(reducer)
// Update redux with current size.
store.dispatch(createSizeAction(window))
// Dispatch an action every 100ms when window size changes.
listenResize(store, window, 100)
```

For a full, working example see http://redux-windowsize.cape.io and code https://github.com/cape-io/redux-windowsize-website

## Reducer

The reducer is the default export. The following is the state managed by the reducer.

```javascript
const defaultState = {
  height: null, // 100 after setHeight(100) or setSize(100, 200) or setSizeArr([100, 200])
  heightMax: null, // adjusted any time height changes.
  id: null, // 'foo' after setId('foo')
  rem: null, // 16 after setRem('16px')
  width: null, // 200 after setWidth(200) or setSize(100, 200) or setSizeArr([100, 200])
  widthMax: null, // adjusted any time width changes.
}
```

## API

### Utility

* `listenResize(store, window, waitMs, reducerPath)` - Dispatch an action every time window size changes. Attaches `resize` eventListener to window.
* `createSizeAction(window)` - Get dimensions from window object and dispatch action.

### Selectors

All based off reducer being on reducer key `REDUCER_KEY`.

* `REDUCER_KEY`: 'windowSize'
* `getWindowSize(state)` returns state.windowSize
* `getWindowHeight` - Get current height.
* `getWindowHeightMax` - Get max height.
* `getWindowWidth` - Get current width.
* `getWindowWidthMax` - Get max width.
* `getHeightWidth` - Get height and width as an object. Uses `reselect` to memoize returned obj.
* `getHeightWidthMax` - Get height, width and max values. Uses `reselect` to memoize returned obj.
