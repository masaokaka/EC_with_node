import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectToppingForm } from "..";
import { SIZE_M_STATUS } from "../../../static/const";
import { CartTopType } from "../../../features/cart/cartSlice";
import { ToppingType } from "../../../features/topping/toppingsSlice";

//テスト用データたち------------
let topping: ToppingType = {
  _id: "cerljvln430",
  name: "キムチ",
  mprice: 200,
  lprice: 300,
};

let testCartTopping: CartTopType = {
  toppingId: "cerljvln430",
  size: SIZE_M_STATUS,
};
let testCartToppings = [testCartTopping];

describe("SelectNumForm", () => {
  const mockFunc = jest.fn();
  test("表示テスト", () => {
    render(
      <SelectToppingForm
        topping={topping}
        addedToppings={testCartToppings}
        setAddedToppings={mockFunc}
      />
    );
    expect(screen.getByText("キムチ")).toBeInTheDocument();
  });
  test("トッピング選択がない時テスト", () => {
    render(
      <SelectToppingForm
        topping={topping}
        addedToppings={[]}
        setAddedToppings={mockFunc}
      />
    );
    expect(screen.getByText("キムチ")).toBeInTheDocument();
  });
  test("サイズ選択クリックテスト", () => {
    render(
      <SelectToppingForm
        topping={topping}
        addedToppings={[]}
        setAddedToppings={mockFunc}
      />
    );
    let select = screen.getByRole("button");
    fireEvent.click(select);
  });
});
