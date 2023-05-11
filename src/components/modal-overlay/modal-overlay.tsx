import React from 'react';
import OverlayStyle from './modal-overlay.module.css';
import IngredientDetails from "../modal-ingredient-details/ingredient-details";
import OrderDetails from "../modal-order-details/order-details";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Overlay from './modal-overlay.module.css'
import PropTypes from "prop-types";

function ModalOverlay(data: any) {
    const closeModal = () => {
        data.closeModal();
    }

    return <div className={OverlayStyle.background}>
        <div className={Overlay.close}>
            <CloseIcon type="primary" onClick={closeModal}/>
        </div>
        {data.data.type === 'ingredients' ? <IngredientDetails data={data.data.data}/> : <OrderDetails/>}
    </div>
}

export default ModalOverlay;

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired,
    data: PropTypes.shape({
        type: PropTypes.string,
        data: PropTypes.any
    })
};