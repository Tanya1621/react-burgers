import {combineReducers} from 'redux';
import {ingredientsReducer} from "./ingredientsReducer";
import {cartReducer} from "./cartReducer";
import {popupIngredientReducer} from "./popupIngredientReducer";
import {popupOrderReducer} from "./popupOrder";
import {authReducer} from "./authReducer";
import {ordersReducer} from "./ordersReducer";

export const rootReducer = combineReducers({
    ingredientsReducer, cartReducer, popupIngredientReducer, popupOrderReducer, authReducer, ordersReducer
})