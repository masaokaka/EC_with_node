import { useAppSelector } from "../../app/hooks";
import { useEffect, FC } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { OrderItemsTable } from "../organisms/OrderItemsTable";
import { Container } from "@material-ui/core";
import { selectOrders, unsetOrders } from "../../features/order/ordersSlice";
import { fetchOrders } from "../../features/order/ordersAPI";
import { selectUser } from "../../features/user/userSlice";
import { selectItems } from "../../features/item/itemsSlice";

const OrderHistory: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const orders = useAppSelector(selectOrders);
  const user = useAppSelector(selectUser);
  const items = useAppSelector(selectItems);
  useEffect(() => {
    if (!user.uid) {
      history.push("/");
    } else {
      if (orders.length === 0) {
        dispatch(fetchOrders(user.uid));
      }
    }
  }, []);
  return (
    <Container>
      <h2>注文履歴</h2>
      {orders.length !== 0 ? (
        <OrderItemsTable items={items} orders={orders} uid={user.uid!} />
      ) : (
        <h3>注文履歴がありません</h3>
      )}
    </Container>
  );
};

export default OrderHistory;
