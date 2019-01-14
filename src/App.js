import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { AsyncStorage } from 'react-native';
import { Cache } from 'react-native-cache';
import reducers from './reducers';
import Router from './Router';

// cached used to store case data
export const cache = new Cache({
    namespace: 'myapp',
    policy: {
        maxEntries: 50000
    },
    backend: AsyncStorage
    });


// Uncomment to clear cache

// cache.clearAll(function(err) {
//     // the whole cache is cleared now.
//     console.log('cash cleared');
// });

class App extends Component {
  
  render() {
      const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
      return (
        <Provider store={store}>
            <Router />
        </Provider>
      );
  }
}
export default App;
