import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_SUCCESS, WS_GET_ORDERS
} from "../actions/wsActions";
import {
    IWSConnectionClosed,
    IWSConnectionError,
    IWSConnectionStart,
    IWSConnectionSuccess, IWSGetOrders,
    TOrder
} from "../../pages/types";

type TWsInitialState = {
    isConnected: boolean,
    orders: [] | Array<TOrder>,
    isFailed: boolean,
    total: null | number,
    today: null | number,
}
const initialState: TWsInitialState = {
    isConnected: false,
    orders: [],
    isFailed: false,
    total: null,
    today: null
}

type TWsReducer = IWSConnectionSuccess | IWSConnectionClosed| IWSConnectionError| IWSGetOrders

export const wsReducer = (state = initialState, action: TWsReducer) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {...state, isConnected: true};
        case WS_CONNECTION_ERROR:
            return {...state, isConnected: false, isFailed: true};
        case WS_CONNECTION_CLOSED:
            return {...state, isConnected: false, isFailed: false, orders: []};
        case WS_GET_ORDERS:
            return {...state, orders: action.orders, total: action.total, today: action.today};
        default:
            return state;
    }
}