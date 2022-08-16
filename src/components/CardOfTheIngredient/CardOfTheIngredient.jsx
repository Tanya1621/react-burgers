import {
    CurrencyIcon,
    Counter,
    Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';

import style from './CardOfTheIngredient.module.css';


const CardOfTheIngredient = (props) => {
    return (
        <div className={style.card}>
            <Counter count={1} size="default" />
            <img alt={props.children.name} src={props.children.image} className={style.card_image}/>
            <div className={style.card_price}>
                <CurrencyIcon type="primary"/>
                <p className='text text_type_digits-default'>{props.children.price}</p>
            </div>
            <p className='text text_type_main-default'>{props.children.name}</p>
        </div>
    )
}

export default CardOfTheIngredient;