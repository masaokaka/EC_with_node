import { fireEvent, render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectNumForm } from "../";

describe("SelectNumForm", () => {
  const mockFunc = jest.fn();
  beforeEach(() => {
    let itemNum = 15;
    render(
      <SelectNumForm
        itemNum={itemNum}
        setItemNum={() => {
          mockFunc();
        }}
      />
    );
  });
  test("プロップス表示テスト", () => {
    expect(screen.getByText(15).textContent).toBe("15");
  });
  test("クリック確認", async () => {
    let select = screen.getByText("15");
    await act(async () => {
      await fireEvent.click(select);
    });
  });
});
