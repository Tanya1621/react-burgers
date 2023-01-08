import style from "../BurgerConstructor/BurgerConstructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC, ReactNode} from "react";
import {DECREASE_COUNTER, REMOVE_ITEM, SORT_ITEMS} from "../../services/actions";
import {useDrag, useDrop} from "react-dnd";
import {useRef} from "react";
import PropTypes from "prop-types";
import {useDispatch} from "../../services/types/hooks";
import {TIngredient} from "../../services/types/types";

type Twithindex = TIngredient & {
    index?: number
}

export const AddedIngredient: FC<{ingredient: Twithindex, index: number}> = ({ingredient, index}) => {
    ingredient.index = index;
    const dispatch = useDispatch();


    const [, dragIngredient] = useDrag({
        type: 'item',
        item: ingredient,
    })
    const [, dropIngredient] = useDrop({
        accept: 'item',
        drop(item: Twithindex) {
            const dragged = item.index;
            const dropped = index;
            dispatch({type: SORT_ITEMS, dragged, dropped, item})
        }


    })

    const ref = useRef<HTMLDivElement>(null);
    const dragNDropIngredient: any = dropIngredient(dragIngredient(ref));

    const onHandleClose = () => {
        dispatch({type: REMOVE_ITEM, index, ingredient});
        dispatch({type: DECREASE_COUNTER, ingredient})
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