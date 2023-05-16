import React from 'react';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import IngredientDetails from '../modal-ingredient-details/ingredient-details';
import { Data } from "../../utils/prop-types";

function ConstructorItem(data) {
    const [isModal, setModal] = React.useState(false);
    const onClick = () => {
        setModal(true);
    }
    const closeModal = () => {
        setModal(false);
    }

    return (
        <div onClick={onClick}>
            <ConstructorElement
                type={data.type}
                text={data.type === 'top' ? `${data.data.name}` + ' (верх)'
                    : data.type === 'bottom' ? `${data.data.name}` + ' (низ)' : data.data.name}
                price={data.data.price}
                thumbnail={data.data.image_mobile}
            />
            {isModal && (
                <Modal closeModal={closeModal}>
                    <IngredientDetails data={data.data}/>
                </Modal>
            )}
        </div>
    );
}

export default ConstructorItem;

ConstructorItem.propTypes = {
    type: PropTypes.string,
    data: PropTypes.shape(Data).isRequired,
};

