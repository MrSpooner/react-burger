import React from 'react';
import {CheckMarkIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Details from './order-details.module.css'

type TOrderNumber ={
    orderNumber: number
}

const OrderDetails: React.FC<TOrderNumber> = (orderNumber: TOrderNumber) => {
    return (
        <div className={Details.elements}>
            <p className="text text_type_digits-large">{orderNumber.orderNumber}</p>
            <p className="text text_type_main-medium mb-9 mt-9">идентификатор заказа</p>
            <CheckMarkIcon type="primary"/>
            <p className='mt-9'>Ваш заказ начали готовить</p>
            <p className='text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
        </div>
    );
}

export default OrderDetails;
