import React from 'react';
import PropTypes from "prop-types";

import styles from './ModalOverlay.module.css';

const ModalOverlay = ({closePopup, isOpen, children}) => {
    const handleClose = React.useCallback((e) => {
        if (e.key === 'Escape') {
            e.preventDefault();
            closePopup();
        }
    }, [])

    React.useEffect(() => {
        document.addEventListener('keydown', handleClose)
        return () => document.removeEventListener('keydown', handleClose)
    }, [])


    return (
        <>
            {isOpen &&
                <div onClick={(e) => {e.stopPropagation(); closePopup() }} className={styles.modalOverlay}>
                    {children}
                </div>}
        </>)
};

ModalOverlay.propTypes = {
    closePopup: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
}

export default ModalOverlay;