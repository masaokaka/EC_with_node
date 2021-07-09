import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Btn } from "../Btn";
import { IconBtn } from "../IconBtn";
import { Price } from "../Price";
import { Logo } from "../Logo";
import { BrowserRouter as Router } from "react-router-dom";

describe("Btn", () => {
  beforeEach(() => {
    render(
      <Btn text="テスト" onClk={() => console.log("ボタンクリック確認")} />
    );
  });
  test("ボタンを表示する", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("ボタンがクリックされた時に渡した関数が発火しているかのチェック", () => {
    const button = screen.getByRole("button");
    userEvent.click(button);
    // screen.debug();
  });
});

describe("IconBtn", () => {
  test("アイコンボタンが指定通りに表示されているかどうかをテスト", () => {
    render(<IconBtn icon="Search" onClk={() => console.log("test")} />);
    expect(screen.getByRole("button"));
    // screen.debug()
  });
});

describe("Price", () => {
  test("プロップスの値が正しく表示されているかテスト", () => {
    render(<Price price={100} tax={true} bigsize={true} />);
    expect(screen.getByText(/100/)).toHaveTextContent("合計：100 円(税込)");
    // screen.debug();
  });
});

describe("Logo", () => {
  test("正しく表示されているかテスト", () => {
    render(
      <Router>
        <Logo />
      </Router>
    );
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
    // screen.debug();
  });
});
