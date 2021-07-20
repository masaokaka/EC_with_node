import { render, screen } from "@testing-library/react";
import { Price } from "../";

describe("Price", () => {
  test("プロップスの値が正しく表示されているかテスト1", () => {
    render(<Price price={100} tax={true} bigsize={true} />);
    expect(screen.getByText(/100/)).toHaveTextContent("合計：100 円(税込)");
  });
  test("プロップスの値が正しく表示されているかテスト2", () => {
    render(<Price price={100} tax={false} bigsize={false} />);
    expect(screen.getByText(/100/)).toHaveTextContent("100 円(税抜)");
  });
  test("プロップスの値が正しく表示されているかテスト3", () => {
    render(<Price price={100} tax={false} bigsize={true} />);
    expect(screen.getByText(/100/)).toHaveTextContent("合計：100 円(税抜)");
  });
  test("プロップスの値が正しく表示されているかテスト4", () => {
    render(<Price price={100} tax={true} bigsize={false} />);
    expect(screen.getByText(/100/)).toHaveTextContent("100 円(税込)");
  });
});
