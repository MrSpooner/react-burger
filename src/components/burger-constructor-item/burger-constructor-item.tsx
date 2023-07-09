import React from 'react';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrop} from "react-dnd/dist/hooks/useDrop/useDrop";
import {useDrag} from "react-dnd";
import {useDispatch} from "react-redux";
import {
    DELETE_CONSTRUCTOR_ITEM,
    SORT_CONSTRUCTOR_ITEMS,
} from "../../services/actions/orderConstructor";
import {GET_INGREDIENT_INFO} from "../../services/actions/ingredientInfo";
import {Link, useLocation} from "react-router-dom";
import {TIngredient} from "../../utils/types";

type TConstructorType = {
    data: TIngredient,
    type?:  "top" | "bottom" | undefined,
    index?: number,
    myId?: string
}

const ConstructorItem: React.FC<TConstructorType> = (data: TConstructorType) => {
    const location = useLocation();
    const index = data.index;
    const id = data.myId;
    const dispatch = useDispatch();
    const ref = React.useRef(null);

    const onClick = () => {
        dispatch({type: GET_INGREDIENT_INFO, item: {data: data.data}});
    }

    const delConstructorItem = (item: TConstructorType) => {
        dispatch({
            type: DELETE_CONSTRUCTOR_ITEM,
            ...item,
        });
    };

    const [, itemDrop] = useDrop({
        accept: "container",
        hover(item: TIngredient) {
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
                    handleClose={() => delConstructorItem(data)}
                />
            </Link>
        </div>
    );
}

export default ConstructorItem;