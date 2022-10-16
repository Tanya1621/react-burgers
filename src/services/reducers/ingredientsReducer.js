import {GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS} from "../actions";


const initialState = {
    items: [], currentItem: {}, itemsRequest: false, itemsFailed: false, counter: {},
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST:
            return {...state, itemsRequest: true};
        case GET_ITEMS_SUCCESS:
            action.items.forEach(element => element.counter = 0);
            return {...state, itemsRequest: false, items: action.items, counter: {}};
        case GET_ITEMS_FAILED:
            return {...state, itemsRequest: false, itemsFailed: true};
        default:
            return state;
    }
}