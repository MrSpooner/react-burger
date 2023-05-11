import React from 'react';
import ConstructorItem from '../burger-constructor-item/burger-constructor-item';
import Items from './burger-constructor.module.css';
import {Button, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from "../modal/modal";

function BurgerConstructor() {
    const url = 'https://norma.nomoreparties.space/api/ingredients';
    const [isModal, setModal] = React.useState(false);
    const [data, setState] = React.useState({
        productData: [],
        isLoading: true
    })

    const onClick = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    React.useEffect(() => {
        const getProductData = async () => {
            fetch(url)
                .then((res) => res.json())
                .then((data) =>
                    setState({...data, productData: data.data, isLoading: false})
                )
                .catch((e) => {
                    setState({...data, isLoading: false});
                });
        }

        getProductData();
    }, [])

    return (
        <div>
            {!data.isLoading  &&
                <div className={`${Items.element} mt-25 custom-scroll`}>
                    <ConstructorItem data={data.productData[0]} type='top'/>

                    {data.productData.slice(1, -1).map((item: any, index: any) => {
                        return (
                            <div key={index}>
                                <ConstructorItem data={item} />
                            </div>
                        )
                    })}

                    <ConstructorItem data={data.productData[data.productData.length - 1]} type='bottom'
                    />

                    <div className={Items.ordering}>
                        <span className='text text_type_main-medium mr-2'>610</span>
                        <CurrencyIcon type="primary"/>
                        <Button htmlType="button" type="primary" size="medium" extraClass="ml-10" onClick={onClick}>
                            Оформить заказ
                        </Button>
                        {isModal && (
                            <Modal closeModal = {closeModal}/>
                        )}
                    </div>
                </div>
            }
        </div>
    );
}

export default BurgerConstructor;
