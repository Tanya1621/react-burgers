import {FC, ReactNode} from "react";
import styles from "./Modal.module.css";
import {createPortal} from 'react-dom'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import ModalCloseButton from "../ModalHeader/ModalCloseButton";
import {useDispatch} from "react-redux";
import {CLOSE_POPUP} from "../../services/actions";
import React from "react";


const Modal: FC<{ children: ReactNode, close: () => void }> = ({children, close}) => {
    const dispatch = useDispatch();

    function closePopup() {
        if (close) close();
        dispatch({type: CLOSE_POPUP})
    }

    React.useEffect(() => {
        function closeByEscape(evt: KeyboardEvent) {
            if (evt.key === 'Escape') {
                closePopup();
            }
        }

        document.addEventListener('keydown', closeByEscape);
        return () => {
            document.removeEventListener('keydown', closeByEscape);

        }
    }, [])

    const element = document.getElementById("react-modals") as HTMLElement;

    return createPortal((<ModalOverlay closePopup={closePopup}>
            <div className={styles.popup} onClick={(e) => {
                e.stopPropagation()
            }}>
                <ModalCloseButton closePopup={closePopup}></ModalCloseButton>
                {children}
            </div>
        </ModalOverlay>), element)
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
}
export default Modal;