import { useParams, useHistory } from "react-router-dom";
import { useState, FC, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ItemType, selectItems } from "../../features/item/itemsSlice";
import { useAppSelector } from "../../app/hooks";
import { Container } from "@material-ui/core";
import { ItemDetail } from "../molecules/ItemDetail";
import { RadioInput } from "../molecules/RadioInput";
import { SelectToppingForm } from "../molecules/SelectToppingForm";
import { Btn, Price } from "../atoms";
import { SelectNumForm } from "../molecules/SelectNumForm";
import { createRandomId } from "../../utils/functions";
import { calcTotal } from "../../utils/functions";
import { selectUid } from "../../features/userinfo/userinfoSlice";
import { SIZE_M_STATUS, SIZE_NONE_STATUS } from "../../static/const";
import {
  setCart,
  selectCart,
  CartType,
  CartItemType,
} from "../../features/cart/cartSlice";
import { updateCart, createCart } from "../../features/cart/cartAPI";
import { CartTopType } from "../../features/cart/cartSlice";

const ItemInfo: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const uid = useAppSelector(selectUid);
  const items = useAppSelector(selectItems);
  const cart = useAppSelector(selectCart);
  const [addedToppings, setAddedToppings] = useState<CartTopType[]>([]);
  const [itemSize, setItemSize] = useState(SIZE_M_STATUS);
  const [itemNum, setItemNum] = useState(1);
  const { itemid }: { itemid: string } = useParams();
  const [totalPrice, setTotalPrice] = useState(0);

  const item = useMemo((): ItemType => {
    let it: ItemType[];
    it = items.filter((item) => item._id === itemid);
    return it[0];
  }, [items, itemid]);

  useEffect(() => {
    if (item !== undefined) {
      let total: number = calcTotal(
        items,
        item._id!,
        itemSize,
        itemNum,
        addedToppings
      );
      setTotalPrice(total);
    }
  }, [item, addedToppings, itemSize, itemNum, items]);

  const doAddCart = () => {
    let selectedToppings: CartTopType[] = addedToppings.filter(
      (top) => top.size !== SIZE_NONE_STATUS
    );
    let cartItem: CartItemType = {
      _id: createRandomId(),
      itemId: itemid,
      itemNum: itemNum,
      itemSize: itemSize,
      toppings: selectedToppings,
    };
    if (uid) {
      if (Object.keys(cart).length !== 0) {
        dispatch(updateCart([cartItem], uid, cart));
      } else {
        dispatch(createCart([cartItem], uid));
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

export default ItemInfo;
