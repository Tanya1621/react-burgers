import React from 'react';
import {OrderInfo} from "../../components/OrderInfo/OrderInfo";
import style from './OrderPage.module.css'

function OrderPage() {
    const testObject = {
        createdAt: "2022-11-16T11:44:17.370Z",
        ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cc', '60d3b41abdacab0026a733c7'],
        name: "Spicy флюоресцентный бургер",
        number: 30302,
        status: "done",
        updatedAt: "2022-11-16T11:44:17.767Z",
        _id: "6374cd119b518a001bb845cd",
    }
    return (
        <section className={style.order_info}>
            <OrderInfo order={testObject}/>
        </section>
    );
}

export default OrderPage;