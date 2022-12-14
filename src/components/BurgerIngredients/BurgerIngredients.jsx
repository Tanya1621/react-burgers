import {
    Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from "react";
import {Link, Redirect, useLocation} from "react-router-dom";

import style from './BurgerIngredients.module.css'
import CardOfTheIngredient from "../CardOfTheIngredient/CardOfTheIngredient";
import {useDispatch, useSelector} from "react-redux";
import {OPEN_POPUP_INGREDIENT} from "../../services/actions";
import {useRef} from "react";
import {bun, main, sauce} from "../../utils/constants";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import redirect from "react-router-dom/es/Redirect";

const BurgerIngredients = () => {
    const data = useSelector(store => store.ingredientsReducer.items);
    const dispatch = useDispatch();
    const [current, setCurrent] = React.useState('bun');
    const allBuns = data.filter((element) => (element.type === 'bun'));
    const allSauce = data.filter((element) => (element.type === 'sauce'));
    const allMain = data.filter((element) => (element.type === 'main'));


    //create refs

    const refBun = useRef(null);
    const refSauce = useRef(null);
    const refMain = useRef(null);

    let location = useLocation();

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

        if (bunList <= 300) {
            setCurrent(bun)
        }
        if (sauceList <= 300) {
            setCurrent(sauce)
        }
        if (mainList <= 300) {
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
                <h1 className={`text text_type_main-large ${style.ingredients__heading}`}>???????????????? ????????????</h1>
                <div className={style.switcher}>
                    <Tab value={bun} active={current === 'bun'} onClick={() => {
                        onClickTab(refBun)
                    }}
                         className="text text_type_main-default">
                        ??????????
                    </Tab>
                    <Tab value="sauce" active={current === sauce} onClick={() => {
                        onClickTab(refSauce)
                    }}
                         className="text text_type_main-default">
                        ??????????
                    </Tab>
                    <Tab value="main" active={current === main} onClick={() => {
                        onClickTab(refMain)
                    }}
                         className="text text_type_main-default">
                        ??????????????
                    </Tab>
                </div>
                <ul className={style.ingredients__list} onScroll={scroll} id='scrolled'>
                    <li ref={refBun} id={bun}>
                        <h2
                            className={`text text_type_main-medium ${style.ingredients_type}`}>??????????</h2>
                        <div className={style.ingredients__container}>
                            {allBuns.map((element) => (
                                <Link  key={element._id} to={{
                                    pathname: '/ingredients/' + element._id,
                                    state: {background: location}
                                }} style={{textDecoration: 'none', color: 'white'}}><CardOfTheIngredient
                                    onDragHandler={onDragHandler} data={element}
                                    onClick={() => openIngredientPopup(element)}/></Link>))} </div>
                    </li>
                    <li ref={refSauce} id={sauce}>
                        <h2
                            className={`text text_type_main-medium ${style.ingredients_type}`}>??????????</h2>

                        <div className={style.ingredients__container}>
                            {allSauce.map((element) => (
                                <Link  key={element._id} to={{
                                    pathname: '/ingredients/' + element._id,
                                    state: {background: location}
                                }} style={{textDecoration: 'none', color: 'white'}}><CardOfTheIngredient
                                    data={element}
                                    onClick={() => openIngredientPopup(element)}/></Link>))}
                        </div>
                    </li>
                    <li ref={refMain} id={main}>
                        <h2
                            className={`text text_type_main-medium ${style.ingredients_type}`}>????????????????</h2>
                        <div className={style.ingredients__container}>
                            {allMain.map((element) => (<Link  key={element._id} to={{
                                pathname: '/ingredients/' + element._id,
                                state: {background: location}
                            }} style={{textDecoration: 'none', color: 'white'}}><CardOfTheIngredient key={element._id}
                                                                                                     data={element} onClick={() => openIngredientPopup(element)}/></Link>))}
                        </div>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default BurgerIngredients;