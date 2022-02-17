import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/RootReducer';

/**
 * The Redux Store
 * This is the store that keeps track of the state.
 * 
 * Redux Thunk middleware allows you to write action creators that return a function instead of an action. 
 * The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. 
 * 
 * composeWithDevTools to enable functionality of the dev tools in the browser.
 */
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
export default createStore(rootReducer, composedEnhancer);
