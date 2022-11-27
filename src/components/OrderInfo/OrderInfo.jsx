import styles from "./OrderInfo.module.css";
import React from "react";
import {useSelector} from "react-redux";
import {OrderedElement} from "../OrderedIngredient/OrderedElement";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {convertDate} from "../../utils/ConvertDate";
import {useParams} from "react-router-dom";
import {statusOfOrder} from "../../utils/constants";
import {v4 as uuidv4} from 'uuid';


export const OrderInfo = ({isPopup}) => {
    const params = useParams();
    const orders = useSelector(store => store.wsReducer.orders);
    const order = orders.find(el => el._id === params.id);
    const ingredients = useSelector(store => store.ingredientsReducer.items);
    let ordered = [];
    if (order) {
        ordered = order.ingredients.map(el => ingredients.find(element => element._id === el))
    }
    let counter = 0;

    return (<>
            {order && <div className={styles.wrapper}>
                <h2 className={`text text text_type_digits-default ${isPopup ? styles.order__number_left : styles.order__number_center}`}>#{order.number}</h2>
                <p className={`${styles.order__name} text text_type_main-medium`}>{order.name}</p>
                <p className={`${styles.order__status} text text_type_main-default`}>{statusOfOrder[order.status]}</p>
                <div>
                    <p className={`${styles.order__components} text text_type_main-medium`}>Состав:</p>
                    <div className={styles.scroll_area}>
                        {ordered.length > 0 && ordered.map(element => {
                            if (element) {
                                counter += element.price;
                                return <OrderedElement item={element} key={uuidv4()}/>
                            }
                        })}
                    </div>
                    <div className={styles.order__bottom}>
                        <p className={` text text_type_main-default text_color_inactive`}>{convertDate(order.updatedAt)}</p>
                        <div className={styles.order__total}>
                            <p className={`${styles.order__number} text text_type_digits-default`}>{counter}</p>
                            <CurrencyIcon type={"primary"}/>
                        </div>
                    </div>
                </div>
            </div>}</>
    )
}