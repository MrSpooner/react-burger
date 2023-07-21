import React from 'react';
import ConstructorItem from '../burger-constructor-item/burger-constructor-item';
import Items from './burger-constructor.module.css';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {nanoid} from '@reduxjs/toolkit';
import {addBun, addOtherIngredient, resetConstructor} from "../../services/reduxToolkit/orderConstructor";
import {getOrder} from "../../services/reduxToolkit/order";
import {useDrop} from "react-dnd";
import {useLocation, useNavigate} from "react-router-dom";
import Modal from "../modal/modal";
import {useAppDispatch, useAppSelector} from '../../utils/useData';
import OrderDetails from "../modal-order-details/order-details";
import {TIngredient, TItemIngredient} from "../../utils/types";
import {Link} from "react-router-dom";
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor() {
    const dispatch = useAppDispatch();
    const [isModal, setModal] = React.useState(false);
    const orderNumber = useAppSelector(store => store.order.number);
    const constructorItems = useAppSelector(store => store.orderConstructor.constructorItems);
    const bun = useAppSelector(store => store.orderConstructor.bun);
    const navigate = useNavigate();
    const {isAuth} = useAppSelector((state) => state.user);
    const location = useLocation();

    const onClick = () => {
        if (isAuth) {
            dispatch(getOrder(ingredientsId));
            dispatch(resetConstructor())
        } else {
            navigate("/login");
        }

        setModal(true);
    }

    const addItem = (item: TIngredient) => {
        const ingredient = {item, id: nanoid()};
        const type = item.type;

        if (type === "bun") {
            dispatch(addBun(item));
        } else {
            dispatch(addOtherIngredient(ingredient));
        }
    };

    const price = React.useMemo(() => {
        let result = 0;

        if (bun) {
            result = bun.price + bun.price;
        }

        if (constructorItems) {
            constructorItems.forEach((item: { item: { price: number } }) => {
                result += item.item.price;
            });
        }

        return result;
    }, [bun, constructorItems]);

    const dropConf = {
        accept: "ingredients",
        drop(item: TIngredient) {
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

        bun && constructorItemsIds.push(bun._id);

        constructorItems && constructorItems.forEach((item: TItemIngredient) => {
            constructorItemsIds.push(item.item._id);
        });

        return constructorItemsIds;
    }, [bun, constructorItems]);

    return (
        <div>
            <div className={`${Items.element} mt-25`} ref={itemsDrop}>
                {bun === null && constructorItems?.length === 0 && (
                    <div ref={emptyDrop}>
                        <div className={Items.empty}></div>
                    </div>
                )}

                {bun !== null && (
                    <div>
                        <Link to={`/ingredient/${bun._id}`} state={{background: location}}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bun.name + " (верх)"}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                        </Link>
                    </div>
                )}

                <div className={`${Items.ingredients} custom-scroll`}>
                    {constructorItems?.length !== 0 && constructorItems?.map((item: TItemIngredient, index: number) => (
                        <ConstructorItem data={item.item} index={index} key={item.id} myId={item.id}/>
                    ))
                    }
                </div>

                {bun !== null && (
                    <div>
                    <Link to={`/ingredient/${bun._id}`} state={{background: location}}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bun.name + " (низ)"}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </Link>
                    </div>
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
        </div>
    );
}

export default BurgerConstructor;