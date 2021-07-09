import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ItemType, selectItems } from "../../app/store/item/itemsSlice";
import { useAppSelector } from "../../app/hooks";
import { Container } from "@material-ui/core";
import { ItemDetail } from "../molecules/ItemDetail";
import { RadioInput } from "../molecules/RadioInput";
import { SelectToppingForm } from "../molecules/SelectToppingForm";
import { Price } from "../atoms/Price";
import { Btn } from "../atoms/Btn";
import { SelectNumForm } from "../molecules/SelectNumForm";
import { createRandomId } from "../../utils/functions";
import { calcTotal } from "../../utils/functions";
import { selectUser } from "../../app/store/user/userSlice";
import { SIZE_M_STATUS } from "../../state/const";
import {
  setCart,
  selectCart,
  CartType,
  CartItemType,
} from "../../app/store/cart/cartSlice";
import { updateCart, createCart } from "../../app/store/cart/cartOperation";
import { CartTopType } from "../../app/store/cart/cartSlice";

export const ItemInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useAppSelector(selectUser);
  const items = useAppSelector(selectItems);
  const cart = useAppSelector(selectCart);
  const [addedToppings, setAddedToppings] = useState<CartTopType[]>([]);
  const [itemSize, setItemSize] = useState(SIZE_M_STATUS);
  const [itemNum, setItemNum] = useState(1);
  const { itemid }: { itemid: string } = useParams();
  const [item, setItem] = useState<ItemType>();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    items.forEach((item): void => {
      if (item.id === parseInt(itemid)) {
        setItem(item);
      }
    });
  }, [items, itemid]);

  useEffect(() => {
    if (item !== undefined) {
      let total: number = calcTotal(
        items,
        item.id!,
        itemSize,
        itemNum,
        addedToppings
      );
      setTotalPrice(total);
    }
  }, [item, addedToppings, itemSize, itemNum]);

  const doAddCart = () => {
    let selectedToppings: CartTopType[] = addedToppings.filter(
      (top) => top.size !== 9
    );
    let cartItem: CartItemType = {
      id: createRandomId(),
      itemId: parseInt(itemid),
      itemNum: itemNum,
      itemSize: itemSize,
      toppings: selectedToppings,
    };
    if (user.uid) {
      if (Object.keys(cart).length !== 0) {
        dispatch(updateCart([cartItem], user.uid, cart));
      } else {
        dispatch(createCart([cartItem], user.uid));
      }
    } else {
      if (Object.keys(cart).length === 0) {
        let newCart = {
          itemInfo: [cartItem],
          status: 0,
        };
        dispatch(setCart(newCart));
      } else {
        let newCart: CartType = JSON.parse(JSON.stringify(cart));
        newCart.itemInfo!.push(cartItem);
        dispatch(setCart(newCart));
      }
    }
    history.push("/cart");
  };
  return (
    <Container>
      <h2>商品詳細</h2>
      <ItemDetail item={item} />
      <RadioInput item={item} itemSize={itemSize} setItemSize={setItemSize} />
      <SelectNumForm itemNum={itemNum} setItemNum={setItemNum} />
      <SelectToppingForm
        addedToppings={addedToppings}
        setAddedToppings={setAddedToppings}
      />
      <Price price={totalPrice} bigsize={true} tax={true} />
      <Btn text="カートに追加する" onClk={() => doAddCart()} />
    </Container>
  );
};
