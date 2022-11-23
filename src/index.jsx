import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./components/App/App";
import {Provider} from 'react-redux';
import {rootReducer} from "./services/reducers/index";
import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {HashRouter as Router} from "react-router-dom";
import {socketMiddleware} from "./services/middleware/socketMiddleware";

const wsAllOrdersUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUserOrders = 'wss://norma.nomoreparties.space/orders';

const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsAllOrdersUrl)));

export const store = createStore(rootReducer, enhancer);

const root = ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    </React.StrictMode>
);

