import { fireEvent, render, screen } from "@testing-library/react";
import { RadioInput } from "..";
import { BrowserRouter as Router } from "react-router-dom";
import { useState, FC } from "react";
import { act } from "react-dom/test-utils";

describe("RadioInput", () => {
  let item = {
    _id: "f4i3h8923r8c",
    name: "カレー",
    text: "美味しい",
    mprice: 1000,
    lprice: 2000,
    img: "",
  };
  const Wrapper: FC = () => {
    const [size, setSize] = useState(0);
    return (
      <div>
        <RadioInput item={item} itemSize={size} setItemSize={setSize} />
      </div>
    );
  };
  beforeEach(() => {
    render(<Wrapper />);
  });
  it("check Msize", async () => {
    let inputM = screen.getAllByRole("radio")[0];
    let inputL = screen.getAllByRole("radio")[1];
    await act(async () => {
      fireEvent.click(inputL);
    });
    expect(inputM).not.toBeChecked();
  });
  it("check Lsize", async () => {
    let inputM = screen.getAllByRole("radio")[0];
    let inputL = screen.getAllByRole("radio")[1];
    await act(async () => {
      fireEvent.click(inputM);
    });
    expect(inputL).not.toBeChecked();
  });
});
