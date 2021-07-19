import { render, screen } from "@testing-library/react";
import { Home } from "..";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../app/store";
import { Provider } from "react-redux";

describe("Home", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );
  });
});
