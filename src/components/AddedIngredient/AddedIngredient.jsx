import style from "../BurgerConstructor/BurgerConstructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {REMOVE_ITEM, SORT_ITEMS} from "../../services/actions";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {useRef} from "react";
import PropTypes from "prop-types";

export const AddedIngredient = ({ingredient, index}) => {
    const id = ingredient._id;
    ingredient.index = index;
    const dispatch = useDispatch();


    const [, dragIngredient] = useDrag({
        type: 'item',
        item: ingredient,
    })
    const [, dropIngredient] = useDrop({
        accept: 'item',
        drop(item) {
            const dragged = item.index;
            const dropped = index;
            dispatch({type: SORT_ITEMS, dragged, dropped, item})
        }


    })

    const ref = useRef(null);
    const dragNDropIngredient = dropIngredient(dragIngredient(ref));

    const onHandleClose = () => {
        dispatch({type: REMOVE_ITEM, index, ingredient});
    }


    return (
        <div className={style.constructor__element} key={ingredient._id} ref={dragNDropIngredient}>
            <DragIcon type='primary'/>
            <ConstructorElement
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient.price} handleClose={() => onHandleClose()}/>
        </div>)
}

AddedIngredient.propTypes = {
    index: PropTypes.number.isRequired,
    ingredient: PropTypes.object.isRequired,
}