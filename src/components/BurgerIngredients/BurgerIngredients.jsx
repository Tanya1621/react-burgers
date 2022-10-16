import {
    Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";

import style from './BurgerIngredients.module.css'
import CardOfTheIngredient from "../CardOfTheIngredient/CardOfTheIngredient";
import {useDispatch, useSelector} from "react-redux";
import {OPEN_POPUP_INGREDIENT} from "../../services/actions";
import {useRef} from "react";
import {bun, main, sauce} from "../../utils/constants";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const BurgerIngredients = () => {
    const data = useSelector(store => store.ingredientsReducer.items);
    const dispatch = useDispatch();
    const [current, setCurrent] = React.useState('bun');
    const allBuns = data.filter((element) => (element.type === 'bun'));
    const allSauce = data.filter((element) => (element.type === 'sauce'));
    const allMain = data.filter((element) => (element.type === 'main'));

    const isVisible = useSelector(store => store.popupIngredientReducer.isOpened)

    //create refs

    const refBun = useRef(null);
    const refSauce = useRef(null);
    const refMain = useRef(null);

//scroll
    function onClickTab(tab) {
        setCurrent(tab.current);
        const scrolled = document.getElementById('scrolled');
        scrolled.scrollTop = tab.current.offsetTop - scrolled.offsetTop + 100;
    }

    const scroll = () => {
        let bunList = refBun.current.getBoundingClientRect().top;
        let sauceList = refSauce.current.getBoundingClientRect().top;
        let mainList = refMain.current.getBoundingClientRect().top;

        if (bunList <= 250) {
            setCurrent(bun)
        }
        if (sauceList <= 250) {
            setCurrent(sauce)
        }
        if (mainList <= 250) {
            setCurrent(main)
        }

    }


    const openIngredientPopup = (info) => {
        dispatch({type: OPEN_POPUP_INGREDIENT, ingredient: info});
    }

    const onDragHandler = (e) => {
        e.preventDefault();
    }

    return (<>
            <section className={style.ingredients}>
                <h1 className={`text text_type_main-large ${style.ingredients__heading}`}>Соберите бургер</h1>
                <div className={style.switcher}>
                    <Tab value={bun} active={current === 'bun'} onClick={() => {
                        onClickTab(refBun)
                    }}
                         className="text text_type_main-default">
                        Булки
                    </Tab>
                    <Tab value="sauce" active={current === sauce} onClick={() => {
                        onClickTab(refSauce)
                    }}
                         className="text text_type_main-default">
                        Соусы
                    </Tab>
                    <Tab value="main" active={current === main} onClick={() => {
                        onClickTab(refMain)
                    }}
                         className="text text_type_main-default">
                        Начинки
                    </Tab>
                </div>
                <ul className={style.ingredients__list} onScroll={scroll} id='scrolled'>
                    <li ref={refBun} id={bun}>
                        <h2
                            className={`text text_type_main-medium ${style.ingredients_type}`}>Булки</h2>
                        <div className={style.ingredients__container}>
                            {allBuns.map((element) => (
                                <CardOfTheIngredient onDragHandler={onDragHandler} key={element._id} data={element}
                                                     onClick={() => openIngredientPopup(element)}/>))} </div>
                    </li>
                    <li ref={refSauce} id={sauce}>
                        <h2
                            className={`text text_type_main-medium ${style.ingredients_type}`}>Соусы</h2>

                        <div className={style.ingredients__container}>
                            {allSauce.map((element) => (<CardOfTheIngredient key={element._id} data={element}
                                                                             onClick={() => openIngredientPopup(element)}/>))}
                        </div>
                    </li>
                    <li ref={refMain} id={main}>
                        <h2
                            className={`text text_type_main-medium ${style.ingredients_type}`}>Основное</h2>
                        <div className={style.ingredients__container}>
                            {allMain.map((element) => (<CardOfTheIngredient key={element._id} data={element}
                                                                            onClick={() => openIngredientPopup(element)}/>))}
                        </div>
                    </li>
                </ul>
            </section>
            {isVisible && <Modal>
                <IngredientDetails/>
            </Modal>}
        </>
    )
}

export default BurgerIngredients;