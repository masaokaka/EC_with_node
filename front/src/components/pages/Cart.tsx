import { useEffect, useState, FC } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCart } from "../../features/cart/cartSlice";
import { selectItems } from "../../features/item/itemsSlice";
import { selectUid } from "../../features/userinfo/userinfoSlice";
import { selectUserInfo } from "../../features/userinfo/userinfoSlice";
import { Container, Box } from "@material-ui/core";
import { CartItemsTable, OrderForm } from "../organisms";
import { Btn, Price } from "../atoms";
import { calcTotal } from "../../utils/functions";

export const Cart: FC = () => {
  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState(0);
  const cart = useAppSelector(selectCart);
  const uid = useAppSelector(selectUid);
  const items = useAppSelector(selectItems);
  const userInfo = useAppSelector(selectUserInfo);
  const [show, setShow] = useState(false);

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

  const showOrderForm = () => {
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
            <CartItemsTable items={items} cart={cart} show={show} />
            <Box mt={3} textAlign="center">
              <Price price={totalPrice} bigsize={true} tax={true} />
              {show ? (
                <OrderForm
                  cart={cart}
                  userInfo={userInfo!}
                  totalPrice={totalPrice}
                />
              ) : (
                <Btn text="注文に進む" onClick={() => showOrderForm()} />
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
