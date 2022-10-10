import React from 'react';
import PropTypes from "prop-types";

import styles from './ModalOverlay.module.css';
import {useSelector} from "react-redux";

const ModalOverlay = ({closePopup, children}) => {
    const isOpen = useSelector(store => store.popupReducer.isOpened);
    return (
            <div onClick={() => {
                closePopup()
            }} className={isOpen ? `${styles.modalOverlay} ${styles.modalOverlay_active}` : styles.modalOverlay}>
                {children}
            </div>)
};

ModalOverlay.propTypes = {
    closePopup: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default ModalOverlay;