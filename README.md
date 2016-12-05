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
