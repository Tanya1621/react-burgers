import {
    Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";

import style from './BurgerIngredients.module.css'
import CardOfTheIngredient from "../CardOfTheIngredient/CardOfTheIngredient";
import PropTypes from "prop-types";
import {checkingPropTypes} from "../../utils/checkproptype";


const BurgerIngredients = ({data}) => {
    const [current, setCurrent] = React.useState('one');
    const buns = data.filter((element) => (element.type === 'bun'));
    const sauce = data.filter((element) => (element.type === 'sauce'));
    const main = data.filter((element) => (element.type === 'main'));
    return (
        <section className={style.ingredients}>
            <h1 className={`text text_type_main-large ${style.ingredients__heading}`}>Соберите бургер</h1>
            <div style={{display: 'flex'}}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}
                     className="text text_type_main-default">
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}
                     className="text text_type_main-default">
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}
                     className="text text_type_main-default">
                    Начинки
                </Tab>
            </div>
            <ul className={style.ingredients__list}>
                <h2 className='text text_type_main-default'>Булки</h2>
                <div className={style.ingredients__container}>
                    {buns.map((element) => (
                        <CardOfTheIngredient key={element._id}>{element}</CardOfTheIngredient>
                    ))}
                    <h2 className='text text_type_main-default'>Соусы</h2>
                </div>
                <div className={style.ingredients__container}>
                    {sauce.map((element) => (
                        <CardOfTheIngredient key={element._id}>{element}</CardOfTheIngredient>
                    ))}
                </div>

                <h2 className='text text_type_main-default'>Основное</h2>
                <div className={style.ingredients__container}>
                    {main.map((element) => (
                        <CardOfTheIngredient key={element._id}>{element}</CardOfTheIngredient>
                    ))}
                </div>
            </ul>
        </section>
    )
}
BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(checkingPropTypes).isRequired,
}
export default BurgerIngredients;