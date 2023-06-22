import React from 'react';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types";
import {Data} from "../../utils/prop-types";
import {useDrop} from "react-dnd/dist/hooks/useDrop/useDrop";
import {useDrag} from "react-dnd";
import {useDispatch} from "react-redux";
import {
    DELETE_CONSTRUCTOR_ITEM,
    SORT_CONSTRUCTOR_ITEMS,
} from "../../services/actions/orderConstructor";
import {GET_INGREDIENT_INFO} from "../../services/actions/ingredientInfo";
import {Link, useLocation} from "react-router-dom";

function ConstructorItem(data) {
    const location = useLocation();
    const index = data.index;
    const id = data.myId;
    const dispatch = useDispatch();
    const ref = React.useRef(null);

    const onClick = () => {
        dispatch({type: GET_INGREDIENT_INFO, item: {data: data.data}});
    }

    const delConstructorItem = (item) => {
        dispatch({
            type: DELETE_CONSTRUCTOR_ITEM,
            ...item,
        });
    };

    const [, itemDrop] = useDrop({
        accept: "container",
        hover(item) {
            const dropItem = item.index;
            const draggedItem = data.index;

            dispatch({
                type: SORT_CONSTRUCTOR_ITEMS,
                data: {dropItem, draggedItem},
            });

            item.index = draggedItem;
        }
    });

    const [, itemDrag] = useDrag({
        type: "container",
        item: {id, index}
    });

    itemDrag(itemDrop(ref));

    return (
        <div ref={ref} draggable={true} onClick={onClick}>

            <Link to={`/ingredient/${data.data._id}`}
                  state={{background: location}}>
                <ConstructorElement
                    type={data.type}
                    text={data.type === 'top' ? `${data.data.name}` + ' (верх)'
                        : data.type === 'bottom' ? `${data.data.name}` + ' (низ)' : data.data.name}
                    price={data.data.price}
                    thumbnail={data.data.image_mobile}
                    handleClose={() => delConstructorItem({data: data}, data.myId)}
                />
            </Link>
        </div>
    );
}

export default ConstructorItem;

ConstructorItem.propTypes = {
    data: PropTypes.shape(Data).isRequired,
    type: PropTypes.string,
    index: PropTypes.number,
    myId: PropTypes.string
};