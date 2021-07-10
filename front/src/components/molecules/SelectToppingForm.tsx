import { Container, FormLabel } from "@material-ui/core";
import { selectToppings } from "../../features/topping/toppingsSlice";
import { useAppSelector } from "../../app/hooks";
import { SelectForm } from "./SelectForm";
import { CartTopType } from "../../features/cart/cartSlice";
interface Props {
  addedToppings: CartTopType[];
  setAddedToppings: React.Dispatch<React.SetStateAction<CartTopType[]>>;
}

export const SelectToppingForm = ({
  addedToppings,
  setAddedToppings,
}: Props) => {
  const toppings = useAppSelector(selectToppings);
  return (
    <Container>
      <FormLabel component="legend">トッピング</FormLabel>
      {toppings.map((topping) => (
        <SelectForm
          topping={topping}
          addedToppings={addedToppings}
          setAddedToppings={setAddedToppings}
          key={topping.id}
        />
      ))}
    </Container>
  );
};
