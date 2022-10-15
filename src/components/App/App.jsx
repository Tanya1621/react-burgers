import AppHeader from "../AppHeader/appHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from './App.module.css';
import {useEffect} from 'react';
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import React from 'react';
import {getItems} from "../../services/actions";
import {useDispatch, useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


const App = () => {
    const dispatch = useDispatch();
    const {addedItems} = useSelector(store => store.cartReducer);
    useEffect(() => {
        dispatch(getItems());
    }, [dispatch])

    const isVisible = useSelector(store => store.popupReducer.isOpened);
    const modalType = useSelector(store => store.popupReducer.type);


    return (<>
        <AppHeader/>
        <main className={style.main}>
            <DndProvider backend={HTML5Backend}>
                <BurgerIngredients/>
                <BurgerConstructor usedIngredients={addedItems}/>
            </DndProvider>
            {isVisible && <Modal>
                {modalType === 'order' &&
                    <OrderDetails></OrderDetails>
                }
                {modalType === 'ingredient' &&
                    <IngredientDetails/>
                }
            </Modal>}
        </main>
    </>)
}

export default App;