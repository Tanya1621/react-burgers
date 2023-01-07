import {getCookie} from "../../utils/cookie";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_ORDERS
} from "../actions/wsActions";
import {Middleware} from "redux";
import { RootState } from "../..";



export const socketMiddleware:any = (wsUrl: string, payload: string, wsActions: {
    start: string, success: string, error: string, getInfromation: string, close: string, closed: string
}):Middleware<{}, RootState> => {
    return store => {
        let socket: WebSocket | null = null;
        const isCommon = wsUrl.includes('/all');
        const currentToken = getCookie('accessToken');
        const token = !isCommon ? currentToken ? currentToken.substr(7) : false : false;
        return next => action => {
            const {dispatch} = store;
            const {type, isPrivate} = action;
            if (type === WS_CONNECTION_START) {
                socket = isPrivate && token ? new WebSocket(`${wsUrl}?token=${token}`) : new WebSocket(`${wsUrl}/all`);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({type: WS_CONNECTION_SUCCESS, payload: event});
                };

                socket.onerror = event => {
                    dispatch({type: WS_CONNECTION_ERROR, payload: event});
                };

                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData = JSON.parse(data);
                    dispatch({
                        type: WS_GET_ORDERS,
                        orders: parsedData.orders,
                        total: parsedData.total,
                        today: parsedData.totalToday
                    });
                };

                if (type === WS_CONNECTION_CLOSED) {
                    socket.close();
                }

                socket.onclose = event => {
                    dispatch({type: WS_CONNECTION_CLOSED, payload: event});
                };

            }

            next(action);
        };
    };
};