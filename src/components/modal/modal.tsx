import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

function Modal(data: any) {
    const modal = document.getElementById("modal")!;

    const onKeyDown = (event: any) => {
        if (event.keyCode === 27) {
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
            <ModalOverlay data={data} closeModal={data.closeModal}/>
        </div>),
        modal
    );
}

export default Modal;

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    type: PropTypes.string,
    data: PropTypes.any
};
