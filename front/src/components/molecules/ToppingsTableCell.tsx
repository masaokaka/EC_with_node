import { FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { CartTopType } from "../../features/cart/cartSlice";
import { selectToppings } from "../../features/topping/toppingsSlice";
interface Props {
  cartTopping: CartTopType;
}

const ToppingsTableCell: FC<Props> = ({ cartTopping }) => {
  const toppings = useAppSelector(selectToppings);
  return (
    <>
      {toppings.map(
        (topping, index) =>
          cartTopping.toppingId === topping._id && (
            <div key={index}>
              <span>{topping.name}：</span>
              {cartTopping.size === 0 ? (
                <span>{topping.mprice}円</span>
              ) : (
                <span>{topping.lprice}円</span>
              )}
            </div>
          )
      )}
    </>
  );
};

export default ToppingsTableCell;
