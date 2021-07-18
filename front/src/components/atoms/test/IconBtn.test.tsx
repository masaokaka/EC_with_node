import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconBtn } from "../";

describe("IconBtn", () => {
  const mockFunc = jest.fn();
  beforeEach(() => {
    render(<IconBtn icon="Menu" onClick={() => mockFunc()} />);
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
describe("IconBtn　表示テスト", () => {
  const mockFunc = jest.fn();
  render(<IconBtn icon="Menu" onClick={() => mockFunc()} />);
  render(<IconBtn icon="Search" onClick={() => mockFunc()} />);
  render(<IconBtn icon="Admin" onClick={() => mockFunc()} />);
  render(<IconBtn icon="Arrow" onClick={() => mockFunc()} />);
  render(<IconBtn icon="Login" onClick={() => mockFunc()} />);
  render(<IconBtn icon="Logout" onClick={() => mockFunc()} />);
  render(<IconBtn icon="Edit" onClick={() => mockFunc()} />);
  render(<IconBtn icon="Cart" onClick={() => mockFunc()} />);
  render(<IconBtn icon="History" onClick={() => mockFunc()} />);
});
