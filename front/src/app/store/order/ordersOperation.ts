import { db } from "../../../lib/firebase";
import { setOrder, OrderType, setAllOrders } from "./ordersSlice";
import { unsetCart } from "../cart/cartSlice";
import { AppThunk } from "../../store";
import { ORDER_STATUS_CART } from "../../../state/const";

//注文確定
export const order =
  (newOrder: OrderType): AppThunk =>
  (dispatch): void => {
    db.collection(`users/${newOrder.userId}/order`)
      .doc(newOrder.id)
      .update(newOrder)
      .then(() => {
        dispatch(setOrder(newOrder));
        dispatch(unsetCart());
      })
      .catch((error) => {
        alert(error);
      });
  };

//注文履歴の取得
export const fetchOrders =
  (uid: string): AppThunk =>
  (dispatch): void => {
    db.collection(`users/${uid}/order`)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          if (doc.data().status !== ORDER_STATUS_CART) {
            let order: OrderType = doc.data();
            order.id = doc.id;
            dispatch(setOrder(order));
          }
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

//注文のステータス更新処理
export const updateOrderStatus =
  (
    uid: string,
    orders: OrderType[],
    orderId: string,
    status: number
  ): AppThunk =>
  (dispatch): void => {
    db.collection(`users/${uid}/order`)
      .doc(orderId)
      .update({ status: status })
      .then(() => {
        let newOrders: OrderType[] = orders.map((or): OrderType => {
          if (or.id === orderId) {
            let newOrder = { ...or };
            newOrder.status = status;
            return newOrder;
          } else {
            return or;
          }
        });
        dispatch(setAllOrders(newOrders));
      });
  };
