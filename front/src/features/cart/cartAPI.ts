import { db, fieldValue } from "../../apis/firebase";
import { setCart, CartItemType, CartType } from "./cartSlice";
import { ORDER_STATUS_CART } from "../../static/const";
import { AppThunk } from "../../app/store";

//カートの更新
export const updateCart =
  (cartItems: CartItemType[], uid: string, cart: CartType): AppThunk =>
  (dispatch): void => {
    db.collection(`users/${uid}/order`)
      .doc(cart._id)
      .update({ itemInfo: fieldValue.arrayUnion(...cartItems) })
      .then(() => {
        let newCart: CartType = { ...cart };
        newCart.itemInfo = [...cart.itemInfo!, ...cartItems];
        dispatch(setCart(newCart));
      })
      .catch((error) => {
        alert(error);
      });
  };

//カートの新規作成
export const createCart =
  (cartItems: CartItemType[], uid: string): AppThunk =>
  (dispatch): void => {
    let cart: CartType = {
      userId: uid,
      itemInfo: [...cartItems],
      status: 0,
    };
    db.collection(`users/${uid}/order`)
      .add(cart)
      .then((doc) => {
        cart._id = doc.id;
        dispatch(setCart(cart));
      })
      .catch((error) => {
        alert(error);
      });
  };

//カートの取得
export const fetchCart =
  (uid: string): AppThunk =>
  (dispatch): void => {
    db.collection(`users/${uid}/order`)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          if (doc.data().status === ORDER_STATUS_CART) {
            let cart: CartType = doc.data();
            cart._id = doc.id;
            dispatch(setCart(cart));
          }
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

//カートの商品削除
export const deleteCartItem =
  (delItem: CartItemType, uid: string, cart: CartType): AppThunk =>
  (dispatch): void => {
    db.collection(`users/${uid}/order`)
      .doc(cart._id)
      .update({ itemInfo: fieldValue.arrayRemove(delItem) })
      .then(() => {
        let newCart: CartType = { ...cart };
        newCart.itemInfo = cart.itemInfo!.filter((it) => it._id !== delItem._id);
        dispatch(setCart(newCart));
      })
      .catch((error) => {
        alert(error);
      });
  };
