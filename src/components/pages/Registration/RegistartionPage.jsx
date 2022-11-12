import style from "./RegistrationPage.module.css";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink, Redirect} from "react-router-dom";
import React from "react";
import {registerRequest} from "../../../services/api";
import {register} from "../../../services/actions";
import {store} from "../../../index";
import {useDispatch, useSelector} from "react-redux";


export const RegistrationPage = () => {
    const [emailValue, setEmailValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const [nameValue, setNameValue] = React.useState('');
    const {isAuth} = useSelector(store => store.authReducer);
    const dispatch = useDispatch();
    const onEmailChange = e => {
        setEmailValue(e.target.value)
    }

    const onNameChange = e => {
        setNameValue(e.target.value)
    }

    const onPasswordChange = e => {
        setPasswordValue(e.target.value)
    }


    const registrationHandler = () => {
        dispatch(register(emailValue,passwordValue,nameValue));
    }


    return (
        <>
        {isAuth && <Redirect to='/profile' />}
        <section className={style.reg_page}>
            <div className={style.reg_page__inputs}>
                <h2 className='text text_type_main-medium'>Регистрация</h2>
                <Input type='text' placeholder='Имя' value={nameValue} name={'name'} onChange={onNameChange}/>
                <Input type='email' placeholder='E-mail' value={emailValue} name={'email'} onChange={onEmailChange}/>
                <PasswordInput value={passwordValue} name={'password'} onChange={onPasswordChange}/>
                <Button type='primary' size='medium' onClick={registrationHandler}>Зарегистрироваться</Button></div>
            <div>
                <p className={`text text_type_main-small mb-4 ${style.paragraph}`}>Уже зарегистрированы? <NavLink to='/login' className={style.link}>Войти</NavLink></p>
            </div>
        </section>
        </>
    )
}