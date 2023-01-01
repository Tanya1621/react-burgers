import {DECREASE_COUNTER, GET_ITEMS_FAILED, GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, INCREASE_COUNTER} from "../actions";
import {bun} from "../../utils/constants";
import {
    IDecreaseCounter,
    IGetItemsFailedAction,
    IGetItemsRequestAction,
    IGetItemsSuccessAction,
    IIncreaseCounter,
    TIngredient
} from "../../pages/types";


type TIngredientsInitialState = {
    items: Array<TIngredient> | [],
    currentItem: TIngredient | {},
    itemsRequest: boolean,
    itemsFailed: boolean
}
const initialState: TIngredientsInitialState = {
    items: [], currentItem: {}, itemsRequest: false, itemsFailed: false,
}

type TIngredientsReducer =
    IGetItemsRequestAction
    | IGetItemsSuccessAction
    | IGetItemsFailedAction
    | IIncreaseCounter
    | IDecreaseCounter

export const ingredientsReducer = (state = initialState, action: TIngredientsReducer) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST:
            return {...state, itemsRequest: true};
        case GET_ITEMS_SUCCESS:
            return {
                ...state, itemsRequest: false, items: action.items.map(el => {
                    return {...el, counter: 0}
                })
            };
        case GET_ITEMS_FAILED:
            return {...state, itemsRequest: false, itemsFailed: true};
        case INCREASE_COUNTER:
            if (action.ingredient.type === bun) {
                return {
                    ...state,
                    items: [...state.items].map(el => el._id === action.ingredient._id ? {...el, counter: 2} : el)
                }
            } else return {
                ...state,
                items: [...state.items].map(el => el._id === action.ingredient._id ? {
                    ...el,
                    counter: el.counter + 1
                } : el)
            }
        case DECREASE_COUNTER:
            if (action.ingredient.type === bun) {
                return {
                    ...state,
                    items: [...state.items].map(el => el._id === action.ingredient._id ? {...el, counter: 0} : el)
                }
            } else return {
                ...state,
                items: [...state.items].map(el => el._id === action.ingredient._id ? {
                    ...el,
                    counter: el.counter - 1
                } : el)
            }
        default:
            return state;
    }
}