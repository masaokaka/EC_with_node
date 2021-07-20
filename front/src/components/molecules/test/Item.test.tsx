import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import { Item } from "../";

//テスト用データたち------------
let testItem = {
  id: 1,
  name: "カレー",
  text: "美味しいカレーです",
  mprice: 2000,
  lprice: 3000,
  img: "URL",
};

describe("Item", () => {
  beforeEach(() => {
    render(
      <Router>
        <Item item={testItem} />
      </Router>
    );
  });
  test("プロップスの値が正しく表示されているかテスト", () => {
    expect(screen.getByText("カレー")).toBeInTheDocument();
    // screen.debug();
  });
  test("ActionAreaクリックのテスト", () => {
    render(
      <Router>
        <Item item={testItem} />
      </Router>
    );
    let ActionArea = screen.getAllByRole("button")[0];
    userEvent.click(ActionArea);
    // screen.debug();
  });
});
