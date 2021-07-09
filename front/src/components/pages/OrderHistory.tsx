import { useAppSelector } from "../../app/hooks";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { OrderItemsTable } from "../organisms/OrderItemsTable";
import { Container } from "@material-ui/core";
import { selectOrders, unsetOrders } from "../../app/store/order/ordersSlice";
import { fetchOrders } from "../../app/store/order/ordersOperation";
import { selectUser } from "../../app/store/user/userSlice";
import { selectItems } from "../../app/store/item/itemsSlice";

export const OrderHistory = () => {
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
