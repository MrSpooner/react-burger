import React from 'react';
import OverlayStyle from './modal-overlay.module.css';

function ModalOverlay(data) {
    const onClick = () => {
        data.closeModal();
    };

    return <div className={OverlayStyle.background} onClick={onClick}></div>
}

export default ModalOverlay;