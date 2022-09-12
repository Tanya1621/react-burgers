import React from 'react';
import PropTypes from "prop-types";

import styles from './ModalOverlay.module.css';

const ModalOverlay = ({closePopup, isOpen, children}) => {
    const handleClose = React.useCallback((e) => {
        if (e.key === 'Escape') {
            closePopup();
        }
    }, [])

    React.useEffect(() => {
        document.addEventListener('keydown', handleClose)
        return () => document.removeEventListener('keydown', handleClose)
    }, [])


    return (
        isOpen && (
            <div onClick={(evt) => {
                closePopup(evt)
            }} className={styles.modalOverlay}>
                {children}
            </div>)
    )
};

ModalOverlay.propTypes = {
    closePopup: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
}

export default ModalOverlay;