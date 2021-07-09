import { db, fieldValue } from "../../../lib/firebase";
import { setToppings } from "./toppingsSlice";
import { AppThunk } from "../../store";
import { ToppingType } from "./toppingsSlice";
import { TOPPING_TABLE_ID, TOPPING_TABLE_PATH } from "../../../state/admin";

//アイテムの取得
export const fetchToppings = (): AppThunk => (dispatch) => {
  db.collection(TOPPING_TABLE_PATH)
    .doc(TOPPING_TABLE_ID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let data = doc.data();
        dispatch(setToppings(data!.toppingData));
      }
    })
    .catch((error) => {
      alert(error);
    });
};

//トッピング追加
export const addTopping =
  (toppings: ToppingType[], topping: ToppingType): AppThunk =>
  (dispatch) => {
    db.collection(TOPPING_TABLE_PATH)
      .doc(TOPPING_TABLE_ID)
      .update({ toppingData: fieldValue.arrayUnion(topping) })
      .then(() => {
        let newToppings = [...toppings, topping];
        dispatch(setToppings(newToppings));
      });
  };

//トッピング削除
export const deleteTopping =
  (delTopping: ToppingType, toppings: ToppingType[]): AppThunk =>
  (dispatch): void => {
    db.collection(TOPPING_TABLE_PATH)
      .doc(TOPPING_TABLE_ID)
      .update({ toppingData: fieldValue.arrayRemove(delTopping) })
      .then(() => {
        let newToppings = toppings.filter(
          (topping) => topping.id !== delTopping.id
        );
        dispatch(setToppings(newToppings));
      })
      .catch((error) => {
        alert(error);
      });
  };
