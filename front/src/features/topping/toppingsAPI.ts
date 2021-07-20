import { ToppingType } from "./toppingsSlice";
import { API_PATH, TOPPINGS_COLLECTION_PATH } from "../../apis/mongoDB";
import axios, { AxiosResponse } from "axios";

//アイテムの取得
export const fetch_all_toppings = (): Promise<ToppingType[]> =>
  axios
    .get(`${API_PATH + TOPPINGS_COLLECTION_PATH}/fetch-all-toppings`)
    .then((res: AxiosResponse<ToppingType[]>) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error(e);
    });

//トッピング追加
export const add_topping_to_db = (topping: ToppingType): Promise<ToppingType> =>
  axios
    .post(`${API_PATH + TOPPINGS_COLLECTION_PATH}/add-topping`, topping)
    .then((res: AxiosResponse<ToppingType>) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error(e);
    });

//トッピング削除
export const delete_topping_from_db = (_id: string): Promise<any> =>
  axios
    .post(`${API_PATH + TOPPINGS_COLLECTION_PATH}/delete-topping`, { _id })
    .then((res: AxiosResponse<any>) => {
      console.log(res.data.deletedTopping);
      return;
    })
    .catch((e) => {
      throw new Error(e);
    });
