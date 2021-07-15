import { OrderType } from "./ordersSlice";
import axios from "axios";
import { API_PATH, ORDERS_COLLECTION_PATH } from "../../apis/mongoDB";

//オーダー更新処理
export const update_order = (order: OrderType): Promise<OrderType> =>
  axios
    .post(`${API_PATH + ORDERS_COLLECTION_PATH}/update-order-all`, { order })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error(e.message);
    });

//オーダーのステータス更新処理
export const update_order_status = (
  status: number,
  _id: string
): Promise<OrderType> =>
  axios
    .post(`${API_PATH + ORDERS_COLLECTION_PATH}/update-order-status`, {
      status,
      _id,
    })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error(e.message);
    });

//ユーザーの注文履歴を全件取得取得
export const fetch_all_orders_of_user = (uid: string): Promise<OrderType[]> =>
  axios
    .post(`${API_PATH + ORDERS_COLLECTION_PATH}/fetch-all-orders-of-user`, { uid })
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error(e.message);
    });
