import AppHeader from "../AppHeader/appHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from './App.module.css'
import {ingredientsList} from "../../utils/ingredientsList";
import {useEffect, useState} from 'react';
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import React from 'react';
import {getItems} from "../../services/actions";
import {store} from "../../index";
import {useDispatch, useSelector} from "react-redux";


const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getItems());
    }, [dispatch])

    const isVisible = useSelector(store => store.popupReducer.isOpened);
    const modalType = useSelector(store  => store.popupReducer.type);


    return (<>
        <AppHeader/>
        <main className={style.main}>
            <BurgerIngredients/>
            <BurgerConstructor />
            {isVisible && <Modal >
                {modalType === 'order' &&
                    <OrderDetails></OrderDetails>
                }
                {modalType === 'ingredient' &&
                    <IngredientDetails />
                }
            </Modal>}
        </main>
    </>)
}

export default App;