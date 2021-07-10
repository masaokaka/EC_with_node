import {
  auth,
  db,
  sessionPersistance,
  fieldValue,
} from "../../apis/firebase";
import { setUser } from "./userSlice";
import { AppThunk } from "../../app/store";
import { UserInfoType } from "../userinfo/userinfoSlice";
import { registerUserInfo } from "../userinfo/userinfoAPI";
import { USER_TABLE_PATH, USER_TABLE_ID } from "../../static/admin";
import { ORDER_STATUS_CART } from "../../static/const";
import { CartType } from "../cart/cartSlice";
import { createCart, updateCart } from "../cart/cartAPI";

// //ログイン
export const login =
  (email: string, password: string): AppThunk =>
  (dispatch) => {
    auth.setPersistence(sessionPersistance).then(() => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          if (localStorage.ItemInfo) {
            let uid: string = user.user!.uid;
            let cartItem = JSON.parse(localStorage.getItem("ItemInfo")!);
            db.collection(`users/${uid}/order`)
              .get()
              .then((snapShot) => {
                if (!snapShot.empty) {
                  let cartExist = false;
                  snapShot.forEach((doc) => {
                    //カートが存在した場合
                    if (doc.data().status === ORDER_STATUS_CART) {
                      cartExist = true;
                      let cart: CartType = doc.data();
                      cart.id = doc.id;
                      dispatch(updateCart(cartItem, uid, cart));
                    }
                  });
                  if (cartExist === false) {
                    dispatch(createCart(cartItem, uid));
                  }
                } else {
                  dispatch(createCart(cartItem, uid));
                }
              });
          }
        })
        .catch((e) => {
          alert(e);
        });
    });
  };

//ログアウト
export const logout = () => {
  auth.signOut().catch((e) => {
    alert(e);
  });
};

//新規登録
export const register =
  (password: string, userInfo: UserInfoType): AppThunk =>
  (dispatch) => {
    auth.setPersistence(sessionPersistance).then(() => {
      auth
        .createUserWithEmailAndPassword(userInfo.email!, password)
        .then(() => {
          let user = auth.currentUser;
          if (user !== null) {
            let uid = user.uid;
            let name: string = userInfo.username!;
            userInfo.uid = uid;
            dispatch(setUser({ uid, name }));
            dispatch(registerUserInfo(userInfo));
            db.collection(USER_TABLE_PATH)
              .doc(USER_TABLE_ID)
              .update({ userData: fieldValue.arrayUnion(userInfo) })
              .then(() => {
              })
              .catch((e) => {
                alert(e);
              });
          }
        })
        .catch((error) => {
          alert(error);
        });
    });
  };