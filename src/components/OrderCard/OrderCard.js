import style from "./OrderCard.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {useMemo} from "react";
import {statusOfOrder} from "../../utils/constants";
import {ingredientType} from "../../utils/ingredientType";
import PropTypes from "prop-types";
import CardOfTheIngredient from "../CardOfTheIngredient/CardOfTheIngredient";
import {v4 as uuidv4} from 'uuid';


export const OrderCard = ({order, isOwner}) => {

    const {items} = useSelector(store => store.ingredientsReducer);
    let currentDay;
    useMemo(() => {
        const today = new Date();
        currentDay = today.toISOString().slice(0, 10);
    })

    let counter = 0;

    return (
        <div className={isOwner? style.card__my : style.card}>
            <div className={style.card__top}>
                <p className='text text_type_digits-default'>{order.number}</p>
                <p className='text text_color_inactive text_type_main-default'>{`${currentDay === order.createdAt.slice(0, 10)? 'Today' : order.createdAt.slice(0, 10)} at ${order.createdAt.slice(12, 16)}`}</p>
            </div>
            <h3 className={`text text_type_main-medium ${style.card__name}`}>{order.name}</h3>
            {isOwner && <p className='text text_type_main-default'>{statusOfOrder[order.status]}</p>}
            <div className={style.card__bottom}>
                <div className={style.card__ingredients}>
                    {order.ingredients.map((elem, index) => {
                        const ingredient = items.find((element) => element._id === elem);
                        counter += ingredient.price;
                        if (index < 9) {
                            return <img className={style.card__icon} src={ingredient.image} key={uuidv4()}/>
                        }
                    })}
                </div>
                <div className={style.card__price}>
                    <p className='text text_type_digits-default'>{counter}</p>
                    <CurrencyIcon type={"primary"}/>
                </div>
            </div>
        </div>
    )
}

OrderCard.propTypes = {
    order: PropTypes.object.isRequired,
    isOwner: PropTypes.bool,
}