import style from './ForgotPassword.module.css'
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {NavLink, Redirect} from "react-router-dom";
import {restorePassword} from "../../services/api";

export const ForgotPassword = () => {
    const [emailValue, setEmailValue] = React.useState('');
    const [isReseted, setReset] = React.useState(false);
    const [isRequested, setRequest] = React.useState(false);
    const [error, setError] = React.useState(false);

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailValue(e.target.value)
    }

    const restoreHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
            {isReseted && <Redirect to='/reset-password'></Redirect>}
            <section className={style.password_page}>
                <div className={style.password__input}>
                    <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
                    <form onSubmit={restoreHandler}>
                        <Input type='email' placeholder='E-mail' value={emailValue} name={'email'}
                               onChange={onEmailChange}/>
                        {error && <p className='text text_type_main-small'>Произошла ошибка, попробуйте снова</p>}
                        <Button type='primary' size='medium'
                                htmlType={"submit"}>{isRequested ? 'Восстановление...' : "Восстановить"}</Button>
                    </form>
                </div>
                <p className={`text text_type_main-small mb-4 ${style.paragraph}`}>Уже зарегистрированы? <NavLink
                    to='/login' className={style.link}>Войти</NavLink></p>
            </section>
        </>)
}