import { render, screen } from "@testing-library/react";
import { ItemsTableHead } from "../";
import { Table } from "@material-ui/core";

//テスト用データたち------------
let testHeads = [
  { text: "テスト１", col: 2 },
  { text: "テスト２", col: 2 },
  { text: "テスト３", col: 2 },
  { text: "テスト４", col: 4 },
];

describe("ItemsTableHead", () => {
  test("プロップスの値が正しく表示されているかテスト", () => {
    render(
      <Table>
        <ItemsTableHead heads={testHeads} />
      </Table>
    );
    expect(screen.getAllByText(/テスト/)).toHaveLength(testHeads.length);
    // screen.debug();
  });
});
