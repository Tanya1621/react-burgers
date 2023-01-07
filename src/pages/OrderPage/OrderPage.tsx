import React from 'react';
import {OrderInfo} from "../../components/OrderInfo/OrderInfo";
import style from './OrderPage.module.css'
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/wsActions";
import {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {useDispatch} from "../../services/types/hooks";

function OrderPage() {
    const location = useLocation();
    const isPrivate = location.pathname.includes('feed')? false : true;
    //unexpected behavior of variable isPrivate; it doesn't work without ternary operator. ?
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, isPrivate: isPrivate})
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED})
        }
    }, [])
    return (
        <section className={style.order_info}>
            <OrderInfo isPopup={false}/>
        </section>
    );
}

export default OrderPage;