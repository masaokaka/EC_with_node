import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { CartItemsTable } from "../";
import { ADMIN_ID } from "../../../static/admin";
import { ItemType } from "../../../features/item/itemsSlice";
import {
  CartTopType,
  CartItemType,
  CartType,
} from "../../../features/cart/cartSlice";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
//テスト用データたち------------
let testItem: ItemType = {
  _id: "wecrwv4",
  name: "カレー",
  text: "美味しいカレーです",
  mprice: 2000,
  lprice: 3000,
  img: "URL",
};
let testItems: ItemType[] = [testItem];

let topping = {
  _id: "cerljvln430",
  name: "キムチ",
  mprice: 200,
  lprice: 300,
};
let testToppings = [topping];

let testCartTopping: CartTopType = {
  toppingId: "34tf35g35",
  size: 0,
};

let testCartItem: CartItemType = {
  id: "aaaaaaaaa",
  itemId: "wecrwv4",
  itemNum: 1,
  itemSize: 0,
  toppings: [testCartTopping],
};

let testCart: CartType = {
  _id: "aaaaaaaaa",
  uid: "aaaaaaaaaaa",
  itemInfo: [testCartItem],
  status: 0,
};

describe("CartItemsTable", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <CartItemsTable
            items={testItems}
            toppings={testToppings}
            cart={testCart}
            show={false}
            uid={ADMIN_ID}
          />
        </Router>
      </Provider>
    );
  });
});
