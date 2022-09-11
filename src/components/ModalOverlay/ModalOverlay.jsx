import React from 'react';

import styles from './ModalOverlay.module.css';

const ModalOverlay = ({closePopup, isOpen, children}) => {
    return (
        <>
            {isOpen &&
                <div onClick={() => closePopup()} className={styles.modalOverlay}>
                    {children}
                </div>}
        </>)
};

export default ModalOverlay;