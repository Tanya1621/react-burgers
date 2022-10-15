import {
    Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";

import style from './BurgerIngredients.module.css'
import CardOfTheIngredient from "../CardOfTheIngredient/CardOfTheIngredient";
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/ingredientType";
import {useDispatch, useSelector} from "react-redux";
import {OPEN_POPUP_INGREDIENT, OPEN_POPUP_ORDER} from "../../services/actions";
import {store} from "../../index";
import {useRef} from "react";

const BurgerIngredients = () => {
    const data = useSelector(store => store.constructorReducer.items);
    const dispatch = useDispatch();
    const [current, setCurrent] = React.useState('bun');
    const buns = data.filter((element) => (element.type === 'bun'));
    const sauce = data.filter((element) => (element.type === 'sauce'));
    const main = data.filter((element) => (element.type === 'main'));
    console.log(store.getState());

    ///DND


    //open popup with an ingredient

    const refBun = useRef(null);
    const refSauce = useRef(null);
    const refMain = useRef(null);


    function onClickTab(tab) {
        setCurrent(tab);
        const type = document.getElementById(tab);
        if (type) type.scrollIntoView({block: 'start', behavior: "smooth"});
    }

    const scroll = () => {
        let bun = refBun.current.getBoundingClientRect().top;
        let sauce = refSauce.current.getBoundingClientRect().top;
        let main = refMain.current.getBoundingClientRect().top;

        if (bun <= 250) {
            setCurrent('bun')
        }
        if (sauce <= 250) {
            setCurrent('sauce')
        }
        if (main <= 250) {
            setCurrent('main')
        }

    }


    const openIngredientPopup = (info) => {
        dispatch({type: OPEN_POPUP_INGREDIENT, ingredient: info});
    }

    const onDragHandler = (e) => {
        e.preventDefault();
    }

    return (<section className={style.ingredients}>
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
            <ul className={style.ingredients__list} onScroll={scroll}>
                <li ref={refBun} id='bun'>
                    <h2
                        className={`text text_type_main-medium ${style.ingredients_type}`}>Булки</h2>
                    <div className={style.ingredients__container}>
                        {buns.map((element) => (<CardOfTheIngredient onDragHandler={onDragHandler} key={element._id} data={element}
                                                                     onClick={() => openIngredientPopup(element)}/>) )} </div>
                </li>
                <li ref={refSauce} id='sauce'>
                    <h2
                        className={`text text_type_main-medium ${style.ingredients_type}`}>Соусы</h2>

                    <div className={style.ingredients__container}>
                        {sauce.map((element) => (<CardOfTheIngredient key={element._id} data={element}
                                                                      onClick={() => openIngredientPopup(element)}/>))}
                    </div>
                </li>
                <li ref={refMain} id='main'>
                    <h2
                        className={`text text_type_main-medium ${style.ingredients_type}`}>Основное</h2>
                    <div className={style.ingredients__container}>
                        {main.map((element) => (<CardOfTheIngredient key={element._id} data={element}
                                                                     onClick={() => openIngredientPopup(element)}/>))}
                    </div>
                </li>
            </ul>
        </section>)
}

export default BurgerIngredients;