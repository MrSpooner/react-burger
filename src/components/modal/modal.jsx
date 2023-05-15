import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import Style from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const ESC_KEYCODE = 27

function Modal(data) {
    const modal = document.getElementById("modal");

    const onKeyDown = (event) => {
        if (event.keyCode === ESC_KEYCODE) {
            data.closeModal();
        }
    }

    React.useEffect(() => {
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [onKeyDown]);

    return ReactDOM.createPortal(
        (<div onClick={(e) => e.stopPropagation()}>
            <div onClick={data.closeModal}>
                <ModalOverlay/>
            </div>

            <div className={Style.background}>
                <div className={Style.close}>
                    <CloseIcon type="primary" onClick={data.closeModal} className={Style.close}/>
                </div>
            </div>

            {data.children}
        </div>),
        modal
    );
}

export default Modal;

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
};
