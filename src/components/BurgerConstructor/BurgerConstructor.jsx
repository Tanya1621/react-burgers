import {
    ConstructorElement, Button, LockIcon, CurrencyIcon, DragIcon, DeleteIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import {data} from "../../utils/data";
import style from './BurgerConstructor.module.css'
import PropTypes from 'prop-types';
import {checkingPropTypes} from "../../utils/checkproptype";

const BurgerConstructor = ({props}) => {
    const bun = props.filter((element) => element.type === 'bun');
    return (<section className={style.constructor}>

            <div className={style.constructor__element_last}>
                <ConstructorElement text={`${bun[0].name} (верх)`} thumbnail={bun[0].image} price={bun[0].price}
                                    isLocked={true} type={"top"} />
            </div>
            <div className={style.constructor__list}>
                {props.map((element, index) => {
                    if (element.type !== 'bun') {
                        return (<div className={style.constructor__element}>
                            <DragIcon type={'primary'} key={index}/><ConstructorElement key={element._id} text={element.name} thumbnail={element.image} price={element.price}/>
                        </div>)
                    }
                })}  </div>
            <div className={style.constructor__element_last}>
                <ConstructorElement text={`${bun[0].name} (низ)`} thumbnail={bun[0].image} price={bun[0].price}
                                    isLocked={true} type={'bottom'} />
            </div>
            <div className={style.constructor__total}>
                <p className={`text text_type_digits-medium ${style.constructor__price}`}>610</p>
               <div className={style.constructor__sign}> <CurrencyIcon type={"primary"}></CurrencyIcon></div>
                <Button className={style.constructor__price}>Оформить заказ</Button>

            </div>
        </section>)
}

    BurgerConstructor.propTypes = {
        props: PropTypes.arrayOf(checkingPropTypes).isRequired
}


export default BurgerConstructor;