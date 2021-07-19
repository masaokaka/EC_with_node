import { fireEvent, render, screen } from "@testing-library/react";
import { ToppingFormWrapper } from "../";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { SIZE_M_STATUS } from "../../../static/const";
import { CartTopType } from "../../../features/cart/cartSlice";

let topping = {
  _id: "cerljvln430",
  name: "キムチ",
  mprice: 200,
  lprice: 300,
};

let testToppings = [topping];

let testCartTopping: CartTopType = {
  toppingId: "cerljvln430",
  size: SIZE_M_STATUS,
};
let testCartToppings = [testCartTopping];

describe("ToppingsFormWrapper", () => {
  test("プロップスの値が正しく表示されているかテスト", () => {
    const mockFunc = jest.fn();
    render(
      <Provider store={store}>
        <ToppingFormWrapper
          toppings={testToppings}
          addedToppings={testCartToppings}
          setAddedToppings={mockFunc}
        />
      </Provider>
    );
  });
});
