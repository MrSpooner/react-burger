import React from 'react';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Tab from './burger-ingredients-tab.module.css';
import Modal from "../modal/modal";
import PropTypes from "prop-types";

function BurgerIngredientsTab(prop: any) {
    const [isModal, setModal] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState(false);

    const onClick = (item: any) => {
        setModal(true);
        setCurrentItem(item);
    }

    const closeModal = () => {
        setModal(false);
    }

    return (
        <div>
            <p className="text text_type_main-medium" ref={prop.sendRef}>
                {prop.children}
            </p>
            <div className={Tab.stack}>
                {prop.data.map((item: any, index: any) => {
                    return (
                        <div key={index} className={Tab.card} onClick={() => {
                            onClick(item)
                        }}>
                            <img src={item.image} alt="альтернативный текст"/>
                            <div className={Tab.price}>
                                <CurrencyIcon type="primary"/>
                                <span className='text text_type_main-small'>{item.price}</span>
                            </div>
                            <span className='text text_type_main-small'>{item.name}</span>
                            {isModal && (
                                <Modal closeModal={closeModal} data={currentItem} type='ingredients'/>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default BurgerIngredientsTab;

BurgerIngredientsTab.propTypes = {
    sendRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({current: PropTypes.any})
    ]),
    children: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        })
    ).isRequired,
};
