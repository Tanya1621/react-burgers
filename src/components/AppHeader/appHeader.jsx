import {
    Logo,
    ProfileIcon,
    ListIcon,
    BurgerIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

//Style
import style from './appHeader.module.css'



function AppHeader() {

    return (
        <header className={style.header}>
            <nav className={style.navigation}>
                <div className={style.wrapper}>
                <BurgerIcon type={"primary"} />
                    <p className={style.paragraph}>Конструктор</p>
            </div>
                <div className={style.wrapper_order}>
                    <ListIcon />
                    <p className={style.paragraph}>Лента заказов</p>
                </div>
            </nav>
            <Logo className={style.logo} />
            <div className={style.wrapper_profile}>
            <ProfileIcon type={"secondary"} />
                <p className={style.paragraph}>Личный кабинет</p>
        </div>
        </header>
    )
}

export default AppHeader;