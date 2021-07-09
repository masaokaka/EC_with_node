import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "../../../app/store";

import { HeadIconBtns } from "../HeadIconBtns";
import { Item } from "../Item";
import { Items } from "../Items";
import { ItemDetail } from "../ItemDetail";
import { ItemsTableHead } from "../ItemsTableHead";
import { CartItemsTableRow } from "../CartItemsTableRow";
import { OrderItemsTableRow } from "../OrderItemsTableRow";
import { SearchForm } from "../SearchForm";
import { SelectNumForm } from "../SelectNumForm";

import { ADMIN_ID } from "../../../state/admin";
import {
  ORDER_STATUS_CART,
  ORDER_STATUS_UNPAID,
  SIZE_M_STATUS,
} from "../../../state/const";

//テスト用データたち------------
let testItem = {
  id: 1,
  name: "カレー",
  text: "美味しいカレーです",
  mprice: 2000,
  lprice: 3000,
  img: "URL",
};
let testItems = [testItem, testItem];

let testHeads = [
  { text: "テスト１", col: 2 },
  { text: "テスト２", col: 2 },
  { text: "テスト３", col: 2 },
  { text: "テスト４", col: 4 },
];

let testCartTopping = {
  id: 1,
  size: SIZE_M_STATUS,
};

let testCartItem = {
  id: "aaaaaaaaa",
  itemId: 1,
  itemNum: 1,
  itemSize: SIZE_M_STATUS,
  toppings: [testCartTopping],
};

let testCart = {
  id: "aaaaaaaaa",
  userId: "aaaaaaaaaaa",
  itemInfo: [testCartItem, testCartItem],
  status: ORDER_STATUS_CART,
};

let testOrder = {
  id: "aaaaaaaa",
  userId: "sdceg5cvthe456",
  name: "テスト太郎",
  email: "test@test.com",
  zipcode: "000-0000",
  address: "東京都新宿区",
  tel: "000-0000-0000",
  status: ORDER_STATUS_UNPAID,
  orderDatetime: "2021/6/23 9:56:17",
  payType: 1,
  cardNo: "000000000000000",
  timestamp: 1624409777,
  totalPrice: 999999,
  itemInfo: [testCartItem, testCartItem],
};

let testOrders = [testOrder, testOrder];

//-------------------------------
describe("HeadIconBtns", () => {
  test("管理者の場合でログインしている場合、正しく表示されているかテスト", () => {
    render(
      <Provider store={store}>
        <HeadIconBtns uid={ADMIN_ID} />
      </Provider>
    );
    expect(screen.getAllByRole("button")).toHaveLength(4);
    // screen.debug();
  });
  test("一般ユーザーの場合でログインしている場合、正しく表示されているかテスト", () => {
    render(
      <Provider store={store}>
        <HeadIconBtns uid={"aaaaaaaaaaaaa"} />
      </Provider>
    );
    expect(screen.getAllByRole("button")).toHaveLength(3);
    // screen.debug();
  });
  test("登録していないユーザーの場合、正しく表示されているかテスト", () => {
    render(
      <Provider store={store}>
        <HeadIconBtns uid={undefined} />
      </Provider>
    );
    expect(screen.getAllByRole("button")).toHaveLength(2);
    // screen.debug();
  });
});

//---------------------------------
describe("Item", () => {
  test("プロップスの値が正しく表示されているかテスト", () => {
    render(<Item item={testItem} />);
    expect(screen.getByText("カレー")).toBeInTheDocument();
    // screen.debug();
  });
});

describe("Items", () => {
  test("プロップスの値が個数分正しく表示されているかテスト", () => {
    render(<Items items={testItems} />);
    expect(screen.getAllByText(/カレー/)).toHaveLength(2);
    expect(screen.getAllByText(/00/)).toHaveLength(4);
    // screen.debug();
  });
});

describe("ItemDetail", () => {
  test("プロップスの値が正しく表示されているかテスト", () => {
    render(<ItemDetail item={testItem} />);
    expect(screen.getByRole("heading").textContent).toBe(testItem.name);
    expect(screen.getByText(testItem.text).textContent).toBe(testItem.text);
    // screen.debug();
  });
});

//-------------------------------
describe("ItemsTableHead", () => {
  test("プロップスの値が正しく表示されているかテスト", () => {
    render(<ItemsTableHead heads={testHeads} />);
    expect(screen.getAllByText(/テスト/)).toHaveLength(testHeads.length);
    // screen.debug();
  });
});

describe("CartItemsTableRow", () => {
  test("プロップスの値が正しく表示されているかテスト", () => {
    render(
      <Provider store={store}>
        <CartItemsTableRow
          items={testItems}
          cart={testCart}
          cartItem={testCartItem}
          show={false} //falseの場合、削除ボタン表示
          status={testCart.status}
        />
      </Provider>
    );
    expect(screen.getAllByRole("button")).toHaveLength(2); //削除ボタンの表示個数確認
    // screen.debug();
  });
});

describe("OrderItemsTableRow", () => {
  test("プロップスの値が正しく表示されているかテスト", () => {
    render(
      <Provider store={store}>
        <OrderItemsTableRow
          items={testItems}
          order={testOrder}
          orders={testOrders}
          uid={ADMIN_ID}
        />
      </Provider>
    );
    expect(screen.getByText(/999,999/)).toBeInTheDocument(); //渡したテキストの表示確認
    expect(screen.getByText("未入金")).toBeInTheDocument(); //渡したテキストの表示確認
    // screen.debug();
  });
});

describe("SearchForm", () => {
  beforeEach(() => {
    render(
      <SearchForm search={() => console.log("SearchFormボタンクリック確認")} />
    );
  });
  test("入力に応じてテキストインプットの内容が変わっているか", () => {
    const input = screen.getByRole("textbox");
    userEvent.type(input, "テスト");
    expect(input).toHaveDisplayValue("テスト");
  });
  test("ボタンがクリックされた時に渡した関数が発火しているかのチェック", () => {
    const button = screen.getByRole("button");
    userEvent.click(button);
    // screen.debug();
  });
});

describe("SelectNumForm", () => {
  beforeEach(() => {
    let itemNum = 1;
    render(
      <SelectNumForm
        itemNum={itemNum}
        setItemNum={() => {
          console.log("ok");
        }}
      />
    );
  });
  test("プロップス表示テスト", () => {
    expect(screen.getByText(1).textContent).toBe("1");
  });
});
