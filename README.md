# redux-windowsize

```javascript
import windowSize, { listenSize } from 'redux-windowsize'
const reducerIndex = {
  windowSize,
}
const reducer = combineReducers(reducerIndex)
const store = createStore(reducer)
// Dispatch an action every 100ms when window size is changing.
listenSize(store.dispatch, window, 100)
```
