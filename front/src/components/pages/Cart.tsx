import { useEffect, useState, FC } from "react";
import { useHistory } from "react-router-dom";
import { Container, Box } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import { Btn, Price } from "../atoms";
import { CartItemsTable, OrderForm } from "../organisms";
import { calcTotal } from "../../utils/functions";
import {
  selectUid,
  selectUserInfo,
} from "../../features/userinfo/userinfoSlice";
import { selectItems } from "../../features/item/itemsSlice";
import { selectToppings } from "../../features/topping/toppingsSlice";
import { selectCart } from "../../features/cart/cartSlice";

export const Cart: FC = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const uid = useAppSelector(selectUid);
  const userInfo = useAppSelector(selectUserInfo);
  const items = useAppSelector(selectItems);
  const toppings = useAppSelector(selectToppings);
  const cart = useAppSelector(selectCart);

  useEffect(() => {
    if (cart.itemInfo !== undefined) {
      let total = 0;
      cart.itemInfo.forEach((cartItem) => {
        total += calcTotal(
          items,
          cartItem.itemId,
          cartItem.itemSize,
          cartItem.itemNum,
          cartItem.toppings
        );
      });
      setTotalPrice(total);
    }
  }, [cart, items]);

  const showOrderForm = (uid: string | undefined) => {
    if (uid) {
      setShow(true);
    } else {
      localStorage.setItem("ItemInfo", JSON.stringify(cart.itemInfo));
      history.push("/login");
    }
  };
  return (
    <Container>
      <h2>カート</h2>
      {cart.itemInfo !== undefined ? (
        cart.itemInfo.length !== 0 ? (
          <>
            <CartItemsTable
              items={items}
              toppings={toppings}
              cart={cart}
              show={show}
              uid={uid}
            />
            <Box mt={3} textAlign="center">
              <Price price={totalPrice} bigsize={true} tax={true} />
              {show ? (
                <OrderForm
                  cart={cart}
                  userInfo={userInfo!}
                  totalPrice={totalPrice}
                />
              ) : (
                <Btn text="注文に進む" onClick={() => showOrderForm(uid)} />
              )}
            </Box>
          </>
        ) : (
          <h3>商品がありません</h3>
        )
      ) : (
        <h3>商品がありません</h3>
      )}
    </Container>
  );
};

export default Cart;
