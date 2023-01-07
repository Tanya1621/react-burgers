import {NavLink} from "react-router-dom";
import style from './ProfilePage.module.css';
import {logout} from "../../services/actions";
import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "../../services/types/hooks";

export const ProfilePage: FC<{children: React.ReactNode}> = ({children}) => {
    const dispatch = useDispatch();
    const token = useSelector(store => store.authReducer.refreshToken);
    const logoutHandler = () => {
        dispatch(logout(token));
    }

    const activeStyle = {
        color: 'white'
    }
    return (<>
        <section className={style.profile}>
            <div className={style.profile__wrapper}>
                <div className={style.profile__links}>
                    <NavLink to='/profile/' activeStyle={activeStyle}
                             className={`${style.link} text text_type_main-medium`}>Профиль</NavLink>
                    <NavLink to='/profile/order' activeStyle={activeStyle}
                             className={`${style.link} text text_type_main-medium`}>История
                        заказов</NavLink>
                    <button onClick={logoutHandler} className={`${style.button} text text_type_main-medium`}>Выход
                    </button>
                    <p className={`${style.profile__paragraph} text text_type_main-default text_color_inactive`}>В
                        этом разделе вы можете
                        изменить свои персональные данные</p>
                </div>
                {children}
            </div>
        </section>
    </>)
}
