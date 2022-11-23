import style from './AllOrdersPage.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {OrderCard} from "../../components/OrderCard/OrderCard";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useLocation} from "react-router-dom";
import {Link} from "react-router-dom";


export const AllOrdersPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const orders = useSelector(store => store.ordersReducer.lastOrders);
    useEffect(() => {
        const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');
        ws.onmessage = (event) => {
            if(event.data) {
                console.log(JSON.parse(event.data));
           setData(JSON.parse(event.data));
                dispatch({type: 'GET_LAST_ORDERS', orders: JSON.parse(event.data).orders})
        }
        };
    }, [])



    return (
        <section className={style.orders}>
            <h2 className={`text text_type_main-large ${style.orders__heading}`}>Лента заказов</h2>
            <div className={style.orders__content}>
                <div className={style.orders__firstColumn}>
                    {orders && orders.map((el) => {
                       return <Link  key={el._id} to={{
                           pathname: '/feed/' + el._id,
                           state: {background: location}
                       }} style={{textDecoration: 'none', color: 'white'}}><OrderCard order={el} /></Link>
                    })
                    }
                </div>
                <div className={style.orders__secondColumn}>
                    <div className={style.orders__list}>
                        <div className={style.orders__status}>
                            <h3 className='text text_type_main-medium'>Готовы</h3>
                            <div className={style.order__numbers}>
                                <p className='text text_type_digits-default'>1999</p>
                                <p className='text text_type_digits-default'>1999</p>
                                <p className='text text_type_digits-default'>1999</p>
                                <p className='text text_type_digits-default'>1999</p>
                                <p className='text text_type_digits-default'>1999</p>
                            </div>
                        </div>
                        <div className={style.orders__status}>
                            <h3 className='text text_type_main-medium'>В работе:</h3>
                            <div className={style.order__numbers}>
                                <p className='text text_type_digits-default'>1999</p>
                                <p className='text text_type_digits-default'>1999</p>
                                <p className='text text_type_digits-default'>1999</p>
                                <p className='text text_type_digits-default'>1999</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className='text text_type_main-medium'>Выполнено за все время:</h3>
                        <p className='text text_type_digits-large'>{data.total ? data.total : ''}</p>
                    </div>
                    <div>
                        <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
                        <p className='text text_type_digits-large'>{data.totalToday ? data.totalToday : ''}</p>
                    </div>
                </div>


            </div>
        </section>
    )

}