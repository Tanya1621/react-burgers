import AppHeader from "../AppHeader/appHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from './App.module.css'
import {ingredientsList} from "../../utils/ingredientsList";
import {useEffect, useState} from 'react';
import Modal from "../Modal/Modal";


const App = () => {
    const api = 'https://norma.nomoreparties.space/api/ingredients';
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
    const [modalType, setType] = useState(null);
    const [ingredientInfo, setIngredientInfo] = useState(null);
    return (<>
        <AppHeader/>
        <main className={style.main}>
            <BurgerIngredients data={data} setVisibility={setVisibility} setType={setType}
                               setIngredientInfo={setIngredientInfo}/>
            <BurgerConstructor ingredients={ingredientsList} setVisibility={setVisibility}
                               setType={setType}></BurgerConstructor>
            <Modal isOpen={isVisible} setVisibilty={setVisibility} type={modalType}
                   ingredientInfo={ingredientInfo}></Modal>
        </main>
    </>)
}

export default App;