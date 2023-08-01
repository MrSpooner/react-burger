import style from "./orders-item.module.css";
import {TOrders} from "../../utils/types";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useLocation} from "react-router-dom";
import {getPrice, getOrderCountIngredients} from "../../utils/useData";
import {useMemo} from "react";
import {useAppSelector} from '../../utils/useData';

type TCardProps = {
    order: TOrders
}

const OrdersItem: React.FC<TCardProps> = ({order}) => {
    const location = useLocation();
    const createdAt = order.createdAt;
    const orderIngredients = order.ingredients;
    const {ingredientsAll} = useAppSelector((state) => state.ingredientsAll);
    const number = order.number;
    const ingredientsMemo = useMemo(() => {
        return ingredientsAll?.filter((ingredient) => orderIngredients.includes(ingredient._id));
    }, [ingredientsAll, orderIngredients]);
    const ingredientsObj = getOrderCountIngredients(ingredientsMemo);
    const price = getPrice(ingredientsObj);
    const firstIngredients = ingredientsMemo.slice(0, 6);
    let count = 0;
    if (ingredientsMemo.length > 6) {
        count = ingredientsMemo.length - 6;
    }

    return (
        <Link
            className={style.card}
            to={`/profile/orders/${number}`}
            state={{background: location}}
        >
            <div className={style.top}>
                <p className="text text_type_digits-default">{`#${order.number}`}</p>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(createdAt)}/>
                </p>
            </div>

            <h3 className="text text_type_main-medium">{order.name}</h3>
            <p className="text text_type_main-default mt-2">{order.status === "done" ? "Готов" : "Создан"}</p>

            <div className={`${style.ingredients} mt-6`}>
                <ul className={`${style.unList} mt-6`}>
                    {firstIngredients.map((ingredient, index) => (
                        <li
                            className={style.item}
                            style={{zIndex: 6 - index}}
                            key={index}
                        >
                            <img
                                src={ingredient.image_mobile}
                                alt={ingredient.name}
                                className={style.image}
                            />

                            {count > 0 && index === 5 && (
                                <span className={style.overFlow}>{`+${count}`}</span>
                            )}
                        </li>
                    ))}
                </ul>

                <div className={style.total}>
                    <p className="text text_type_digits-default mr-2">{price}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </Link>
    );
}

export default OrdersItem;