import React, {FC, ReactNode} from 'react';
import PropTypes from "prop-types";

import styles from './ModalOverlay.module.css';

const ModalOverlay: FC<{closePopup: () => void, children: ReactNode}> = ({closePopup, children}) => {
    return (<div onClick={() => {
        closePopup()
    }} className={`${styles.modalOverlay} ${styles.modalOverlay_active}`}>
        {children}
    </div>)
};



export default ModalOverlay;