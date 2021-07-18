import { FormLabel } from "@material-ui/core";
import { FC } from "react";
import { selectToppings } from "../../features/topping/toppingsSlice";
import { useAppSelector } from "../../app/hooks";
import { SelectToppingForm } from ".";
import { CartTopType } from "../../features/cart/cartSlice";
interface Props {
  addedToppings: CartTopType[];
  setAddedToppings: React.Dispatch<React.SetStateAction<CartTopType[]>>;
}

const ToppingFormWrapper: FC<Props> = ({
  addedToppings,
  setAddedToppings,
}) => {
  const toppings = useAppSelector(selectToppings);
  return (
    <>
      <FormLabel component="div" style={{ margin: 10 }}>
        トッピング
      </FormLabel>
      {toppings.map((topping) => (
        <SelectToppingForm
          topping={topping}
          addedToppings={addedToppings}
          setAddedToppings={setAddedToppings}
          key={topping._id}
        />
      ))}
    </>
  );
};

export default ToppingFormWrapper;
