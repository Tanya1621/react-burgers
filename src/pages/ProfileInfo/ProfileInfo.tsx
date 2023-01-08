import style from "../ProfilePage/ProfilePage.module.css";
import {Button, EmailInput, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useEffect} from "react";
import {getUserData} from "../../services/api";
import {logout, UPDATE_USER_INFO, updateUserInfo} from "../../services/actions";
import {useDispatch, useSelector } from "../../services/types/hooks";


export const ProfileInfo = () => {
    let name = useSelector(store => store.authReducer.name);
    let email = useSelector(store => store.authReducer.email)
    const [nameValue, setNameValue] = React.useState('');
    const [passwordValue, setPasswordValue] = React.useState('');
    const [emailValue, setEmailValue] = React.useState('');
    const dispatch = useDispatch();
    const [changed, setChanged] = React.useState(false);
    useEffect(() => {
        getUserData().then((res) => {
            if (res.success && res) {
                dispatch({type: UPDATE_USER_INFO, user: {name: res.user.name, email: res.user.email}})
                setEmailValue(res.user.email);
                setNameValue(res.user.name);
            }
        })
    }, []);
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChanged(true);
        setNameValue(e.target.value)
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChanged(true);
        setPasswordValue(e.target.value)
    }

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChanged(true);
        setEmailValue(e.target.value)
    }




    const cancelHandler = () => {
        setNameValue(name);
        setEmailValue(email);
        setPasswordValue('');
        setChanged(false);
    }

    const updateHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUserInfo(emailValue, passwordValue, nameValue));
    }

    return (
        <form className={style.profile__inputs} onSubmit={updateHandler}>
            <EmailInput name='email' onChange={onEmailChange} value={emailValue}/>
            <Input type='text' value={nameValue} placeholder='Имя' onChange={onNameChange} icon="EditIcon"/>
            <Input type='password' value={passwordValue} placeholder='Пароль' onChange={onPasswordChange}
                   icon="EditIcon"/>
            <div className={style.profile__button_area}>
                {changed && <><Button onClick={cancelHandler}
                                      type={'secondary'} htmlType='button'>Отмена</Button>
                    <Button htmlType={'submit'}>Сохранить</Button></>}
            </div>
        </form>
    )
}