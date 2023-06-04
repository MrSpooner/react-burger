import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag } from "react-dnd/dist/hooks";
import {GET_INGREDIENT_INFO} from "../../services/actions/ingredientInfo";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import {Data} from "../../utils/prop-types";
import Tab from "../burger-ingredients-tab/burger-ingredients-tab.module.css";
import Modal from "../modal/modal";
import IngredientDetails from "../modal-ingredient-details/ingredient-details";
import React from 'react';

const BurgerDragIngredient = (data) => {
    const [isModal, setModal] = React.useState(false);
    const dispatch = useDispatch();

    const onClick = (item) => {
        dispatch({type: GET_INGREDIENT_INFO, item});

        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    }

    const [, itemRef] = useDrag({
        type: "ingredients",
        item: data.data
    });

    return (
            <div className={Tab.card} ref={itemRef} draggable={true} onClick={() => {onClick(data)}}>
                <img src={data.data.image} alt={data.data.name}/>

                <div className={Tab.price}>
                    <CurrencyIcon type="primary"/>
                    <span className='text text_type_main-small'>{data.data.price}</span>
                </div>

                <span className='text text_type_main-small'>{data.data.name}</span>

                {isModal && (
                    <Modal closeModal={closeModal}>
                        <IngredientDetails data={data}/>
                    </Modal>
                )}
            </div>
    );
};

export default BurgerDragIngredient;

BurgerDragIngredient.propTypes = {
    data: PropTypes.shape(Data).isRequired
};