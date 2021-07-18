import { render, screen } from "@testing-library/react";
import { Price } from "../";

describe("Price", () => {
  test("プロップスの値が正しく表示されているかテスト", () => {
    render(<Price price={100} tax={true} bigsize={true} />);
    expect(screen.getByText(/100/)).toHaveTextContent("合計：100 円(税込)");
  });
});
