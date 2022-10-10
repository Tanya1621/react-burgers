import { combineReducers } from 'redux';
import {
    ADD_ITEM,
    CLOSE_POPUP_INGREDIENT, CLOSE_POPUP_ORDER,
    GET_ITEMS_FAILED,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    OPEN_POPUP_INGREDIENT, OPEN_POPUP_ORDER, REMOVE_ITEM
} from "../actions";

const initialState = {
    items: [],
    addedItems: [],
    currentItem: {},
    order: {},
    itemsRequest: false,
    itemsFailed: false,
}

const popupState = {
    isOpened: false,
    type: '',
    ingredient: {},
    order: null,
}

const cartState = {
    addedItems: [],
}



const constructorReducer = (state = initialState, action) => {
   switch (action.type) {
       case GET_ITEMS_REQUEST:
           return {...state, itemsRequest: true};
       case GET_ITEMS_SUCCESS:
       return {...state, itemsRequest: false, items: action.items};
       case GET_ITEMS_FAILED:
           return {...state, itemsRequest: false, itemsFailed: true};
       default: return state;
   }
}

const popupReducer = (state = popupState, action) => {
    switch (action.type) {
        case OPEN_POPUP_INGREDIENT:
            return {...state, isOpened: true, ingredient: action.item, type: 'ingredient' };
        case OPEN_POPUP_ORDER:
            return {...state, isOpened: true, type: 'order', order: action.order };
        case CLOSE_POPUP_INGREDIENT:
            return {...state, isOpened: false, ingredient: {}, type: ''};
        case CLOSE_POPUP_ORDER:
            return {...state, isOpened: false, order: null, type: '' }
        default: return state;
    }
}


const cartReducer = (state = cartState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            return{...state, addedItems: cartState.addedItems.push(action.item)};
        case REMOVE_ITEM:
            return{...state, addedItems: cartState.addedItems.filter((item) => item.id !== action.item.id)};
        default: return state;
    }
}


export const rootReducer = combineReducers({
constructorReducer, cartReducer, popupReducer
})