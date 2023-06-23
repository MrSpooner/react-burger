import React from 'react';
import ConstructorItem from '../burger-constructor-item/burger-constructor-item';
import Items from './burger-constructor.module.css';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector, useDispatch} from 'react-redux';
import {nanoid} from '@reduxjs/toolkit';
import {ADD_BUNS, ADD_ITEMS} from "../../services/actions/orderConstructor";
import {useDrop} from "react-dnd";
import {getOrder} from "../../services/actions/order";
import {useNavigate} from "react-router-dom";
import Modal from "../modal/modal";
import OrderDetails from "../modal-order-details/order-details";

function BurgerConstructor() {
    const dispatch = useDispatch();
    const [isModal, setModal] = React.useState(false);
    const orderNumber = useSelector(store => store.order.number);
    const constructorItems = useSelector(store => store.orderConstructor.constructorItems);
    const bun = useSelector(store => store.orderConstructor.bun);
    const navigate = useNavigate();
    const {isAuth} = useSelector((state) => state.user);

    const onClick = () => {
        if (isAuth) {
            dispatch(getOrder(ingredientsId));
        } else {
            navigate("/login");
        }
        setModal(true);
    }

    const addItem = (item) => {
        const ingredient = {item, id: nanoid()};
        const type = item.type;

        if (type === "bun") {
            dispatch({type: ADD_BUNS, bun: item})
        } else {
            dispatch({type: ADD_ITEMS, constructorItems: ingredient})
        }
    };

    const price = React.useMemo(() => {
        let result = 0;

        if (bun) {
            result = bun.price + bun.price;
        }

        if (constructorItems) {
            constructorItems.forEach((item) => {
                result += item.item.price;
            });
        }

        return result;
    }, [bun, constructorItems]);

    const dropConf = {
        accept: "ingredients",
        drop(item) {
            addItem(item);
        },
    };

    const [, itemsDrop] = useDrop(dropConf);
    const [, emptyDrop] = useDrop(dropConf);

    const closeModal = () => {
        setModal(false);
    }

    const ingredientsId = React.useMemo(() => {
        let constructorItemsIds = [];

        constructorItemsIds.push(bun._id);

        constructorItems.forEach((item) => {
            constructorItemsIds.push(item.item._id);
        });

        return constructorItemsIds;
    }, [bun, constructorItems]);

    return (
        <div className={`${Items.element} mt-25`} ref={itemsDrop}>
            {Object.keys(bun).length === 0 && Object.keys(constructorItems).length === 0 && (
                <div ref={emptyDrop}>
                    <div className={Items.empty}></div>
                </div>
            )}

            {Object.keys(bun).length !== 0 && (
                <ConstructorItem data={bun} type='top'/>
            )}

            <div className={`${Items.ingredients} custom-scroll`}>
                {Object.keys(constructorItems).length !== 0 && constructorItems.map((item, index) => (
                    <ConstructorItem data={item.item} index={index} key={item.id} myId={item.id}/>
                ))
                }
            </div>

            {Object.keys(bun).length !== 0 && (
                <ConstructorItem data={bun} type='bottom'/>
            )}

            {(price > 0) && (
                <div className={Items.ordering}>
                    <span className='text text_type_main-medium mr-2'>{price}</span>
                    <CurrencyIcon type="primary"/>
                    <Button htmlType="button" type="primary" size="medium" extraClass="ml-10" onClick={onClick}>
                        Оформить заказ
                    </Button>

                </div>
            )}

            {isModal && (
                <Modal closeModal={closeModal}>
                    <OrderDetails orderNumber={orderNumber}/>
                </Modal>
            )}
        </div>
    );
}

export default BurgerConstructor;