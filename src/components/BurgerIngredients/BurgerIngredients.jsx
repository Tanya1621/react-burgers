import {
    Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";

import style from './BurgerIngredients.module.css'
import CardOfTheIngredient from "../CardOfTheIngredient/CardOfTheIngredient";
import {data} from "../../utils/data";

const buns = data.filter((element) => (element.type === 'bun'));
const sauce = data.filter((element) => (element.type === 'sauce'));
const main = data.filter((element) => (element.type === 'main'));


const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('one');
    return (
        <section className={style.section}>
            <h1 className={`text text_type_main-large ${style.heading}`}>Соберите бургер</h1>
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
            <ul className={style.ingredients_list}>
                <h2 className='text text_type_main-default'>Булки</h2>
                <div className={style.card__container}>
                    {buns.map((element) => (
                        <CardOfTheIngredient key={element._id}>{element}</CardOfTheIngredient>
                    ))}
                    <h2 className='text text_type_main-default'>Соусы</h2>
                </div>
                <div className={style.card__container}>
                    {sauce.map((element) => (
                        <CardOfTheIngredient key={element._id}>{element}</CardOfTheIngredient>
                    ))}
                </div>

                <h2 className='text text_type_main-default'>Основное</h2>
                <div className={style.card__container}>
                    {main.map((element) => (
                        <CardOfTheIngredient key={element._id}>{element}</CardOfTheIngredient>
                    ))}
                </div>
            </ul>
        </section>
    )
}

export default BurgerIngredients;