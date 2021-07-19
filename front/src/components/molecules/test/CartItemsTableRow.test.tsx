import { fireEvent, render, screen } from "@testing-library/react";
import { CartItemsTableRow } from "../";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { ORDER_STATUS_CART, SIZE_M_STATUS } from "../../../static/const";
import { ItemType } from "../../../features/item/itemsSlice";
import {
  CartItemType,
  CartTopType,
  CartType,
} from "../../../features/cart/cartSlice";
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

let testCart: CartType = {
  _id: "aaaaaaaaa",
  uid: "aaaaaaaaaaa",
  itemInfo: [testCartItem, testCartItem],
  status: ORDER_STATUS_CART,
};

describe("CartItemsTableRow", () => {
  test("非表示の際のテスト", () => {
    render(
      <Provider store={store}>
        <Table>
          <TableBody>
            <CartItemsTableRow
              items={testItems}
              toppings={testToppings}
              cart={testCart}
              cartItem={testCartItem}
              show={false}
              status={ORDER_STATUS_CART}
              uid={"f34h83vcwec"}
            />
          </TableBody>
        </Table>
      </Provider>
    );
    expect(screen.getAllByRole("button")).toHaveLength(2); //削除ボタンの表示個数確認
    let btn = screen.getAllByRole("button")[0];
    fireEvent.click(btn);
  });
  test("プロップスの値が正しく表示されているか", () => {
    render(
      <Provider store={store}>
        <Table>
          <TableBody>
            <CartItemsTableRow
              items={testItems}
              toppings={testToppings}
              cart={testCart}
              cartItem={testCartItem}
              show={true}
              status={ORDER_STATUS_CART}
              uid={undefined}
            />
          </TableBody>
        </Table>
      </Provider>
    );
  });
});
