import style from './AllOrdersPage.module.css';
import {OrderCard} from "../../components/OrderCard/OrderCard";
import {useEffect, useState} from "react";

import {useLocation} from "react-router-dom";
import {Link} from "react-router-dom";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/wsActions";
import {useDispatch, useSelector} from "../../services/types/hooks";
import {TOrder} from "../../services/types/types";



export const AllOrdersPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const today = useSelector(store => store.wsReducer.today);
    const total = useSelector(store => store.wsReducer.total)
    const orders = useSelector(store => store.wsReducer.orders);
    const done = orders.filter((el: TOrder) => el.status === 'done');
    const created = orders.filter((el: TOrder) => el.status === 'created' || el.status === 'pending' )
    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, isPrivate: false})
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED})
        }
    }, [])


    return (
        <section className={style.orders}>
            <h2 className={`text text_type_main-large ${style.orders__heading}`}>Лента заказов</h2>
            <div className={style.orders__content}>
                <div className={style.orders__firstColumn}>
                    {orders && orders.map((el: TOrder) => {
                        return <Link key={el._id} to={{
                            pathname: '/feed/' + el._id,
                            state: {background: location}
                        }} style={{textDecoration: 'none', color: 'white'}}><OrderCard order={el} key={el._id}/></Link>
                    })
                    }
                </div>
                <div className={style.orders__secondColumn}>
                    <div className={style.orders__list}>
                        <div className={style.orders__status}>
                            <h3 className='text text_type_main-medium'>Готовы</h3>
                            <div className={style.order__numbers}>
                                {done.map((el: TOrder) => {
                                return <p className='text text_type_digits-default' style={{color: '#00CCCC'}} key={el._id}>{el.number}</p>})}
                            </div>
                        </div>
                        <div className={style.orders__status}>
                            <h3 className='text text_type_main-medium'>В работе:</h3>
                            <div className={style.order__numbers}>
                                {created.map((el: TOrder) => {
                                    return <p className='text text_type_digits-default' key={el._id}>{el.number}</p>})}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className='text text_type_main-medium'>Выполнено за все время:</h3>
                        <p className='text text_type_digits-large'>{total ? total : ''}</p>
                    </div>
                    <div>
                        <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
                        <p className='text text_type_digits-large'>{today ? today : ''}</p>
                    </div>
                </div>


            </div>
        </section>
    )

}