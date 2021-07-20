import { render, screen } from "@testing-library/react";
import { ItemDetail } from "../";

//テスト用データたち------------
let testItem = {
  id: 1,
  name: "カレー",
  text: "美味しいカレーです",
  mprice: 2000,
  lprice: 3000,
  img: "URL",
};

describe("ItemDetail", () => {
  beforeEach(() => {
    render(<ItemDetail item={testItem} />);
  });
  it("shows itemdetail", () => {
    expect(screen.getByText("カレー")).toBeInTheDocument();
  });
});
