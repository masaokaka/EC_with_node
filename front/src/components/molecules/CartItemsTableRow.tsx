import { FC } from "react";
import { TableCell, TableRow } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import {
  CartItemType,
  CartType,
  setCart,
  deleteItemFromCartAsync,
} from "../../features/cart/cartSlice";
import { ItemType } from "../../features/item/itemsSlice";
import { useDispatch } from "react-redux";
import { Btn, Price } from "../atoms";
import { selectUid } from "../../features/userinfo/userinfoSlice";
import { ToppingsTableCell } from ".";
import { ORDER_STATUS_CART } from "../../static/const";

interface Props {
  items: ItemType[];
  cart: CartType;
  cartItem: CartItemType;
  show: boolean;
  status: number;
}

const CartItemsTableRow: FC<Props> = ({
  items,
  cart,
  cartItem,
  show,
  status,
}) => {
  const dispatch = useDispatch();
  const uid = useAppSelector(selectUid);

  const doDeleteCartItem = (id: string) => {
    let new_cart: CartType = { ...cart };
    new_cart.itemInfo = cart.itemInfo!.filter((item) => item.id !== id);
    if (uid) {
      dispatch(
        deleteItemFromCartAsync({ itemInfo: new_cart.itemInfo, uid: uid })
      );
    } else {
      dispatch(setCart(new_cart));
    }
  };

  return (
    <>
      {items.map(
        (item, index) =>
          item._id === cartItem.itemId && (
            <TableRow key={index}>
              {/* 画像(カートのみ) */}
              {status === ORDER_STATUS_CART && (
                <TableCell colSpan={2} align="center">
                  <img src={item.img} width="180" height="140" alt="カレー" />
                </TableCell>
              )}

              {/* 名前 */}
              <TableCell colSpan={2} align="center">
                {item.name}
              </TableCell>

              {/* 価格 */}
              {cartItem.itemSize === 0 ? (
                <TableCell colSpan={2} align="center">
                  <Price price={item.mprice!} tax={false} bigsize={false} />
                </TableCell>
              ) : (
                <TableCell colSpan={2} align="center">
                  <Price price={item.lprice!} tax={false} bigsize={false} />
                </TableCell>
              )}

              {/* 個数 */}
              <TableCell colSpan={2} align="center">
                {cartItem.itemNum}個
              </TableCell>

              {/* トッピング */}
              <TableCell colSpan={2} align="center">
                {cartItem.toppings.length !== 0 ? (
                  cartItem.toppings.map((cartTopping, index) => (
                    <ToppingsTableCell key={index} cartTopping={cartTopping} />
                  ))
                ) : (
                  <div>なし</div>
                )}
              </TableCell>

              {/* 削除ボタン(カートのみ) */}
              {status === ORDER_STATUS_CART && (
                <TableCell colSpan={2}>
                  {!show && (
                    <Btn
                      text="削除"
                      onClick={() => doDeleteCartItem(cartItem.id)}
                    />
                  )}
                </TableCell>
              )}
            </TableRow>
          )
      )}
    </>
  );
};

export default CartItemsTableRow;
