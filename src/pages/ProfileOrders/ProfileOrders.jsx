import style from './ProfileOrders.module.css'
import {OrderCard} from "../../components/OrderCard/OrderCard";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {WS_CONNECTION_CLOSED, WS_CONNECTION_START} from "../../services/actions/wsActions";
import {useLocation} from "react-router-dom";
import {Link} from "react-router-dom";

export const ProfileOrdersPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const orders = useSelector(store => store.wsReducer.orders);
    useEffect(() => {
        dispatch({type: WS_CONNECTION_START, isPrivate: true})
        return () => {
            dispatch({type: WS_CONNECTION_CLOSED})
        }
    }, [])
    return (<div className={style.myorders__wrapper}>
            {orders && orders.map(el => {
                return <Link key={el._id} to={{
                    pathname: '/orders/' + el._id, state: {background: location}
                }} style={{textDecoration: 'none', color: 'white'}}><OrderCard order={el} isOwner={true}/></Link>
            })}
        </div>)
}