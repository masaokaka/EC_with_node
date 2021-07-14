import { db, fieldValue } from "../../apis/firebase";
import { AppThunk } from "../../app/store";
import { ToppingType } from "./toppingsSlice";
import { TOPPING_TABLE_ID, TOPPING_TABLE_PATH } from "../../static/admin";
import { API_PATH, TOPPINGS_COLLECTION_PATH } from "../../apis/mongoDB";
import axios from "axios";

//アイテムの取得
export const fetch_all_toppings = (): Promise<ToppingType[]> =>
  axios
    .get(`${API_PATH + TOPPINGS_COLLECTION_PATH}/fetch-all-toppings`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error(e.message);
    });

//トッピング追加
export const add_topping_to_db = (topping: ToppingType): Promise<ToppingType> =>
  axios
    .post(`${API_PATH + TOPPINGS_COLLECTION_PATH}/add-topping`, topping)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error(e.message);
    });

//トッピング削除
export const delete_topping_from_db = (_id: string): Promise<any> =>
  axios
    .post(`${API_PATH + TOPPINGS_COLLECTION_PATH}/delete-topping`, { _id })
    .then((res) => {
      console.log(res.data.deletedTopping);
      return;
    })
    .catch((e) => {
      throw new Error(e.message);
    });
