import { render, screen } from "@testing-library/react";
import Items from "../Items";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../../app/store";
import { Provider } from "react-redux";

describe("admin/items", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <Items />
        </Router>
      </Provider>
    );
  });
});
