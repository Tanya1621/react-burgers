import styles from './IngredientDetails.module.css'
import React from "react";
import {ingredientInfoShort} from "../../utils/ingredientsInfoShort";
import {useSelector} from "react-redux";


const IngredientDetails = () => {
    const ingredientInfo = useSelector(store => store.popupReducer.ingredient);
    return (
        <>
            <h2 className={`${styles.popupIngredients_header} text text_type_main-large`}>Детали ингредиента</h2>
            <img src={ingredientInfo.image} className={styles.popupIngredients_pic}
                 alt={`Изображение ингредиента ${ingredientInfo.name}`}/>
            <p className={`${styles.popupIngredients_capture} text text_type_main-medium`}>{ingredientInfo.name}</p>
            <div className={styles.popupIngredients_info}>
                <div>
                    <p className={`${styles.popupIngredients_name} text text_type_main-default text_color_inactive`}>Калории,ккал</p>
                    <p className='text_color_inactive text text_type_digits-default'>{ingredientInfo.calories}</p>
                </div>
                <div>
                    <p className={`${styles.popupIngredients_name} text text_type_main-default text_color_inactive`}>Белки,
                        г</p>
                    <p className='text_color_inactive text text_type_digits-default'>{ingredientInfo.proteins}</p>
                </div>
                <div>
                    <p className={`${styles.popupIngredients_name} text text_type_main-default text_color_inactive`}>Жиры,
                        г</p>
                    <p className='text_color_inactive text text_type_digits-default'>{ingredientInfo.fat}</p>
                </div>
                <div>
                    <p className={`${styles.popupIngredients_name} text text_type_main-default text_color_inactive`}>Углеводы,
                        г</p>
                    <p className='text_color_inactive text text_type_digits-default'>{ingredientInfo.carbohydrates}</p>
                </div>
            </div>
        </>
    )
}


export default IngredientDetails;