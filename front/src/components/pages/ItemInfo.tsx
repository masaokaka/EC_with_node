import { useParams, useHistory } from "react-router-dom";
import { useState, FC, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ItemType, selectItems } from "../../features/item/itemsSlice";
import { selectToppings } from "../../features/topping/toppingsSlice";
import { useAppSelector } from "../../app/hooks";
import { Container, Grid } from "@material-ui/core";
import { ItemDetail, SelectNumForm, ToppingFormWrapper } from "../molecules";
import { Btn, Price, RadioInput } from "../atoms";
import { createRandomId } from "../../utils/functions";
import { calcTotal } from "../../utils/functions";
import { selectUid } from "../../features/userinfo/userinfoSlice";
import {
  SIZE_M_STATUS,
  SIZE_NONE_STATUS,
  ORDER_STATUS_CART,
} from "../../static/const";
import {
  selectCart,
  CartType,
  CartItemType,
  setCart,
  addItemToCartAsync,
  createCartAsync,
  CartTopType,
} from "../../features/cart/cartSlice";

const ItemInfo: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const uid = useAppSelector(selectUid);
  const items = useAppSelector(selectItems);
  const toppings = useAppSelector(selectToppings);
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
    //選択されたトッピングを整理
    let selectedToppings: CartTopType[] = addedToppings.filter(
      (top) => top.size !== SIZE_NONE_STATUS
    );
    //カート内へ追加する商品情報をまとめる
    let cartItem: CartItemType = {
      id: createRandomId(),
      itemId: itemid,
      itemNum: itemNum,
      itemSize: itemSize,
      toppings: selectedToppings,
    };
    //ユーザーがログインしていたら
    if (uid) {
      //カートにすでに何かが入っていた場合
      if (Object.keys(cart).length !== 0) {
        dispatch(
          addItemToCartAsync({
            itemInfo: [...cart.itemInfo!, cartItem],
            uid: uid,
          })
        );
        history.push("/cart");
        //カートが存在していなかった場合
      } else {
        //新しいカートを作成
        let new_cart: CartType = {
          status: ORDER_STATUS_CART,
          itemInfo: [cartItem],
          uid: uid,
        };
        dispatch(createCartAsync({ cart: new_cart }));
        history.push("/cart");
      }
      //ユーザーがログインしていない場合
    } else {
      //カートが存在していなかった場合
      if (Object.keys(cart).length === 0) {
        let new_cart = {
          itemInfo: [cartItem],
          status: 0,
        };
        dispatch(setCart(new_cart));
        history.push("/cart");
      } else {
        //すでにカートに何か入っていた場合
        let new_cart: CartType = { ...cart };
        new_cart.itemInfo = [...new_cart.itemInfo!, cartItem];
        dispatch(setCart(new_cart));
        history.push("/cart");
      }
    }
  };
  return (
    <Container>
      <h2>商品詳細</h2>
      <ItemDetail item={item} />
      <Grid container direction="column" alignContent="center">
        <Grid item>
          <RadioInput
            item={item}
            itemSize={itemSize}
            setItemSize={setItemSize}
          />
        </Grid>
        <Grid item>
          <SelectNumForm itemNum={itemNum} setItemNum={setItemNum} />
        </Grid>
        <Grid item>
          <ToppingFormWrapper
            toppings={toppings}
            addedToppings={addedToppings}
            setAddedToppings={setAddedToppings}
          />
        </Grid>
        <Grid item>
          <Price price={totalPrice} bigsize={true} tax={true} />
        </Grid>
        <Grid item>
          <Btn text="カートに追加する" onClick={() => doAddCart()} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ItemInfo;
