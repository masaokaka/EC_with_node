import { render, screen } from "@testing-library/react";
import AdminHeaderBtns from "../AdminHeaderBtns";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../../app/store";
import { Provider } from "react-redux";

describe("AdminHeaderBtns", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <AdminHeaderBtns />
        </Router>
      </Provider>
    );
  });
});
