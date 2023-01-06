import {
    CLOSE_POPUP, GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, OPEN_POPUP_INGREDIENT, OPEN_POPUP_ORDER
} from "../actions";
import {
    IClosePopup,
    IGetItemsFailedAction,
    IGetOrderFailedAction,
    IGetOrderRequestAction,
    IGetOrderSuccessAction,
    IOpenPopupIngredient,
    IOpenPopupOrder,
    TIngredient,
    TOrder
} from "../../pages/types";

type TPopupOrderInitialState = {
    isOpened: boolean, order: null | TOrder, isFailed: boolean, isRequested: boolean,
}
const initialState: TPopupOrderInitialState = {
    isOpened: false, order: null, isFailed: false, isRequested: false,
}

export type TPopupOpenReducer = IOpenPopupOrder | IGetOrderRequestAction | IGetOrderSuccessAction | IGetOrderFailedAction | IClosePopup

export const popupOrderReducer = (state = initialState, action: TPopupOpenReducer) => {
    switch (action.type) {
        case OPEN_POPUP_ORDER:
            return {...state, isOpened: true, type: 'order'};
        case GET_ORDER_REQUEST:
            return {...state, isRequested: true};
        case GET_ORDER_SUCCESS:
            return {...state, order: action.order, isRequested: false, isOpened: true, type: 'order'};
        case GET_ORDER_FAILED:
            return {...state, isRequested: false, isFailed: true}
        case CLOSE_POPUP:
            return {...state, isOpened: false, ingredient: {}, order: null, type: ''};
        default:
            return state;
    }
}