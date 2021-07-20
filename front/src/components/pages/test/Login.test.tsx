import { render, screen } from "@testing-library/react";
import { Login } from "..";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../app/store";
import { Provider } from "react-redux";

describe("Login", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
  });
});
