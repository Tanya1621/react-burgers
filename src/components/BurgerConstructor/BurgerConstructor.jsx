import {
    ConstructorElement, Button, CurrencyIcon, DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructor.module.css'
import PropTypes from 'prop-types';
import {useContext} from "react";
import {BurgerConstructorContext} from "../services/BurgerConstructorContext";
import React from "react";
import {ORDER_URL} from "../../utils/api";


const BurgerConstructor = ({setVisibility, setType, setOrder}) => {
    const ingredients = useContext(BurgerConstructorContext);
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

    const makeOrder = () => {
        const idArray = [];
        usedIngredients.map((element) => {
            idArray.push(element._id);
        });
        fetch(ORDER_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'ingredients': idArray})
        })
            .then((res) => {
                if (!res.ok) {
                    return Promise.reject(`Ошибка ${res.status}`);
                }
                return res.json();
            })
            .then((info) => {
                if (info.order.number) {
                    setOrder(info.order.number);
                }
                if (info.success) {
                    setVisibility(true);
                    setType('order');
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }

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

BurgerConstructor.propTypes = {
    setVisibility: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired,
    setOrder: PropTypes.func.isRequired,
}


export default BurgerConstructor;