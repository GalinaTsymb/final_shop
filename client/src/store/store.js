import {applyMiddleware, compose, createStore} from 'redux';
import {reducer} from './reducers/index';
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

const initialState = {

};
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)));

export default store;
