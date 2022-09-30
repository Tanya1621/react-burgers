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
import {BurgerConstructorContext} from "../services/BurgerConstructorContext";
import burgerIngredients from "../BurgerIngredients/BurgerIngredients";


const App = () => {
    const api = 'https://norma.nomoreparties.space/api/ingredients';
    const [order, setOrder] = useState(null);
    const [data, setData] = useState([])
    useEffect(() => {
        async function getInfo() {
            fetch(api, {
                method: 'GET',
            })
                .then((res) => {
                    if (!res.ok) {
                        return Promise.reject(`Ошибка ${res.status}`);
                    }
                    return res.json();
                })
                .then((info) => {
                    setData(info.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        getInfo();
    }, [])
    const [isVisible, setVisibility] = useState(false);
    const [modalType, setType] = useState('');
    const [ingredientInfo, setIngredientInfo] = useState(null);

    return (<>
        <AppHeader/>
        <main className={style.main}>
            <BurgerConstructorContext.Provider value={data}>
            <BurgerIngredients data={data} setVisibility={setVisibility} setType={setType}
                               setIngredientInfo={setIngredientInfo}/>

            <BurgerConstructor /*ingredients={ingredientsList}*/  setVisibility={setVisibility}
                               setType={setType} setOrder={setOrder}></BurgerConstructor>

            <Modal isOpen={isVisible} setVisibilty={setVisibility}
                   ingredientInfo={ingredientInfo}>
                {modalType === 'order' &&
                    <OrderDetails order={order}></OrderDetails>
                }
                {modalType=== 'ingredient' &&
                    <IngredientDetails ingredientInfo={ingredientInfo}></IngredientDetails>
                }
            </Modal>
            </BurgerConstructorContext.Provider>
        </main>
    </>)
}

export default App;