import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchForm } from "../";

describe("SearchForm", () => {
  test("入力に応じてテキストインプットの内容が変わっているか", () => {
    const mockFunc = jest.fn();
    render(<SearchForm search={() => mockFunc()} />);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "テスト");
    expect(input).toHaveDisplayValue("テスト");
  });
  test("ボタンがクリックされた時に渡した関数が発火しているかのチェック", () => {
    const mockFunc = jest.fn();
    render(<SearchForm search={() => mockFunc()} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockFunc).toBeCalled();
  });
});
