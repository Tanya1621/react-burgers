import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, Redirect} from "react-router-dom";
import style from './ProfilePage.module.css';
import {useDispatch, useSelector} from "react-redux";
import {logout, register, UPDATE_USER_INFO, updateUserInfo} from "../../../services/actions";
import {store} from "../../../index";
import React, {useEffect} from "react";
import {getUserData} from "../../../services/api";

export const ProfilePage = () => {
    let name = useSelector(store => store.authReducer.name);
    let email = useSelector(store => store.authReducer.email)
    const [nameValue, setNameValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const token = useSelector(store => store.authReducer.refreshToken);
    const {isAuth} = useSelector(store => store.authReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        getUserData().then((res) => {
            if (res.success && res) {
                dispatch({type: UPDATE_USER_INFO, user: {name: res.user.name, email: res.user.email}})
                setEmailValue(res.user.email);
                setNameValue(res.user.name);
            }
        } )
    },[]);
    const onNameChange = e => {
        setNameValue(e.target.value)
    }

    const onPasswordChange = e => {
        setPasswordValue(e.target.value)
    }

    const onEmailChange = e => {
        setEmailValue(e.target.value)
    }


    const logoutHandler = () => {
        dispatch(logout(token));
    }

    const cancelHandler = () => {
        setNameValue(name);
        setEmailValue(email);
        setPasswordValue('');
    }

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateUserInfo(emailValue, passwordValue, nameValue));
    }

    return (
        <>
        {!isAuth && <Redirect to='/login' />}
        <section className={style.profile}>
        <div className={style.profile__wrapper}>
            <div className={style.profile__links}>
            <NavLink to={'/'} className={`${style.link} text text_type_main-medium`}>Профиль</NavLink>
            <NavLink to={'/'} className={`${style.link} text text_type_main-medium`}>История заказов</NavLink>
            <button onClick={logoutHandler} className={`${style.button} text text_type_main-medium`}>Выход</button>
                <p className={`${style.profile__paragraph} text text_type_main-default text_color_inactive`}>В этом разделе вы можете
                    изменить свои персональные данные</p>
            </div>
        <form className={style.profile__inputs} onSubmit={updateHandler}>
            <EmailInput name='email' onChange={onEmailChange} value={emailValue}/>
            <Input type='text' value={nameValue} placeholder='Имя'  onChange={onNameChange} icon="EditIcon"/>
            <Input type='password' value={passwordValue} placeholder='Пароль' onChange={onPasswordChange} icon="EditIcon"/>
            <Button htmlType={'submit'}>Сохранить</Button>
            <Button onClick={cancelHandler}>Отмена</Button>
        </form></div>
        </section></>
    )
}
