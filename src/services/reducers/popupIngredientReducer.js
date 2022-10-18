import {
    CLOSE_POPUP, GET_ORDER_FAILED, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, OPEN_POPUP_INGREDIENT, OPEN_POPUP_ORDER
} from "../actions";


const initialState = {
    isOpened: false, ingredient: {},
}


export const popupIngredientReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_POPUP_INGREDIENT:
            return {
                ...state, isOpened: true, ingredient: {
                    name: action.ingredient.name,
                    image: action.ingredient.image,
                    calories: action.ingredient.calories,
                    carbohydrates: action.ingredient.carbohydrates,
                    proteins: action.ingredient.proteins,
                    fat: action.ingredient.fat
                }, type: 'ingredient'
            };
        case CLOSE_POPUP:
            return {...state, isOpened: false, ingredient: {}, order: null, type: ''};
        default:
            return state;
    }
}