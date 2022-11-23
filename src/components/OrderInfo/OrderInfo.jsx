import styles from "./OrderInfo.module.css";
import React from "react";
import {useSelector} from "react-redux";
import {OrderedElement} from "../OrderedIngredient/OrderedElement";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {convertDate} from "../../utils/ConvertDate";


export const OrderInfo = ({order}) => {
    const ingredients = useSelector(store => store.ingredientsReducer.items);
    const ordered = order.ingredients.map(el => ingredients.find(element => element._id === el));
    let counter = 0;
    console.log(ordered);

    return (<div className={styles.wrapper}>
            <h2 className={` text text text_type_digits-default`}>#{order.number}</h2>
            <p className={`${styles.order__name} text text_type_main-medium`}>{order.name}</p>
            <p className={`${styles.order__status} text text_type_main-default`}>{order.status}</p>
            <div>
                <p className={`${styles.order__components} text text_type_main-medium`}>Состав:</p>
                <div className={styles.scroll_area}>
                    {ordered.length > 0 && ordered.map(element => {
                        if(element){
                        counter += element.price;
                        return <OrderedElement item={element}/>}
                        })}
                </div>
                <div className={styles.order__bottom}>
                <p className={` text text_type_main-default text_color_inactive`}>{convertDate(order.updatedAt)}</p>
                    <div className={styles.order__total}>
                        <p className={`${styles.order__number} text text_type_digits-default`}>{counter}</p>
                    <CurrencyIcon type={"primary"} />
                    </div>
            </div>
            </div>
        </div>
    )
}