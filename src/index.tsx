import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./components/App/App";
import {Provider} from 'react-redux';
import {rootReducer} from "./services/reducers";
import {compose, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {HashRouter as Router} from "react-router-dom";
import {socketMiddleware} from "./services/middleware/socketMiddleware";
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {PersistGate} from "redux-persist/integration/react";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const persistConfig = {
    key: 'root', storage,
}


const wsUserOrders = 'wss://norma.nomoreparties.space/orders';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUserOrders)));

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer, enhancer);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<React.StrictMode>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
                <App/>
            </Router>
        </PersistGate>
    </Provider>
</React.StrictMode>);

