import {getItemsRequest, getOrderRequest} from "../api";
import {useDispatch} from "react-redux";
import {store} from "../../index";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS ='GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const OPEN_POPUP_INGREDIENT = 'OPEN_POPUP_INGREDIENT';
export const OPEN_POPUP_ORDER = 'OPEN_POPUP_ORDER';
export const CLOSE_POPUP = 'CLOSE_POPUP';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SORT_ITEMS = 'SORT_ITEMS';



export function getItems() {
    return function (dispatch) {
        dispatch({
            type: GET_ITEMS_REQUEST
        });

        getItemsRequest().then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    items: res.data
                })
            } else {
                dispatch({type: GET_ITEMS_FAILED})
            }
        })
    }
}

export function makeNewOrder(ingredients) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        getOrderRequest(ingredients).then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    order: res.order.number,
                })

            } else {
                dispatch({type: GET_ORDER_FAILED})
            }
        })
    }
}
