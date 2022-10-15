import { combineReducers } from 'redux';
import {
    ADD_ITEM,
    CLOSE_POPUP,
    GET_ITEMS_FAILED,
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS, GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS,
    OPEN_POPUP_INGREDIENT, OPEN_POPUP_ORDER, REMOVE_ITEM, SORT_ITEMS
} from "../actions";
import {store} from "../../index";

const initialState = {
    items: [],
    currentItem: {},
    itemsRequest: false,
    itemsFailed: false,
    counter: {},
}

const popupState = {
    isOpened: false,
    type: '',
    ingredient: {},
    order: null,
    isFailed: false,
    isRequested: false,
}

const cartState = {
    addedItems: [{
        "_id": "60666c42cc7b410027a1a9b1",
        "name": "Краторная булка N-200i",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v": 0
    }],
}



const constructorReducer = (state = initialState, action) => {
   switch (action.type) {
       case GET_ITEMS_REQUEST:
           return {...state, itemsRequest: true};
       case GET_ITEMS_SUCCESS:
           action.items.forEach(element => element.counter = 1);
       return {...state, itemsRequest: false, items: action.items, counter: {}};
       case GET_ITEMS_FAILED:
           return {...state, itemsRequest: false, itemsFailed: true};
       default: return state;
   }
}


const popupReducer = (state = popupState, action) => {
    switch (action.type) {
        case OPEN_POPUP_INGREDIENT:
            return {...state, isOpened: true, ingredient: {
                name: action.ingredient.name,
                    image: action.ingredient.image,
                    calories: action.ingredient.calories,
                    carbohydrates: action.ingredient.carbohydrates,
                    proteins: action.ingredient.proteins,
                    fat: action.ingredient.fat}, type: 'ingredient' };
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
        default: return state;
    }
}


const cartReducer = (state = cartState, action) => {
    switch (action.type) {
        case ADD_ITEM:
            if (action.item.type === 'bun') {
               const newarr = state.addedItems.filter(item => item.type !== 'bun');
               newarr.unshift(action.item);
                return {...state, addedItems: [...newarr]}
            } else return {...state, addedItems: [...state.addedItems, action.item]};
        case REMOVE_ITEM:
            state.addedItems.splice(action.index, 1);
            return{...state, addedItems: [...state.addedItems]};
        case SORT_ITEMS:
            state.addedItems.splice(action.dragged, 1);
           state.addedItems.splice(action.dropped, 0, action.item);
            console.log(action.lol)
            return {...state, addedItems: [...state.addedItems]}
        default: return state;
    }
}



export const rootReducer = combineReducers({
constructorReducer, cartReducer, popupReducer
})