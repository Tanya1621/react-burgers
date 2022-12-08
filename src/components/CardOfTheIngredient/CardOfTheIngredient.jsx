import {
    CurrencyIcon,
    Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

import style from './CardOfTheIngredient.module.css';
import {ingredientType} from "../../utils/ingredientType";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";


const CardOfTheIngredient = ({data, onClick}) => {
    const id = data._id;
    const itemsFromStore = useSelector(store => store.ingredientsReducer.items);
    const count = (itemsFromStore.find(item => item._id === id));
    const counter = count ? count.counter : 0;
    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: {id}
    })
    return (
        <div className={style.card} onClick={onClick} ref={dragRef}>
            {counter > 0 &&
                <Counter count={counter} size="default"/>
            }
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