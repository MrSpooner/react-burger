import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
import Style from './modal.module.css'

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
        (<div>
            <div onClick={(e) => e.stopPropagation()}>
                <div className={Style.wrapper} onClick={() => {data.closeModal()}}></div>
            </div>

            <ModalOverlay closeModal={data.closeModal}/>
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
