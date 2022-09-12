import styles from "./OrderDetails.module.css";
import image from "../../images/done.png";
import React from "react";


const orderDetails = () => {
    return (
        <div className={styles.popup_container}>
            <h2 className={`${styles.popup_heading} text text_type_digits-large`}>12345</h2>
            <p className='text text_type_main-medium'>идентификатор заказа</p>
            <img src={image} className={styles.popup_done} alt={'галочка'}/>
            <p className={`${styles.popup_paragraph} text text_type_main-default`}>Ваш заказ начали готовить</p>
            <p className={`${styles.popup_paragraph} 'text text_type_main-default text_color_inactive`}>Дождитесь
                готовности на орбитальной станции</p>
        </div>
    )
}

export default orderDetails;