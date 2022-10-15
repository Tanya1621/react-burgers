import style from "../BurgerConstructor/BurgerConstructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {REMOVE_ITEM, SORT_ITEMS} from "../../services/actions";
import {useDispatch} from "react-redux";
import {store} from "../../index";
import {useDrag, useDrop} from "react-dnd";
import {useRef} from "react";

export const AddedIngredient = ({ingredient, index}) => {
    const id = ingredient._id;
    ingredient.index = index;
    const dispatch = useDispatch();
    const startIndex = useRef(null);
    const endIndex = useRef(null);


    const [, dragIngredient] = useDrag({
        type: 'item',
        item: ingredient,
    })
    let dragIndex;
        let hoverIndex;
    const [, dropIngredient] = useDrop( {
        accept: 'item',
        drop(item) {
            const dragged = item.index;
            const dropped = index;
            dispatch({type: SORT_ITEMS, dragged, dropped, item})}


    })

    const ref = useRef(null);
    const dragNDropIngredient = dropIngredient(dragIngredient(ref));

    const onHandleClose = () => {
        dispatch({type: REMOVE_ITEM, index});
        console.log(index);
        console.log(store.getState());}


        // const onDragEnd = () => {
        //     console.log('this is end index ' + endIndex.current)
        //     const a = startIndex.current;
        //     const b = endIndex.current;
        //     dispatch({type: SORT_ITEMS, a, b, item});
        //     endIndex.current = null;
        //     startIndex.current = null;
        // }

    return (
        <div className={style.constructor__element} key={ingredient._id} ref={dragNDropIngredient}>
        {/*//      onDragStart={(e) =>   startIndex.current = index}*/}
        {/*// onDragEnter={(e) =>  endIndex.current = index}*/}
        {/*//     onDragEnd={onDragEnd}*/}
            <DragIcon type='primary'/>
            <ConstructorElement
                text={ingredient.name}
                thumbnail={ingredient.image}
                price={ingredient.price} handleClose={() => onHandleClose()}/>
        </div>)
}