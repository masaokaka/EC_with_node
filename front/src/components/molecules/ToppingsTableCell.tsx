import { useAppSelector } from "../../app/hooks";
import { CartTopType } from "../../features/cart/cartSlice";
import { selectToppings } from "../../features/topping/toppingsSlice";
interface Props {
  cartTopping: CartTopType;
}
export const ToppingsTableCell = ({ cartTopping }: Props) => {
  const toppings = useAppSelector(selectToppings);
  return (
    <>
      {toppings.map(
        (topping, index) =>
          cartTopping.id === topping.id && (
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
