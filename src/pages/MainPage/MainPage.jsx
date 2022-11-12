import AppHeader from "../../components/AppHeader/appHeader";
import style from "../../components/App/App.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {getItems} from "../../services/actions";
import {Route} from "react-router-dom";
import {ProfilePage} from "../ProfilePage/ProfilePage";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";

export const MainPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getItems());
    }, [dispatch])

    return (
        <>
            <main className={style.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </main>
        </>)
}