import { render, screen } from "@testing-library/react";
import { ToppingsTableCell } from "../";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { CartTopType } from "../../../features/cart/cartSlice";

let testCartTopping1: CartTopType = {
  toppingId: "cerljvln430",
  size: 1,
};
let testCartTopping2: CartTopType = {
  toppingId: "cerljvln430",
  size: 0,
};

let testToppings = [
  {
    _id: "cerljvln430",
    name: "キムチ",
    mprice: 200,
    lprice: 300,
  },
];

describe("ToppingsTableCell", () => {
  test("プロップスの値が正しく表示されているかテスト", () => {
    render(
      <Provider store={store}>
        <ToppingsTableCell
          toppings={testToppings}
          cartTopping={testCartTopping1}
        />
      </Provider>
    );
  });
  test("プロップスの値が正しく表示されているかテスト", () => {
    render(
      <Provider store={store}>
        <ToppingsTableCell
          toppings={testToppings}
          cartTopping={testCartTopping2}
        />
      </Provider>
    );
  });
});
