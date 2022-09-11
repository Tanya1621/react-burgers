import React from "react";
import styles from "./Modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {createPortal} from 'react-dom'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import PropTypes from "prop-types";
import {ingredientType} from "../../utils/ingredientType";


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
    isOpen: PropTypes.bool.isRequired
}
export default Modal;
