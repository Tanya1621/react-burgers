import React from "react";
import PropTypes from "prop-types";
import {
    ADD_ITEM, AUTHORIZATION_FAILED, AUTHORIZATION_REQUEST, AUTHORIZATION_SUCCESS,
    CLOSE_POPUP,
    DECREASE_COUNTER,
    GET_ITEMS_FAILED,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ORDER_FAILED,
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    INCREASE_COUNTER, LOGOUT_FAILED, LOGOUT_REQUEST, LOGOUT_SUCCESS,
    OPEN_POPUP_INGREDIENT,
    OPEN_POPUP_ORDER,
    REGISTRATION_FAILED,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REMOVE_ITEM,
    SORT_ITEMS,
    UPDATE_AUTH,
    UPDATE_USER_INFO
} from "../actions";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS, WS_GET_ORDERS
} from "../actions/wsActions";
import {RootState, store} from "../../index";
import {TAuthActions} from "../reducers/authReducer";
import {TCartReducer} from "../reducers/cartReducer";
import {TIngredientsReducer} from "../reducers/ingredientsReducer";
import {TPopupIngredientReducer} from "../reducers/popupIngredientReducer";
import {TPopupOpenReducer} from "../reducers/popupOrder";
import {TWsReducer} from "../reducers/wsReducer";
import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';

export type TChildren = {
    children: React.ReactElement | React.ReactElement[],
    path: string,
}

export type TIngredient = {
    _id: string,
    id?: string,
    name: string,
    type: string,
    proteins: number,
    fat: number,
    carbohydrates: number,
    calories: number,
    price: number,
    image: string,
    image_large: string,
    image_mobile: string,
    uuid?: string,
    counter: number
}

export type TUser = {
    name: string,
    email: string
}


export type TOrder = {
    ingredients: string[],
    _id: string,
    status: string,
    createdAt: string,
    updatedAt: string
}


//actions

//ingredientReducer
export interface IGetItemsRequestAction {
    readonly type: typeof GET_ITEMS_REQUEST;

}

export interface IGetItemsSuccessAction {
    readonly type: typeof GET_ITEMS_SUCCESS;
    readonly items: TIngredient[];
}

export interface IGetItemsFailedAction {
    readonly type: typeof GET_ITEMS_FAILED;
}

export interface IIncreaseCounter {
    readonly type: typeof INCREASE_COUNTER;
    readonly ingredient: TIngredient;
}

export interface IDecreaseCounter {
    readonly type: typeof DECREASE_COUNTER;
    readonly ingredient: TIngredient;
}

//cartReducer
export interface IAddItem {
    readonly type: typeof ADD_ITEM;
    readonly item: TIngredient;
    readonly uuid: string
}

export interface IRemoveItem {
    readonly type: typeof REMOVE_ITEM;
    readonly ingredient: TIngredient;
    readonly index: number
}

export interface ISortItems {
    readonly type: typeof SORT_ITEMS
    readonly item: TIngredient;
    readonly dragged: number;
    readonly dropped: number;
}


//popupIngrReducer
export interface IOpenPopupIngredient {
    readonly type: typeof OPEN_POPUP_INGREDIENT;
    readonly ingredient: TIngredient;
}

export interface IClosePopup {
    readonly type: typeof CLOSE_POPUP;
}

//popupOrderReducer
export interface IOpenPopupOrder {
    readonly type: typeof OPEN_POPUP_ORDER;
}

export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
    readonly type: typeof GET_ORDER_SUCCESS;
    readonly order: TOrder;

}

export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

//registration
export interface IUpdateUserInfoAction {
    readonly type: typeof UPDATE_USER_INFO;
    readonly user: TUser
}

export interface IUpdateAuthAction {
    readonly type: typeof UPDATE_AUTH;
    readonly user: TUser
}


export interface IRegistrationRequestAction {
    readonly type: typeof REGISTRATION_REQUEST
}

export interface IRegistrationSuccessAction {
    readonly type: typeof REGISTRATION_SUCCESS;
    readonly user: TUser;
    readonly token: string;
    readonly refreshToken: string
}

export interface IRegistrationFailedAction {
    readonly type: typeof REGISTRATION_FAILED
}


export interface IAuthorisationRequest {
    readonly type: typeof AUTHORIZATION_REQUEST
}


export interface IAuthorizationSuccessAction {
    readonly type: typeof AUTHORIZATION_SUCCESS;
    readonly user: TUser;
    readonly token: string;
    readonly refreshToken: string
}

export interface IAuthorisationFailed {
    readonly type: typeof AUTHORIZATION_FAILED
}


export interface ILogoutSuccess {
    readonly type: typeof LOGOUT_SUCCESS
}

export interface ILogoutRequest {
    readonly type: typeof LOGOUT_REQUEST
}

export interface ILogoutFailed {
    readonly type: typeof LOGOUT_FAILED
}


export interface IWSConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START
}

export interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR
}

export interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWSGetOrders {
    readonly type: typeof WS_GET_ORDERS;
    orders: Array<TOrder>,
    total: number,
    today: number,
}

// export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
// export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
// export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
// export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
// export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';

export type AppDispatch = typeof store.dispatch;

export type TActions =
    TAuthActions
    | TCartReducer
    | TIngredientsReducer
    | TPopupIngredientReducer
    | TPopupOpenReducer
    | TWsReducer;

export type AppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, RootState, TActions>>;

