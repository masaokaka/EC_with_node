import { render, screen } from "@testing-library/react";
import AdminToppingsForm from "../AdminToppingsForm";
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

describe("AdminToppingsForm", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <Router>
          <AdminToppingsForm toppings={testToppings} />
        </Router>
      </Provider>
    );
  });
});
