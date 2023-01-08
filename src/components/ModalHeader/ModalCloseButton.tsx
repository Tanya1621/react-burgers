import styles from "./ModalCloseButton.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";

const ModalHeaderCloseButton: FC<{closePopup: () => void}> = ({closePopup}) => {
    return (
        <div className={styles.popupButton}>
            <CloseIcon type={"primary"} onClick={closePopup}/></div>)
}

export default ModalHeaderCloseButton;