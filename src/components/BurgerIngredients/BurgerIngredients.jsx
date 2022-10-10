import {
    Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";

import style from './BurgerIngredients.module.css'
import CardOfTheIngredient from "../CardOfTheIngredient/CardOfTheIngredient";
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/ingredientType";


const BurgerIngredients = ({data, setVisibility, setType, setIngredientInfo}) => {
    const [current, setCurrent] = React.useState('bun');
    const buns = data.filter((element) => (element.type === 'bun'));
    const sauce = data.filter((element) => (element.type === 'sauce'));
    const main = data.filter((element) => (element.type === 'main'));

    //open popup with an ingredient

    function onClickTab(tab) {
        setCurrent(tab);
        const type = document.getElementById(tab);
        if (type) type.scrollIntoView({behavior: "smooth"});
    }


    const openIngredientPopup = (info) => {
        setVisibility(true);
        setType('ingredient');
        setIngredientInfo({
                name: info.name,
                image: info.image,
                calories: info.calories,
                carbohydrates: info.carbohydrates,
                proteins: info.proteins,
                fat: info.fat
            }
        )

    }

    return (
        <section className={style.ingredients}>
            <h1 className={`text text_type_main-large ${style.ingredients__heading}`}>Соберите бургер</h1>
            <div className={style.switcher}>
                <Tab value="bun" active={current === 'bun'} onClick={() => {
                    onClickTab('bun')
                }}
                     className="text text_type_main-default">
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={() => {
                    onClickTab('sauce')
                }}
                     className="text text_type_main-default">
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={() => {
                    onClickTab('main')
                }}
                     className="text text_type_main-default">
                    Начинки
                </Tab>
            </div>
            <div className={style.ingredients__list}>
                <h2 id='bun' className={`text text_type_main-medium ${style.ingredients_type}`}>Булки</h2>
                <div className={style.ingredients__container}>
                    {buns.map((element) => (
                        <CardOfTheIngredient key={element._id} data={element}
                                             onClick={() => openIngredientPopup(element)}/>
                    ))}
                    <h2 id='sauce' className={`text text_type_main-medium ${style.ingredients_type}`}>Соусы</h2>
                </div>
                <div className={style.ingredients__container}>
                    {sauce.map((element) => (
                        <CardOfTheIngredient key={element._id} data={element}
                                             onClick={() => openIngredientPopup(element)}/>
                    ))}
                </div>

                <h2 id='main' className={`text text_type_main-medium ${style.ingredients_type}`}>Основное</h2>
                <div className={style.ingredients__container}>
                    {main.map((element) => (
                        <CardOfTheIngredient key={element._id} data={element}
                                             onClick={() => openIngredientPopup(element)}/>
                    ))}
                </div>
            </div>
        </section>
    )
}
BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(ingredientType).isRequired,
    setVisibility: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired,
    setIngredientInfo: PropTypes.func.isRequired,
}
export default BurgerIngredients;