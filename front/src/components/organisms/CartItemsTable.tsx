import { Table, TableBody, TableContainer, Paper } from "@material-ui/core";
import { CartType } from "../../features/cart/cartSlice";
import { ItemType } from "../../features/item/itemsSlice";
import { ItemsTableHead } from "../molecules/ItemsTableHead";
import { CartItemsTableRow } from "../molecules/CartItemsTableRow";
import { ORDER_STATUS_CART } from "../../static/const";
import { FC } from "react";

interface Props {
  items: ItemType[];
  cart: CartType;
  show: boolean;
}
const CartItemsTable: FC<Props> = ({ items, cart, show }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <ItemsTableHead
          heads={[
            { text: "", col: 2 },
            { text: "商品名", col: 2 },
            { text: "価格(税抜)", col: 2 },
            { text: "個数", col: 2 },
            { text: "トッピング：価格(税抜)", col: 2 },
            { text: "", col: 2 },
          ]}
        />
        <TableBody>
          {cart.itemInfo!.map((cartItem, index) =>
            items.map(
              (item) =>
                item._id === cartItem.itemId && (
                  <CartItemsTableRow
                    key={index}
                    items={items}
                    cart={cart}
                    cartItem={cartItem}
                    show={show}
                    status={ORDER_STATUS_CART}
                  />
                )
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartItemsTable;
