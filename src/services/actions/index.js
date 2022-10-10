import {getItemsRequest} from "../api";
import {useDispatch} from "react-redux";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const OPEN_POPUP_INGREDIENT = 'OPEN_POPUP_INGREDIENT';
export const CLOSE_POPUP_INGREDIENT = 'CLOSE_POPUP_INGREDIENT';
export const OPEN_POPUP_ORDER = 'OPEN_POPUP_ORDER';
export const CLOSE_POPUP_ORDER = 'CLOSE_POPUP_ORDER';

export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'ADD_ITEM'



function getItems() {
    return function (dispatch) {
        dispatch({type: GET_ITEMS_REQUEST})
        getItemsRequest().then(res => {
            res.json();
        }).then(res => {
            if (res && res.ok) {
                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    items: res.data,
                })
            } else {
                dispatch({
                    type: GET_ITEMS_FAILED,
                    items: res.data,
                })
            }
        }).catch(error=> console.log(error));
    }
}
