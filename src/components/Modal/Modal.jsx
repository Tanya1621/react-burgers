import React from "react";
import styles from "./Modal.module.css";
import {createPortal} from 'react-dom'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import {ingredientInfoShort} from "../../utils/ingredientsInfoShort";
import ModalCloseButton from "../ModalHeader/ModalCloseButton";


const Modal = ({isOpen, setVisibility, children}) => {
    function closePopup() {
        setVisibility(false);
    }

    React.useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closePopup();
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])

    return createPortal((
        <ModalOverlay isOpen={isOpen} closePopup={closePopup}>
            <div className={styles.popup} onClick={(e) => {
                e.stopPropagation()
            }}>
                <ModalCloseButton closePopup={closePopup}></ModalCloseButton>
                {children}
            </div>
        </ModalOverlay>
    ), document.getElementById("react-modals"))
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    ingredientInfo: ingredientInfoShort,
    children: PropTypes.node.isRequired,
    setVisibility: PropTypes.func.isRequired,
}
export default Modal;