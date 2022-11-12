import style from "./ResetPasswordPage.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, Redirect} from "react-router-dom";
import React from "react";
import {resetPassword} from "../../../services/api";
import {useSelector} from "react-redux";


export const ResetPasswordPage = () => {
    const [passwordValue, setPasswordValue] = React.useState('');
    const [codeValue, setCodeValue] = React.useState('');
    const token = useSelector(store => store.authReducer.token);
    const [isRequested, setRequest] = React.useState(false);
    const [isSuccessful, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);

    const onNameChange = e => {
        setCodeValue(e.target.value)
    }

    const onPasswordChange = e => {
        setPasswordValue(e.target.value)
    }

    const resetHandler = () => {
        setRequest(true);
        resetPassword(passwordValue, token)
            .then((res) => {
                if(res && res.success) {
                    console.log(res);
                   setSuccess(true);
                }
                else {
                    setError(true);
                }
            })
            .catch(() => setError(true))
            .finally(() => setRequest(false))

    }

  return (<section className={style.reset_page}>
      {isSuccessful && <Redirect to='/login' />}
        <div className={style.reset_page__inputs}>
            <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
            <Input type='password' placeholder='Введите новый пароль' value={passwordValue} name={'password'} onChange={onPasswordChange}/>
            <Input type='text' placeholder='Введите код из письма' value={codeValue} name={'email'} onChange={onNameChange}/>
            {error &&  <p className={`text text_type_main-small ${style.paragraph}`}>Произошла ошибка, попробуйте снова</p>}
            <Button type='primary' size='medium' onClick={resetHandler}>{isRequested? 'Сохранение...' : "Сохранить" }</Button></div>
        <div>
            <p className={`text text_type_main-small mb-4 ${style.paragraph}`}>Вспомнили пароль? <NavLink to='/login' className={style.link}>Войти</NavLink></p>
        </div>
    </section>)
}