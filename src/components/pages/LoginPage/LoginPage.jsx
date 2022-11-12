import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, Redirect} from "react-router-dom";
import style from './LoginPage.module.css'
import {useDispatch, useSelector} from "react-redux";
import {authorization} from "../../../services/actions";


export const LoginPage = () => {
    const [emailValue, setEmailValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const {isAuth} = useSelector(store => store.authReducer);
    const dispatch = useDispatch();
    const onEmailChange = e => {
        setEmailValue(e.target.value)
    }

    const onPasswordChange = e => {
        setPasswordValue(e.target.value)
    }

    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(authorization(emailValue, passwordValue));
    }
    return (
        <>
        {isAuth && <Redirect to='/profile' />}
        <section className={style.login_page}>
            <form className={style.login_page__inputs} onSubmit={loginHandler}>
                <h2 className='text text_type_main-medium'>Войти</h2>
                <Input type='email' placeholder='E-mail' value={emailValue} name={'email'} onChange={onEmailChange} />
                <PasswordInput value={passwordValue} name={'password'} onChange={onPasswordChange} extraClass={style.input} />
                <Button type='primary' size='medium' htmlType={'submit'}>Войти</Button></form>
            <div>
                <p className={`text text_type_main-small mb-4 ${style.paragraph}`}>Вы новый пользователь? <NavLink to='/register' className={style.link}>Зарегистрироваться</NavLink></p>
                <p className={`text text_type_main-small ${style.paragraph}`}>Забыли пароль? <NavLink to='/forgot-password' className={style.link}>Восстановить пароль</NavLink></p>
            </div>
        </section></>
    )
}