# redux-windowsize

```javascript
import windowSize, { createSizeAction, listenSize } from 'redux-windowsize'
const reducerIndex = {
  windowSize,
}
const reducer = combineReducers(reducerIndex)
const store = createStore(reducer)
// Update redux with current size.
store.dispatch(createSizeAction(window))
// Dispatch an action every 100ms when window size changes.
listenSize(store.dispatch, window, 100)
```
