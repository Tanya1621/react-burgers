import {ADD_ITEM, REMOVE_ITEM, SORT_ITEMS} from "../actions";
import {IAddItem, IRemoveItem, ISortItems, TIngredient} from "../types/types";

type TCartInitialState = {
    addedItems: Array<TIngredient>,
}

const initialState: TCartInitialState = {
    addedItems: [],
}

export type TCartReducer = IAddItem | IRemoveItem | ISortItems

export const cartReducer = (state = initialState, action: TCartReducer) => {
    switch (action.type) {
        case ADD_ITEM:
            if (action.item.type === 'bun') {
                const newArr = state.addedItems.filter(item => item.type !== 'bun');
                newArr.unshift(action.item);
                return {...state, addedItems: [...newArr]}
            } else {
                action.item.uuid = action.uuid;
                return {...state, addedItems: [...state.addedItems, action.item]};
            }
        case REMOVE_ITEM:
            state.addedItems.splice(action.index, 1);
            return {...state, addedItems: [...state.addedItems]};
        case SORT_ITEMS:
            state.addedItems.splice(action.dragged, 1);
            state.addedItems.splice(action.dropped, 0, action.item);
            return {...state, addedItems: [...state.addedItems]}
        default:
            return state;
    }
}