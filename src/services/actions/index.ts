import {
    getItemsRequest,
    getOrderRequest,
    registerRequest,
    logoutRequest,
    authRequest,
    updateInfoRequest,
    refreshTokenRequest
} from "../api";
import {useDispatch} from "react-redux";
import {store} from "../../index";
import {deleteCookie, setCookie} from "../../utils/cookie";
import {AppDispatch, AppThunk} from "../../services/types/types";

export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export const OPEN_POPUP_INGREDIENT: 'OPEN_POPUP_INGREDIENT' = 'OPEN_POPUP_INGREDIENT';
export const OPEN_POPUP_ORDER: 'OPEN_POPUP_ORDER' = 'OPEN_POPUP_ORDER';
export const CLOSE_POPUP: 'CLOSE_POPUP' = 'CLOSE_POPUP';

export const ADD_ITEM: 'ADD_ITEM' = 'ADD_ITEM';
export const REMOVE_ITEM: 'REMOVE_ITEM' = 'REMOVE_ITEM';
export const SORT_ITEMS: 'SORT_ITEMS' = 'SORT_ITEMS';

export const INCREASE_COUNTER: 'INCREASE_COUNTER' = 'INCREASE_COUNTER';
export const DECREASE_COUNTER: 'DECREASE_COUNTER' = 'DECREASE_COUNTER';

export const REGISTRATION_REQUEST: 'REGISTRATION_REQUEST' = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS: 'REGISTRATION_SUCCESS' = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED: 'REGISTRATION_FAILED' = 'REGISTRATION_FAILED';

export const AUTHORIZATION_REQUEST: 'AUTHORIZATION_REQUEST' = 'AUTHORIZATION_REQUEST';
export const AUTHORIZATION_SUCCESS: 'AUTHORIZATION_SUCCESS' = 'AUTHORIZATION_SUCCESS';
export const AUTHORIZATION_FAILED: 'AUTHORIZATION_FAILED' = 'AUTHORIZATION_FAILED';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const UPDATE_USER_INFO: 'UPDATE_USER_INFO' = 'UPDATE_USER_INFO';

export const UPDATE_AUTH: 'UPDATE_AUTH' = 'UPDATE_AUTH';





export const getItems: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ITEMS_REQUEST
        });

        getItemsRequest().then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_ITEMS_SUCCESS, items: res.data
                })
            } else {
                dispatch({type: GET_ITEMS_FAILED})
            }
        }).catch(() => dispatch({type: GET_ITEMS_FAILED}))
    }
}

export const makeNewOrder: AppThunk = (ingredients: string[]) => {
    return function (dispatch: AppDispatch) {
        console.log('requested')
        dispatch({
            type: GET_ORDER_REQUEST
        });
        getOrderRequest(ingredients).then(res => {
            if (res && res.success) {
                dispatch({
                    type: GET_ORDER_SUCCESS, order: res.order.number,
                })

            } else {
                dispatch({type: GET_ORDER_FAILED})
            }
        }).catch(() => dispatch({type: GET_ORDER_FAILED}))
    }
}

//to register

export const register: AppThunk = (email: string, password: string, name: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: REGISTRATION_REQUEST
        })
        registerRequest(email, password, name).then(res => {

            if (res && res.success) {
                dispatch({
                    type: REGISTRATION_SUCCESS, user: {email: res.user.email, name: res.user.name}, token: res.accessToken, refreshToken: res.refreshToken
                })
                setCookie('accessToken', res.accessToken);
                setCookie('refreshToken', res.refreshToken);

            } else {
                dispatch({type: REGISTRATION_FAILED})
            }
        }).catch(() => dispatch({type: REGISTRATION_FAILED}))
    }
}

// to logout
export const logout: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGOUT_REQUEST,
        })
        logoutRequest().then(res => {
            if (res && res.success) {

                dispatch({
                    type: LOGOUT_SUCCESS,
                })
                deleteCookie('accessToken');
                deleteCookie('refreshToken');

            } else {
                dispatch({type: LOGOUT_FAILED})
            }
        }).catch(() => dispatch({type: LOGOUT_FAILED}))
    }
}


export const authorization: AppThunk = (email: string, password: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: AUTHORIZATION_REQUEST
        })
        authRequest(email, password).then(res => {

            if (res && res.success) {
                dispatch({
                    type: AUTHORIZATION_SUCCESS, user: {email: res.user.email, name: res.user.name}, token: res.accessToken, refreshToken: res.refreshToken
                })
                setCookie('accessToken', res.accessToken);
                setCookie('refreshToken', res.refreshToken);

            } else {
                dispatch({type: AUTHORIZATION_FAILED})
            }
        }).catch(() => dispatch({type: AUTHORIZATION_FAILED}))
    }
}

export const updateUserInfo: AppThunk = (email: string, password: string, name: string) => {
    return function (dispatch: AppDispatch) {
        updateInfoRequest(email, password, name).then(res => {
            if (res && res.success) {
            dispatch({type: UPDATE_USER_INFO, user: {name: name, email: email}})
        } else {
                refreshTokenRequest().then(res => {
                    if (res && res.success) {
                        setCookie('accessToken', res.accessToken);
                        setCookie('refreshToken', res.refreshToken);
                    }
                })
            }
        })
    }
}


