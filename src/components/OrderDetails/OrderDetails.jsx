import styles from "./OrderDetails.module.css";
import image from "../../images/done.png";
import React from "react";
import {useSelector} from "react-redux";


const OrderDetails = () => {
    const {order} = useSelector(store => store.popupReducer);
    return (
        <div className={styles.popup_container}>
            <h2 className={`${styles.popup_heading} text text_type_digits-large`}>{order}</h2>
            <p className='text text_type_main-medium'>идентификатор заказа</p>
            <img src={image} className={styles.popup_done} alt={'галочка'}/>
            <p className={`${styles.popup_paragraph} text text_type_main-default`}>Ваш заказ начали готовить</p>
            <p className={`${styles.popup_paragraph} 'text text_type_main-default text_color_inactive`}>Дождитесь
                готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;