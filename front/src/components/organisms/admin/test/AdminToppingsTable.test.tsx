import { render, screen } from "@testing-library/react";
import AdminToppingsTable from "../AdminToppingsTable";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../../../../app/store";
import { Provider } from "react-redux";

let topping = {
  _id: "cerljvln430",
  name: "キムチ",
  mprice: 200,
  lprice: 300,
};

let testToppings = [topping];

describe("AdminToppingsTable", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <AdminToppingsTable toppings={testToppings} />
        </Router>
      </Provider>
    );
  });
});
