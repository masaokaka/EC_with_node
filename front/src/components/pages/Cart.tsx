import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectCart } from "../../app/store/cart/cartSlice";
import { selectItems } from "../../app/store/item/itemsSlice";
import { selectUser } from "../../app/store/user/userSlice";
import { selectUserInfo } from "../../app/store/userinfo/userinfoSlice";
import { Container, Box } from "@material-ui/core";
import { CartItemsTable } from "../organisms/CartItemsTable";
import { OrderForm } from "../organisms/OrderForm";
import { Btn } from "../atoms/Btn";
import { Price } from "../atoms/Price";
import { calcTotal } from "../../utils/functions";

export const Cart = () => {
  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState(0);
  const cart = useAppSelector(selectCart);
  const user = useAppSelector(selectUser);
  const items = useAppSelector(selectItems);
  const userInfo = useAppSelector(selectUserInfo);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (cart.itemInfo !== undefined) {
      let total = 0;
      cart.itemInfo.forEach((cartItem) => {
        total += calcTotal(
          items,
          Number(cartItem.itemId),
          cartItem.itemSize,
          cartItem.itemNum,
          cartItem.toppings
        );
      });
      setTotalPrice(total);
    }
  }, [cart]);

  const showOrderForm = () => {
    if (user.uid) {
      setShow(true);
    } else {
      localStorage.setItem("ItemInfo",JSON.stringify(cart.itemInfo))
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
                  userInfo={userInfo}
                  totalPrice={totalPrice}
                />
              ) : (
                <Btn text="注文に進む" onClk={() => showOrderForm()} />
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
