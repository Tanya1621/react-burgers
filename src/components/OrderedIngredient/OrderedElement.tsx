import styles from './OrderedIngredient.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {FC} from "react";
import {TIngredient} from "../../services/types/types";

export const OrderedElement: FC<{item: TIngredient}> = ({item}) => {
    return (
        <div className={styles.item__wrapper}>
            <img className={styles.item__image} src={item.image}/>
            <p className={`${styles.item__name} text text_type_main-default`}>{item.name}</p>
            <div className={styles.item__price}>
                <p className={`${styles.item__number} text text_type_digits-default`}>{item.price}</p>
                <CurrencyIcon type={"primary"}/>
            </div>
        </div>
    )
}