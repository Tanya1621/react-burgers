import style from './ForgotPassword.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {NavLink, Redirect} from "react-router-dom";
import {restorePassword} from "../../../services/api";
import {useSelector} from "react-redux";

export const ForgotPassword = () => {
    const [emailValue, setEmailValue] = React.useState('');
    const [isReseted, setReset] = React.useState(false);
    const [isRequested, setRequest] = React.useState(false);
    const [error, setError] = React.useState(false);
    const {isAuth} = useSelector(store => store.authReducer);

    const onEmailChange = e => {
        setEmailValue(e.target.value)
    }

    const restoreHandler = () => {
        setRequest(true);
        restorePassword(emailValue)
            .then((res) => {
                if (res && res.success) {
                    console.log(res);
                    setReset(true);
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true))
            .finally(() => setRequest(false))
    }

    return (
        <>
            {isAuth && <Redirect to='/profile' />}
            {isReseted && <Redirect to='/reset-password'></Redirect>}
            <section className={style.password_page}>
                <div className={style.password__input}>
                    <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
                    <Input type='email' placeholder='E-mail' value={emailValue} name={'email'}
                           onChange={onEmailChange}/>
                    {error && <p className='text text_type_main-small'>Произошла ошибка, попробуйте снова</p>}
                    <Button type='primary' size='medium'
                            onClick={restoreHandler}>{isRequested ? 'Восстановление...' : "Восстановить"}</Button>
                </div>
                <p className={`text text_type_main-small mb-4 ${style.paragraph}`}>Уже зарегистрированы? <NavLink
                    to='/login' className={style.link}>Войти</NavLink></p>
            </section>
        </>)
}