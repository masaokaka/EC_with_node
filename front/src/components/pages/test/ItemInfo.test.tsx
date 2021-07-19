import { render, screen } from "@testing-library/react";
import { ItemInfo } from "..";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../app/store";
import { Provider } from "react-redux";

describe("ItemInfo", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <ItemInfo />
        </Router>
      </Provider>
    );
  });
});
