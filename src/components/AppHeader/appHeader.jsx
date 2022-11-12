import {
    Logo,
    ProfileIcon,
    ListIcon,
    BurgerIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import style from './appHeader.module.css'
import { NavLink} from "react-router-dom";


function AppHeader() {

    return (
        <header className={style.header}>
            <nav className={style.header__navigation}>
                <NavLink  to='/' className={style.header__wrapper}>
                    <BurgerIcon type={"primary"}/>
                    <p className={`${style.header__paragraph} text text_type_main-default`}>Конструктор</p>
                </NavLink >
                <a className={style.header__wrapper_order} href={'#'}>
                    <ListIcon type={"secondary"}/>
                    <p className={`${style.header__paragraph} text text_type_main-default`}>Лента заказов</p>
                </a>
            </nav>
            <Logo />
            <NavLink to='/login' className={style.header__wrapper_profile}>
                <ProfileIcon type={"secondary"}/>
                <p className={`${style.header__paragraph} text text_type_main-default`}>Личный кабинет</p>
            </NavLink>
        </header>
    )
}

export default AppHeader;