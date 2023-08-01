import React from 'react';
import {ConstructorElement, DragIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrop} from "react-dnd/dist/hooks/useDrop/useDrop";
import {useDrag} from "react-dnd";
import {useAppDispatch} from '../../utils/useData';
import {deleteIngredient, sortIngredients} from "../../services/reduxToolkit/orderConstructor";
import {Link, useLocation} from "react-router-dom";
import {TIngredient, TConstructorType} from "../../utils/types";

const ConstructorItem: React.FC<TConstructorType> = (data: TConstructorType) => {
    const location = useLocation();
    const index = data.index;
    const id = data.myId;
    const dispatch = useAppDispatch();
    const ref = React.useRef(null);

    const delConstructorItem = (item: TConstructorType) => {
        dispatch(deleteIngredient(item));
    };

    const [, itemDrop] = useDrop({
        accept: "container",
        hover(item: TIngredient) {
            const dropItem = item.index;
            const draggedItem = data.index;

            dispatch(sortIngredients({ dropItem, draggedItem }));
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
            {data.data && <Link to={`/ingredient/${data.data._id}`} state={{background: location}}>
                {!data.type && <DragIcon type="primary" />}
                <ConstructorElement
                    type={data.type}
                    text={data.type === 'top' ? `${data.data.name}` + ' (верх)'
                        : data.type === 'bottom' ? `${data.data.name}` + ' (низ)' : data.data.name}
                    price={data.data.price}
                    thumbnail={data.data.image_mobile}
                    handleClose={() => delConstructorItem(data)}
                />
            </Link>}
        </div>
    );
}

export default ConstructorItem;