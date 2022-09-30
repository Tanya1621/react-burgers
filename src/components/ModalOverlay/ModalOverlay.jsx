import React from 'react';
import PropTypes from "prop-types";

import styles from './ModalOverlay.module.css';

const ModalOverlay = ({closePopup, isOpen, children}) => {
    return (
            <div onClick={() => {
                closePopup()
            }} className={isOpen ? `${styles.modalOverlay} ${styles.modalOverlay_active}` : styles.modalOverlay}>
                {children}
            </div>)
};

ModalOverlay.propTypes = {
    closePopup: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
}

export default ModalOverlay;