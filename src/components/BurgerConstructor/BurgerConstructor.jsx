import {
    ConstructorElement, Button, CurrencyIcon, DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructor.module.css'
import PropTypes from 'prop-types';
import {useContext} from "react";
import {BurgerConstructorContext} from "../services/BurgerConstructorContext";
import React from "react";


const BurgerConstructor = ({/*ingredients,*/ setVisibility, setType, setOrder}) => {
    const ingredients = useContext(BurgerConstructorContext);
    const idArray = [];
    ingredients.map((element) => {
        idArray.push(element._id);
    })
    const openPopup = () => {
        fetch('https://norma.nomoreparties.space/api/orders', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({'ingredients': idArray})})
            .then((res) => {
                if (!res.ok) {
                    return Promise.reject(`Ошибка ${res.status}`);
                }
                return res.json();
            })
            .then((info) => {
                console.log(info);
               setOrder(info.order.number);
            })
            .catch((error) => {
                console.log(error);
            });
        setVisibility(true);
        setType('order');
    }

    let price;
    const bun = ingredients.filter((element) => element.type === 'bun');
    const otherIngredients = ingredients.filter((element) => element.type !== 'bun')
    if (bun[0]) {
     price = otherIngredients.reduce((prevValue, current) => {
        return prevValue + current.price;
    }, bun[0].price * 2)}
return (
        <section className={style.constructor} area-label='Выбранные ингредиенты'>
            <div className={style.constructor__element_last}>

                {bun[0] &&
                    <ConstructorElement text={`${bun[0].name} (верх)`} thumbnail={bun[0].image} price={bun[0].price}
                                        isLocked={true} type={"top"} key={'1'}/>}
            </div>
            <div className={style.constructor__list}>
                {ingredients.map((element, index) => {
                    if (element.type !== 'bun') {
                        return (<div className={style.constructor__element} key={element._id}>
                            <DragIcon type={'primary'}/>
                            <ConstructorElement
                                text={element.name}
                                thumbnail={element.image}
                                price={element.price}/>
                        </div>)
                    }
                })}  </div>
            <div className={style.constructor__element_last}>
                {bun[0] &&
                    <ConstructorElement text={`${bun[0].name} (верх)`} thumbnail={bun[0].image} price={bun[0].price}
                                        isLocked={true} type={'bottom'} key={'2'}/>}
            </div>
            <div className={style.constructor__total}>
                <p className={`text text_type_digits-medium ${style.constructor__price}`}>{price}</p>
                <div className={style.constructor__sign}><CurrencyIcon type={"primary"}></CurrencyIcon></div>
                <Button className={style.constructor__price} onClick={openPopup}>Оформить заказ</Button>

            </div>
        </section>)
}

BurgerConstructor.propTypes = {
    setVisibility: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired,
    setOrder:  PropTypes.func.isRequired,
}


export default BurgerConstructor;