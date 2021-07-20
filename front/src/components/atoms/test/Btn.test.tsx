import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Btn } from "../";

describe("Btn", () => {
  const mockFunc = jest.fn();
  beforeEach(() => {
    render(<Btn text="テスト" onClick={() => mockFunc()} />);
  });
  test("ボタンを表示する", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("ボタンがクリックされた時に渡した関数が発火しているかのチェック", () => {
    const button = screen.getByRole("button");
    userEvent.click(button);
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
