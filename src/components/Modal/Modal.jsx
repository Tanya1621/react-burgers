import React from "react";
import styles from "./Modal.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {createPortal} from 'react-dom'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
import PropTypes from "prop-types";
import {ingredientInfoShort} from "../../utils/ingredientsInfoShort";


const Modal = ({isOpen, setVisibilty, children}) => {
    function closePopup () {
        setVisibilty(false);
    }

    return createPortal((
            <ModalOverlay isOpen={isOpen} closePopup={closePopup}>
                <div className={isOpen ? styles.popup : styles.popup_inactive} onClick={(e)=> {e.stopPropagation()}}>
                    <div className={styles.popupButton}>
                        <CloseIcon type={"primary"} onClick={closePopup}/></div>
                    {children}
                </div>
            </ModalOverlay>
        ), document.getElementById("react-modals"))
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    ingredientInfo: ingredientInfoShort,
}
export default Modal;
