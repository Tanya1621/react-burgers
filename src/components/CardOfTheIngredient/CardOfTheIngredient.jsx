import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

import style from './CardOfTheIngredient.module.css';
import {ingredientType} from "../../utils/ingredientType";
import PropTypes from "prop-types";


const CardOfTheIngredient = ({data, onClick}) => {
    return (
        <div className={style.card} onClick={onClick}>
            <Counter count={1} size="default"/>
            <img alt={data.name} src={data.image} className={style.card_image}/>
            <div className={style.card_price}>
                <CurrencyIcon type="primary"/>
                <p className='text text_type_digits-default'>{data.price}</p>
            </div>
            <p className={`${style.card_text} text text_type_main-default`}>{data.name}</p>
        </div>
    )
}
CardOfTheIngredient.propTypes = {
    data: ingredientType.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default CardOfTheIngredient;