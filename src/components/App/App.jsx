import AppHeader from "../AppHeader/appHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import style from './App.module.css'


const App = () => {
    return (
        <>
        <AppHeader />
    <main className={style.main}>
        <BurgerIngredients />
        <BurgerConstructor></BurgerConstructor>
    </main>
        </>
    )
}

export default App;