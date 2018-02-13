import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';
import Listable from './App';
import { createStore } from "redux";
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';

import {rootReducer} from "./reducers";

const store = createStore(rootReducer);
console.log("initial state:....", store.getState());

const SELECT_LISTING = 'SELECT_LISTING';
// const listingsReducer = function(state=initialState, action) {
//     switch (action.type) {
//         case SELECT_LISTING: {
//             return {
//                 ...state,
//                 selection: [...state.selection, action.payload]
//             }
//         }
//
//         default:
//             return state;
//     }
// }


function selectListing(id) {
    return {
        type: SELECT_LISTING,
        payload: { id }
    }
}


class Root extends Component {
    render() {
        return (
            <div>
                <h1>Li-stable.app</h1>
                <Listable/>
            </div>
        );
    }
}


render(
    <Provider store={store}>
        <Root/>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();