import {
    ConstructorElement, Button, CurrencyIcon, DragIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import style from './BurgerConstructor.module.css'
import PropTypes from 'prop-types';
import {ingredientType} from "../../utils/ingredientType";

const BurgerConstructor = ({ingredients}) => {
    const bun = ingredients.filter((element) => element.type === 'bun');
    return (<section className={style.constructor} area-label='Выбранные ингредиенты'>
        <div className={style.constructor__element_last}>
            <ConstructorElement text={`${bun[0].name} (верх)`} thumbnail={bun[0].image} price={bun[0].price}
                                isLocked={true} type={"top"} key={'1'}/>
        </div>
        <div className={style.constructor__list}>
            {ingredients.map((element, index) => {
                if (element.type !== 'bun') {
                    return (<div className={style.constructor__element} key={element._id}>
                        <DragIcon type={'primary'}/>
                        <ConstructorElement
                            text={element.name}
                            thumbnail={element.image}
                            price={element.price}/>
                    </div>)
                }
            })}  </div>
        <div className={style.constructor__element_last}>
            <ConstructorElement text={`${bun[0].name} (низ)`} thumbnail={bun[0].image} price={bun[0].price}
                                isLocked={true} type={'bottom'} key={'2'}/>
        </div>
        <div className={style.constructor__total}>
            <p className={`text text_type_digits-medium ${style.constructor__price}`}>610</p>
            <div className={style.constructor__sign}><CurrencyIcon type={"primary"}></CurrencyIcon></div>
            <Button className={style.constructor__price}>Оформить заказ</Button>

        </div>
    </section>)
}

BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType).isRequired
}


export default BurgerConstructor;