import style from "./profile-orders.module.css";
import OrdersItem from "../orders-item/orders-item";
import {useAppSelector} from '../../utils/useData';

const ProfileOrders = () => {
    const {orders} = useAppSelector((state) => state.wsSlice);
    const lastOrders = orders && [...orders].reverse().slice(0, 50);

    return (
        <div className={`${style.main} custom-scroll`}>
            <ul className={style.ulOrderList}>
                {lastOrders && lastOrders.map((order) => (<OrdersItem key={order._id} order={order}/>))}
            </ul>
        </div>
    );
}

export default ProfileOrders;