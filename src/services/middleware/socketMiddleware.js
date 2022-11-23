import {getCookie} from "../../utils/cookie";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS
} from "../actions/wsActions";

export const socketMiddleware = (wsUrl) => {
    return store => {
        let socket = null;
        const token = wsUrl.includes('/all') ? false : getCookie('accessToken');
        return next => action => {
            const { dispatch} = store;
            const { type, payload } = action;
            if (type === WS_CONNECTION_START) {
                socket = token? new WebSocket(`${wsUrl}?token=${token}`) : new WebSocket(wsUrl);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: WS_CONNECTION_SUCCESS, payload: event });
                };

                socket.onerror = event => {
                    dispatch({ type: WS_CONNECTION_ERROR, payload: event });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    dispatch({ type: WS_GET_ORDERS, orders: parsedData.orders });
                };

                if (type === WS_CONNECTION_CLOSED) {
                    socket.close();
                }

                    socket.onclose = event => {
                    dispatch({ type: WS_CONNECTION_CLOSED, payload: event });
                };

            }

            next(action);
        };
    };
};