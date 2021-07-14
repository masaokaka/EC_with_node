import { useAppSelector } from "../../app/hooks";
import { useEffect, FC } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { OrderItemsTable } from "../organisms/OrderItemsTable";
import { Container } from "@material-ui/core";
import { selectOrders, unsetOrders } from "../../features/order/ordersSlice";
import { fetchOrders } from "../../features/order/ordersAPI";
import { selectUid } from "../../features/userinfo/userinfoSlice";
import { selectItems } from "../../features/item/itemsSlice";

const OrderHistory: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const orders = useAppSelector(selectOrders);
  const uid = useAppSelector(selectUid);
  const items = useAppSelector(selectItems);
  useEffect(() => {
    if (!uid) {
      history.push("/");
    } else {
      if (orders.length === 0) {
        dispatch(fetchOrders(uid));
      }
    }
  }, [uid, orders]);
  return (
    <Container>
      <h2>注文履歴</h2>
      {orders.length !== 0 ? (
        <OrderItemsTable items={items} orders={orders} uid={uid!} />
      ) : (
        <h3>注文履歴がありません</h3>
      )}
    </Container>
  );
};

export default OrderHistory;
