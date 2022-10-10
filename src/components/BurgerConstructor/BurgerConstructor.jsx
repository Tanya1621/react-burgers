import {
    ConstructorElement, Button, CurrencyIcon, DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructor.module.css'
import PropTypes from 'prop-types';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {makeNewOrder} from "../../services/actions";


const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const ingredients = useSelector(store => store.constructorReducer.items);
    let price;
    let bun;
    let usedIngredients = [];
    if (ingredients.length !== 0) {
        bun = ingredients.find((element) => element.type === 'bun');
        usedIngredients = ingredients.filter((element) => element.type !== 'bun');
        usedIngredients.push(bun);
        usedIngredients.unshift(bun);

        console.log(usedIngredients);
        const otherIngredients = usedIngredients.filter((element) => element.type !== 'bun')
        if (bun) {
            price = otherIngredients.reduce((prevValue, current) => {
                return prevValue + current.price;
            }, bun.price * 2)
        }}

    const idArray = [];
    usedIngredients.map((element) => {
        idArray.push(element._id);
    });

    const makeOrder = (idArray) =>{
        if(!idArray.isEmpty) {
        dispatch(makeNewOrder(["60d3b41abdacab0026a733c6","60d3b41abdacab0026a733c8", "60d3b41abdacab0026a733c9"]));
    }}
    return (
        <section className={style.constructor} area-label='Выбранные ингредиенты'>
            <div className={style.constructor__element_last}>

                {bun &&
                    <ConstructorElement text={`${bun.name} (верх)`} thumbnail={bun.image} price={bun.price}
                                        isLocked={true} type="top"/>}
            </div>
            <div className={style.constructor__list}>
                {usedIngredients.map((element, index) => {
                    if (element.type !== 'bun') {
                        return (<div className={style.constructor__element} key={element._id}>
                            <DragIcon type='primary'/>
                            <ConstructorElement
                                text={element.name}
                                thumbnail={element.image}
                                price={element.price}/>
                        </div>)
                    }
                })}  </div>
            <div className={style.constructor__element_last}>
                {bun &&
                    <ConstructorElement text={`${bun.name} (верх)`} thumbnail={bun.image} price={bun.price}
                                        isLocked={true} type='bottom'/>}
            </div>
            <div className={style.constructor__total}>
                <p className={`text text_type_digits-medium ${style.constructor__price}`}>{price}</p>
                <div className={style.constructor__sign}><CurrencyIcon type="primary"></CurrencyIcon></div>
                <Button className={style.constructor__price} onClick={makeOrder}>Оформить заказ</Button>

            </div>
        </section>)
}




export default BurgerConstructor;