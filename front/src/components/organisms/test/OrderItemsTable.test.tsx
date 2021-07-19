import { render, screen } from "@testing-library/react";
import { OrderItemsTable } from "..";
import { BrowserRouter as Router } from "react-router-dom";
import { ADMIN_ID } from "../../../static/admin";
import { ORDER_STATUS_UNDELIVERED } from "../../../static/const";
import { ItemType } from "../../../features/item/itemsSlice";
import { ToppingType } from "../../../features/topping/toppingsSlice";
import { OrderType } from "../../../features/order/ordersSlice";
import { Provider } from "react-redux";
import { store } from "../../../app/store";

let testItem: ItemType = {
  _id: "wecrwv4",
  name: "カレー",
  text: "美味しいカレーです",
  mprice: 2000,
  lprice: 3000,
  img: "URL",
};
let testItems: ItemType[] = [testItem, testItem];

let topping: ToppingType = {
  _id: "cerljvln430",
  name: "キムチ",
  mprice: 200,
  lprice: 300,
};

let testToppings = [topping];

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
  itemInfo: [],
};

let testOrders = [testOrder];

describe("OrderItemsTable", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <OrderItemsTable
            items={testItems}
            toppings={testToppings}
            orders={testOrders}
            uid={ADMIN_ID}
          />
        </Router>
      </Provider>
    );
  });
});
