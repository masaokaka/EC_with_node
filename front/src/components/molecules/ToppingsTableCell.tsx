import { useAppSelector } from "../../app/hooks";
import { CartTopType } from "../../app/store/cart/cartSlice";
import { selectToppings } from "../../app/store/topping/toppingsSlice";
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
