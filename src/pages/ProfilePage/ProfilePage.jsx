import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, Redirect, Route} from "react-router-dom";
import style from './ProfilePage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {logout, register, UPDATE_USER_INFO, updateUserInfo} from "../../services/actions";
import {store} from "../../index";
import React, {useEffect} from "react";
import {getUserData} from "../../services/api";
import {ProfileInfo} from "../ProfileInfo/ProfileInfo";
import {HashRouter as Router} from "react-router-dom";

export const ProfilePage = ({children}) => {
    const dispatch = useDispatch();
    const token = useSelector(store => store.authReducer.refreshToken);
    const logoutHandler = () => {
        dispatch(logout(token));
    }
    return (<>
        <section className={style.profile}>
            <div className={style.profile__wrapper}>
                <div className={style.profile__links}>
                    <NavLink to='/profile' className={`${style.link} text text_type_main-medium`}>Профиль</NavLink>
                    <NavLink to='/profile/orders' className={`${style.link} text text_type_main-medium`}>История
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
