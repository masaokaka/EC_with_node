import { Table, TableBody, TableContainer, Paper } from "@material-ui/core";
import { OrderType } from "../../app/store/order/ordersSlice";
import { ItemType } from "../../app/store/item/itemsSlice";
import { ItemsTableHead } from "../molecules/ItemsTableHead";
import { OrderItemsTableRow } from "../molecules/OrderItemsTableRow";

interface Props {
  items: ItemType[];
  orders: OrderType[];
  uid: string;
}
export const OrderItemsTable = ({ items, orders, uid }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <ItemsTableHead
          heads={[
            { text: "注文日時", col: 2 },
            { text: "合計金額(税抜)", col: 2 },
            { text: "ステータス", col: 2 },
            { text: "商品情報", col: 8 },
          ]}
        />
        <TableBody>
          {orders.map((order, index) => (
            <OrderItemsTableRow
              key={index}
              items={items}
              order={order}
              orders={orders}
              uid={uid}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
