import React from 'react';
import OverlayStyle from './modal-overlay.module.css';

type TModalOverlay ={
    closeModal: () => void;
}

const ModalOverlay: React.FC<TModalOverlay> = (data: TModalOverlay) => {
    const onClick = () => {
        data.closeModal();
    };

    return <div className={OverlayStyle.background} onClick={onClick}></div>
}

export default ModalOverlay;