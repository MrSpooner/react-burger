import React, {ReactNode} from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from "../modal-overlay/modal-overlay";
import Style from './modal.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const ESC_KEYCODE = 27

type TModal ={
    closeModal: () => void;
    children?: ReactNode
}

const Modal: React.FC<TModal> = (data: TModal) => {
    const modal = document.getElementById("modal") as HTMLElement;

    const onKeyDown = (event: KeyboardEvent) => {
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
            <ModalOverlay closeModal = {data.closeModal}/>

            <div className={Style.background}>
                <div className={Style.close} data-cy={"ModalButtonClose"}>
                    <CloseIcon type="primary" onClick={data.closeModal} />
                </div>
            </div>

            {data.children}
        </div>),
        modal
    );
}

export default Modal;