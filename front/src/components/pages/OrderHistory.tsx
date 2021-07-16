import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { FC, useEffect } from "react";
import { useHistory } from "react-router";
import { OrderItemsTable } from "../organisms";
import { Container } from "@material-ui/core";
import { selectOrders } from "../../features/order/ordersSlice";
import { selectUid } from "../../features/userinfo/userinfoSlice";
import { selectItems } from "../../features/item/itemsSlice";
import { fetchOrdersAsync } from "../../features/order/ordersSlice";

const OrderHistory: FC = () => {
  const orders = useAppSelector(selectOrders);
  const uid = useAppSelector(selectUid);
  const items = useAppSelector(selectItems);
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchOrdersAsync({ uid: uid! }));
  }, [dispatch, uid]);

  useEffect(() => {
    if (uid) {
      return;
    } else {
      history.push("/");
    }
  }, [uid, history]);

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
