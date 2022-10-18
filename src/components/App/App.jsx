import AppHeader from "../AppHeader/appHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from './App.module.css';
import {useEffect} from 'react';
import React from 'react';
import {getItems} from "../../services/actions";
import {useDispatch} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getItems());
    }, [dispatch])


    return (<>
        <AppHeader/>
        <main className={style.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConstructor/>
            </DndProvider>
        </main>
    </>)
}

export default App;