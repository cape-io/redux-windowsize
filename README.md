# redux-windowsize

## Install

```bash
$ npm i --save redux-windowsize
```

## Usage

```javascript
import windowSize, { createRemAction, createSizeAction, listenResize, REDUCER_KEY } from 'redux-windowsize'
const reducers = {
  [REDUCER_KEY], windowSize,
}
const reducer = combineReducers(reducerIndex)
const store = createStore(reducer)
// Update redux with current size.
store.dispatch(createSizeAction(window))
store.dispatch(createRemAction(window))
// Dispatch an action every 100ms when window size changes.
listenResize(store, window, 100)
```

For a full, working example see http://redux-windowsize.cape.io and code https://github.com/cape-io/redux-windowsize-website


## API

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
### Actions

* `setSize(height, width)` - Accepts numbers.
* `setSizeArr([height, width])` - Same as above but accepts a single argument with height, width as an array.
* `setHeight(height)`
* `setWidth(width)`
* `setRem('16px')` First argument sent to `parseFloat`.
* `reset()` - Brings reducer back to its defaultState.
* `setId(any)` - If you want to define a single size related value. Maybe it's a string that is unique to a size range.

### Utility

* `listenResize(store, window, waitMs, reducerPath)` - Dispatch an action every time window size changes. Attaches `resize` eventListener to window. Will dispatch one of `setSize`, `setWidth`, `setHeight`.
* `createSizeAction(window)` - Get dimensions from window object and dispatch action.
* `listenSize(dispatch, window, waitMs)` - Similar to `listenResize` but always dispatches `setSize`. Possibly faster since it doesn't check store state and compare values before the dispatch.
* `listenHeight(dispatch, window, waitMs)` - If you only care about listening to height changes.
* `listenWidth(dispatch, window, waitMs)` - If you only care about width changes.
* `createRemAction(window)` Create a `setRem` action based on result of the documentElement font size.

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
