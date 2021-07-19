import { render, screen } from "@testing-library/react";
import { Items } from "../";

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

describe("Items", () => {
  test("プロップスの値が個数分正しく表示されているかテスト", () => {
    render(<Items items={testItems} />);
    expect(screen.getAllByText(/カレー/)).toHaveLength(2);
    expect(screen.getAllByText(/00/)).toHaveLength(4);
    // screen.debug();
  });
  test("アイテムがない時の表示テスト", () => {
    render(<Items items={testItems} noItem={true} />);
    expect(screen.getByText("該当する商品はありません"));
    // screen.debug();
  });
});
