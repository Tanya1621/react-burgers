import React from "react";
import styles from "./Modal.module.css";
import {createPortal} from 'react-dom'
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import ModalCloseButton from "../ModalHeader/ModalCloseButton";
import {useDispatch} from "react-redux";
import {CLOSE_POPUP} from "../../services/actions";


const Modal = ({children, close}) => {
    const dispatch = useDispatch();

    function closePopup() {
        if (close) close();
        dispatch({type: CLOSE_POPUP})
    }

    React.useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closePopup();
            }
        }

        document.addEventListener('keydown', closeByEscape);
        return () => {
            document.removeEventListener('keydown', closeByEscape);

        }
    }, [])

    return createPortal((<ModalOverlay closePopup={closePopup}>
            <div className={styles.popup} onClick={(e) => {
                e.stopPropagation()
            }}>
                <ModalCloseButton closePopup={closePopup}></ModalCloseButton>
                {children}
            </div>
        </ModalOverlay>), document.getElementById("react-modals"))
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
}
export default Modal;