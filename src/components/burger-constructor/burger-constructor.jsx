import React from 'react';
import ConstructorItem from '../burger-constructor-item/burger-constructor-item';
import Items from './burger-constructor.module.css';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";
import OrderDetails from '../modal-order-details/order-details'
import PropTypes from "prop-types";
import {Data} from "../../utils/prop-types";

function BurgerConstructor(data) {
    const [isModal, setModal] = React.useState(false);

    const onClick = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    return (
        <div className={`${Items.element} mt-25`}>
            <ConstructorItem data={data.productData[0]} type='top'/>

            <div className={`${Items.ingredients} custom-scroll`}>
                {data.productData.slice(1).map((item, index) => {
                    return (
                        <div key={index}>
                            <ConstructorItem data={item}/>
                        </div>
                    )
                })}
            </div>

            <ConstructorItem data={data.productData[0]} type='bottom'/>

            <div className={Items.ordering}>
                <span className='text text_type_main-medium mr-2'>610</span>
                <CurrencyIcon type="primary"/>
                <Button htmlType="button" type="primary" size="medium" extraClass="ml-10" onClick={onClick}>
                    Оформить заказ
                </Button>
                {isModal && (
                    <Modal closeModal={closeModal}>
                        <OrderDetails/>
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
    productData: PropTypes.arrayOf(PropTypes.shape(Data)).isRequired
};