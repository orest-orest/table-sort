import {combineReducers, createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from "redux-thunk";
import {MainReducer} from '../reducers/mainReducer'

const reducers = combineReducers({
    dataList: MainReducer
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

export default store
