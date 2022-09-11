import React from "react";
import styles from "./Modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {createPortal} from 'react-dom'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import PropTypes from "prop-types";


const Modal = ({isOpen, setVisibilty, type, ingredientInfo}) => {
    const closePopup = () => {
        setVisibilty(false);
    }

    return createPortal((
        <>
            <ModalOverlay isOpen={isOpen} closePopup={closePopup}>
                <div className={isOpen ? styles.popup : styles.popup_inactive}>
                    <div className={styles.popupButton}>
                        <CloseIcon type={"primary"} onClick={closePopup}/></div>
                    {type === 'order' &&
                        <OrderDetails></OrderDetails>
                    }
                    {type === 'ingredient' &&
                        <IngredientDetails ingredientInfo={ingredientInfo}></IngredientDetails>
                    }
                </div>
            </ModalOverlay>
        </>), document.getElementById("react-modals"))
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    ingredientInfo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
    })
}
export default Modal;
