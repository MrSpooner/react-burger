import React from 'react';
import OverlayStyle from './modal-overlay.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Overlay from './modal-overlay.module.css'
import PropTypes from "prop-types";

function ModalOverlay(data) {
    const closeModal = () => {
        data.closeModal();
    }

    return <div className={OverlayStyle.background}>
        <div className={Overlay.close} onClick={(e) => e.stopPropagation()}>
            <CloseIcon type="primary" onClick={closeModal}/>
        </div>
    </div>
}

export default ModalOverlay;

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired,
};