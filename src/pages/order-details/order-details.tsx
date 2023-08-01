import style from "./order-details.module.css";
import {useAppSelector, useAppDispatch} from '../../utils/useData';
import {useEffect, useMemo} from "react";
import {useParams} from "react-router-dom";
import {getOrderCountIngredients, getPrice} from "../../utils/useData";
import {getChosenOrder} from "../../services/reduxToolkit/order";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";

type TUseParams = {
    number: string
}

const OrderDetails: React.FC = () => {
    const dispatch = useAppDispatch();
    const id = useParams<TUseParams>();

    useEffect(() => {
        dispatch(getChosenOrder(id.number as string));
    }, [dispatch]);

    const {order} = useAppSelector((state) => state.order);
    const orderElement = order[0];
    const createdAt = orderElement?.createdAt;
    const {ingredientsAll} = useAppSelector((state) => state.ingredientsAll);
    const orderIngredients = useMemo(() => {
        return ingredientsAll.filter((item) => orderElement?.ingredients.includes(item._id));
    }, [ingredientsAll, orderElement]);
    const ingredientsObj = getOrderCountIngredients(orderIngredients);
    const price = getPrice(ingredientsObj);

    return (
        <div className={style.container}>
            <p className={`text text_type_digits-default`}>#{id.number}</p>
            <h2 className={`text text_type_main-medium custom-scroll ${style.name}`}>{orderElement?.name}</h2>
            <p className={`text text_type_main-default ${style.status}`}>
                {orderElement?.status === "done" ? "Выполнен" : "Готовится"}
            </p>

            <p className={`text text_type_main-medium`}>Состав:</p>
            <div className={`${style.ingredients} custom-scroll`}>
                <ul>
                    {ingredientsObj.map((item) => (
                        <li className={`mt-2 ${style.item}`} key={item._id}>
                            <img src={item.image} alt={item.name} className={style.image}/>

                            <p className={`text text_type_main-default`}>{item.name}</p>

                            <div className={style.total}>
                                <p className="text text_type_digits-default mr-2">{`${item.count} x ${item.price}`}</p>
                                <CurrencyIcon type="primary"/>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={`${style.bottom} mt-10`}>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(createdAt)}/>
                </p>

                <div className={style.total}>
                    <p className="text text_type_digits-default mr-2">{`${price}`}</p>
                    <CurrencyIcon type="primary"/>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;