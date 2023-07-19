import React from 'react';
import {ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrop} from "react-dnd/dist/hooks/useDrop/useDrop";
import {useDrag} from "react-dnd";
import {useDispatch} from "react-redux";
import {deleteIngredient, sortIngredients} from "../../services/reduxToolkit/orderConstructor";
import {Link, useLocation} from "react-router-dom";
import {TIngredient, TItemIngredient} from "../../utils/types";

type TConstructorType = {
    data: any,
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

    const delConstructorItem = (item: TItemIngredient) => {
        dispatch(deleteIngredient(item));
    };

    const [, itemDrop] = useDrop({
        accept: "container",
        hover(item: TIngredient) {
            const dropItem = item.index;
            const draggedItem = data.index;

            dispatch(sortIngredients({ dropItem, draggedItem }),
            );
            item.index = draggedItem;
        }
    });

    const [, itemDrag] = useDrag({
        type: "container",
        item: {id, index}
    });

    itemDrag(itemDrop(ref));

    return (
        <div ref={ref} draggable={true}>

            {data.data  && <Link to={`/ingredient/${data.data._id}`}
                  state={{background: location}}>
                <ConstructorElement
                    type={data.type}
                    text={data.type === 'top' ? `${data.data.name}` + ' (верх)'
                        : data.type === 'bottom' ? `${data.data.name}` + ' (низ)' : data.data.name}
                    price={data.data.price}
                    thumbnail={data.data.image_mobile}
                    handleClose={() => delConstructorItem(data.data)}
                />
            </Link>}
        </div>
    );
}

export default ConstructorItem;