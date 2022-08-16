import {
    Logo,
    ProfileIcon,
    ListIcon,
    BurgerIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import style from './appHeader.module.css'


function AppHeader() {

    return (
        <header className={style.header}>
            <nav className={style.header__navigation}>
                <a className={style.header__wrapper} href={'#'}>
                    <BurgerIcon type={"primary"}/>
                    <p className={`${style.header__paragraph} text text_type_main-default`}>Конструктор</p>
                </a>
                <a className={style.header__wrapper_order} href={'#'}>
                    <ListIcon type={"secondary"}/>
                    <p className={`${style.header__paragraph} text text_type_main-default`}>Лента заказов</p>
                </a>
            </nav>
            <Logo className={style.header__logo}/>
            <a className={style.header__wrapper_profile} href={'#'}>
                <ProfileIcon type={"secondary"}/>
                <p className={`${style.header__paragraph} text text_type_main-default`}>Личный кабинет</p>
            </a>
        </header>
    )
}

export default AppHeader;