import React from 'react';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import Modal from "../modal/modal";

function ConstructorItem(data: any) {
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
                type = {data.type}
                text={data.data.name}
                price={data.data.price}
                thumbnail={data.data.image_mobile}
            />
            {isModal && (
                <Modal closeModal={closeModal} data = {data.data} type = 'ingredients'/>
            )}
        </div>
    );
}

export default ConstructorItem;

ConstructorItem.propTypes = {
    type:  PropTypes.string,
    data: PropTypes.shape({
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image_mobile: PropTypes.string.isRequired,
        }).isRequired,
};

