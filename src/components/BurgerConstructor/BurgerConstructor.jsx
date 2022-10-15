import {
    ConstructorElement, Button, CurrencyIcon, DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructor.module.css'
import PropTypes from 'prop-types';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeNewOrder} from "../../services/actions";
import {useDrop} from "react-dnd";
import {ADD_ITEM} from "../../services/actions";
import {store} from "../../index";
import {AddedIngredient} from "../AddedIngredient/AddedIngredient";


const BurgerConstructor = ({usedIngredients}) => {
    const dispatch = useDispatch();
    const {items} = useSelector(store => store.constructorReducer);
    console.log(store.getState())

    function onDropHandler(itemId) {
        const date = new Date();
        const uniqueId = date.getTime();
        const item = items.find((element) => element._id === itemId.id);
        dispatch({type: ADD_ITEM, item});
        console.log(store.getState());
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDropHandler(itemId);

        },
    });

    let price = 0;
    let bun;
    if (usedIngredients.length !== 0) {
        let otherIngredients = [];
        bun = usedIngredients.find((element) => element.type === 'bun');
        otherIngredients = usedIngredients.filter((element) => element.type !== 'bun')
        if (bun) {
            price = otherIngredients.reduce((prevValue, current) => {
                return prevValue + current.price;
            }, bun.price * 2)
        }
    }
    const idArray = [];
    usedIngredients.map((element) => {
        idArray.push(element._id);
    });

    const makeOrder = () => {
        if (!idArray.isEmpty) {
            dispatch(makeNewOrder(idArray));
        }
    }
    return (
        <section className={style.constructor} area-label='Выбранные ингредиенты'>
            <div className={style.constructor__element_last}>

                {bun ?
                    (<ConstructorElement text={`${bun.name} (верх)`} thumbnail={bun.image} price={bun.price}
                                         isLocked={true} type="top"/>)
                    : (<div className={` text text_type_main-medium ${style.constructor__empty}`}><p
                        className={style.constructor__text}>Добавьте булку </p></div>)
                }
            </div>
            <div className={style.constructor__list} ref={dropTarget}>
                {usedIngredients.map((element, index) => {
                    if (element.type !== 'bun') {
                        return (

                            <AddedIngredient ingredient={element} index={index} key={element._id + index}/>
                        )
                    }
                })}  </div>
            <div className={style.constructor__element_last}>
                {bun ? (
                        <ConstructorElement text={`${bun.name} (низ)`} thumbnail={bun.image} price={bun.price}
                                            isLocked={true} type='bottom'/>)
                    : (<div className={` text text_type_main-medium ${style.constructor__empty} ${style.constructor__empty_bottom}`}><p
                        className={style.constructor__text}>Добавьте булку</p></div>)}
            </div>
            <div className={style.constructor__total}>
                <p className={`text text_type_digits-medium ${style.constructor__price}`}>{price}</p>
                <div className={style.constructor__sign}><CurrencyIcon type="primary"></CurrencyIcon></div>
                <Button className={style.constructor__price} onClick={makeOrder}>Оформить заказ</Button>

            </div>
        </section>)
}


export default BurgerConstructor;

