import { fireEvent, render, screen } from "@testing-library/react";
import { OrderItemsTableRow } from "../";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { ADMIN_ID } from "../../../static/admin";
import { ORDER_STATUS_UNDELIVERED, SIZE_M_STATUS } from "../../../static/const";
import { ItemType } from "../../../features/item/itemsSlice";
import { CartItemType, CartTopType } from "../../../features/cart/cartSlice";
import { OrderType } from "../../../features/order/ordersSlice";
import { Table, TableBody } from "@material-ui/core";

//テスト用データたち------------
let testItem: ItemType = {
  _id: "wecrwv4",
  name: "カレー",
  text: "美味しいカレーです",
  mprice: 2000,
  lprice: 3000,
  img: "URL",
};
let testItems: ItemType[] = [testItem, testItem];

let topping = {
  _id: "cerljvln430",
  name: "キムチ",
  mprice: 200,
  lprice: 300,
};

let testToppings = [topping];

let testCartTopping: CartTopType = {
  toppingId: "34tf35g35",
  size: SIZE_M_STATUS,
};

let testCartItem: CartItemType = {
  id: "aaaaaaaaa",
  itemId: "wecrwv4",
  itemNum: 1,
  itemSize: SIZE_M_STATUS,
  toppings: [testCartTopping],
};

let testOrder: OrderType = {
  _id: "aaaaaaaa",
  uid: "sdceg5cvthe456",
  name: "テスト太郎",
  email: "test@test.com",
  zipcode: "000-0000",
  address: "東京都新宿区",
  tel: "000-0000-0000",
  status: ORDER_STATUS_UNDELIVERED,
  orderDatetime: "2021/6/23 9:56:17",
  payType: 1,
  cardNo: "000000000000000",
  timestamp: 1624409777,
  totalPrice: 999999,
  itemInfo: [testCartItem, testCartItem],
};

let testOrders = [testOrder];

describe("OrderItemsTableRow", () => {
  global.confirm = () => true;
  test("プロップスの値が正しく表示されているかテスト", () => {
    render(
      <Provider store={store}>
        <Table>
          <TableBody>
            <OrderItemsTableRow
              items={testItems}
              toppings={testToppings}
              order={testOrder}
              orders={testOrders}
              uid={ADMIN_ID}
            />
          </TableBody>
        </Table>
      </Provider>
    );
    expect(screen.getByText(/999,999/)).toBeInTheDocument();
    let cancelbtn = screen.getByText("注文キャンセル");
    fireEvent.click(cancelbtn);
    // screen.debug();
  });
});
