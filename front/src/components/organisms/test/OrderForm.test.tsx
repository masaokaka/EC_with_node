import { fireEvent, render, screen } from "@testing-library/react";
import { OrderForm } from "..";
import { BrowserRouter as Router } from "react-router-dom";
import {
  CartItemType,
  CartTopType,
  CartType,
} from "../../../features/cart/cartSlice";
import { UserInfoType } from "../../../features/userinfo/userinfoSlice";
import { ADMIN_ID } from "../../../static/admin";
import { store } from "../../../app/store";
import { Provider } from "react-redux";

let testCartTopping: CartTopType = {
  toppingId: "34tf35g35",
  size: 0,
};

let testCartItem: CartItemType = {
  id: "aaaaaascs",
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

let testUserInfo: UserInfoType = {
  uid: ADMIN_ID,
  name: "テスト太郎",
  zipcode: "000-0000",
  address: "東京都",
  email: "aa@aa.com",
  tel: "000-0000-0000",
  username: "テストユーザー",
};

describe("OrderForm", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <OrderForm
            cart={testCart}
            userInfo={testUserInfo}
            totalPrice={10000}
          />
        </Router>
      </Provider>
    );
  });
  it("button click test", () => {
    render(
      <Provider store={store}>
        <Router>
          <OrderForm
            cart={testCart}
            userInfo={testUserInfo}
            totalPrice={10000}
          />
        </Router>
      </Provider>
    );
    let btn = screen.getByText("注文を確定する").parentElement;
    fireEvent.click(btn!);
  });
});
