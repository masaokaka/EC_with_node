import { screen, render } from "@testing-library/react";
import { Inner } from "..";

describe("Inner", () => {
  test("表示テスト", () => {
    render(
      <Inner>
        <p>テスト</p>
      </Inner>
    );
  });
});
