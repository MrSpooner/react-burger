import style from "./feed.module.css";
import {useEffect} from "react";
import FeedItem from "../feed-item/feed-item";
import {useAppSelector, useAppDispatch} from '../../utils/useData';
import {wsConnectionStart, wsClosed} from "../../services/reduxToolkit/webSocketSlice";

function Feed() {
    const dispatch = useAppDispatch();
    const {orders, total, totalToday} = useAppSelector((state) => state.wsSlice);

    useEffect(() => {
        dispatch(wsConnectionStart("wss://norma.nomoreparties.space/orders/all"));

        return () => {dispatch(wsClosed())};
    }, []);

    return (
        <section>
            <div className={style.main}>
                <div className={style.cardFeed}>
                    <div className={style.title}>
                        <h2 className="text text_type_main-large ml-20">Лента заказов</h2>
                    </div>

                    <div className={`${style.cardFeedOrders} custom-scroll`}>
                        <ul className={style.ulOrderList}>
                            {orders.map((order) => (
                                <FeedItem key={order._id} order={order}/>
                            ))}
                        </ul>
                    </div>
                </div>

                <div>
                    <div className={`${style.stats} mb-15`}>
                        <div className={style.statsGrid}>
                            <p className="text text_type_main-medium mb-6">Готовы:</p>

                            <div className={style.doneStats}>
                                {orders.map(
                                    (order) =>
                                        order.status === "done" && (
                                            <p key={order._id} className="text text_type_digits-default">
                                                {order.number}
                                            </p>
                                        )
                                )}
                            </div>
                        </div>

                        <div className={style.inProgressStats}>
                            <p className="text text_type_main-medium mb-6"> В работе:</p>
                            <div className={style.inProcessOrder}>
                                {orders.map(
                                    (order) =>
                                        order.status === "pending" && (
                                            <p
                                                key={order.number}
                                                className="text text_type_digits-default"
                                            >
                                                {order.number}
                                            </p>
                                        )
                                )}
                            </div>
                        </div>
                    </div>

                    <div className = 'mb-20'>
                        <p className="text text_type_main-medium">Выполнено за все время:</p>
                        <p className={`text text_type_digits-large ${style.beautifyTotal}`}>{total}</p>
                    </div>

                    <div>
                        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                        <p className={`text text_type_digits-large ${style.beautifyTotal}`}>{totalToday}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Feed;
