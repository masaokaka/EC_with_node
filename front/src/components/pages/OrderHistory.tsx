import { useAppSelector } from "../../app/hooks";
import { FC } from "react";
import { OrderItemsTable } from "../organisms/OrderItemsTable";
import { Container } from "@material-ui/core";
import { selectOrders } from "../../features/order/ordersSlice";
import { selectUid } from "../../features/userinfo/userinfoSlice";
import { selectItems } from "../../features/item/itemsSlice";

const OrderHistory: FC = () => {
  const orders = useAppSelector(selectOrders);
  const uid = useAppSelector(selectUid);
  const items = useAppSelector(selectItems);

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
