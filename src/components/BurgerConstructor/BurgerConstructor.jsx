import {
    ConstructorElement, Button, CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructor.module.css';
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {DECREASE_COUNTER, INCREASE_COUNTER, makeNewOrder} from "../../services/actions";
import {useDrop} from "react-dnd";
import {ADD_ITEM} from "../../services/actions";
import {AddedIngredient} from "../AddedIngredient/AddedIngredient";
import {bun} from "../../utils/constants";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { useHistory} from "react-router-dom";
import {v4 as uuidv4} from 'uuid';


const BurgerConstructor = () => {
    const {isRequested} = useSelector(store => store.popupOrderReducer);
    const history = useHistory();
    const dispatch = useDispatch();
    const usedIngredients = useSelector(store => store.cartReducer.addedItems);
    const {items} = useSelector(store => store.ingredientsReducer);
    const {isAuth} = useSelector(store => store.authReducer);

    function onDropHandler(itemId, uuid) {
        const ingredient = items.find((element) => element._id === itemId.id);
        if (ingredient.type === bun) {
            const prevBun = usedIngredients.find((element) => element.type === bun);
            if (prevBun) {
                dispatch({type: DECREASE_COUNTER, ingredient: prevBun});
            }
        }
        dispatch({type: ADD_ITEM, item: ingredient, uuid: uuidv4()});
        dispatch({type: INCREASE_COUNTER, ingredient});
    }

    const [, dropTarget] = useDrop({
        accept: "ingredient",
        drop(itemId) {
            onDropHandler(itemId);

        },
    });

    let price = 0;
    let bunElement;

    const isVisible = useSelector(store => store.popupOrderReducer.isOpened);

    if (usedIngredients.length !== 0) {
        let otherIngredients = [];
        bunElement = usedIngredients.find((element) => element.type === bun);
        otherIngredients = usedIngredients.filter((element) => element.type !== bun)
        price = otherIngredients.reduce((prevValue, current) => {
            return prevValue + current.price;
        }, bunElement ? bunElement.price * 2 : 0)

    }
    const idArray = [];
    usedIngredients.map((element) => {
        idArray.push(element._id);
    });

    const makeOrder = () => {
        if (!idArray.isEmpty && bunElement) {
            dispatch(makeNewOrder(idArray));
        }
    }
    const redirect = () => {
        history.replace('/login');
    }

    return (<>
        <section className={style.constructor} area-label='?????????????????? ??????????????????????' ref={dropTarget}>
            <div className={style.constructor__element_last}>

                {bunElement ?
                    (<ConstructorElement text={`${bunElement.name} (????????)`} thumbnail={bunElement.image}
                                         price={bunElement.price}
                                         isLocked={true} type="top"/>)
                    : (<div className={` text text_type_main-medium ${style.constructor__empty}`}><p
                        className={style.constructor__text}>???????????????? ?????????? </p></div>)
                }
            </div>
            <div className={style.constructor__list}>
                {usedIngredients.map((element, index) => {
                    if (element.type !== bun) {
                        return (

                            <AddedIngredient ingredient={element} index={index} key={element.uuid}/>
                        )
                    }
                })}  </div>
            <div className={style.constructor__element_last}>
                {bunElement ? (
                        <ConstructorElement text={`${bunElement.name} (??????)`} thumbnail={bunElement.image}
                                            price={bunElement.price}
                                            isLocked={true} type='bottom'/>)
                    : (<div
                        className={` text text_type_main-medium ${style.constructor__empty} ${style.constructor__empty_bottom}`}>
                        <p
                            className={style.constructor__text}>???????????????? ??????????</p></div>)}
            </div>
            <div className={style.constructor__total}>
                <p className={`text text_type_digits-medium ${style.constructor__price}`}>{price}</p>
                <div className={style.constructor__sign}><CurrencyIcon type="primary"></CurrencyIcon></div>
                <Button
                    onClick={isAuth ? makeOrder : redirect}>{isRequested ? '????????????????????...' : '???????????????? ??????????'}</Button>
                {isRequested && <p>Requested</p>}
            </div>
        </section>
        {isVisible && <Modal>
            <OrderDetails></OrderDetails>
        </Modal>}
    </>)
}


export default BurgerConstructor;

