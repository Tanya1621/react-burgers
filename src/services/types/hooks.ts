import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import {AppDispatch, AppThunk} from "./types";
import {RootState} from "../../index";


export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const useDispatch: () => AppDispatch | AppThunk = dispatchHook;