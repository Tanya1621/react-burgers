import AppHeader from "../AppHeader/appHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from './App.module.css'
import {ingredientsList} from "../../utils/ingredientsList";
import {data} from "../../utils/data";

const api = 'https://norma.nomoreparties.space/api/ingredients';
let dataFromServ;


const App = () => {
    return (
        <>
            <AppHeader/>
            <main className={style.main}>
                <BurgerIngredients data={data}/>
                <BurgerConstructor ingredients={ingredientsList}></BurgerConstructor>
            </main>
        </>
    )
}

export default App;