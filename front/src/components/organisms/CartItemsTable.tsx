import { Table, TableBody, TableContainer, Paper } from "@material-ui/core";
import { CartType } from "../../app/store/cart/cartSlice";
import { ItemType } from "../../app/store/item/itemsSlice";
import { ItemsTableHead } from "../molecules/ItemsTableHead";
import { CartItemsTableRow } from "../molecules/CartItemsTableRow";
import { ORDER_STATUS_CART } from "../../state/const";

interface Props {
  items: ItemType[];
  cart: CartType;
  show: boolean;
}
export const CartItemsTable = ({ items, cart, show }: Props) => {
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
                item.id === cartItem.itemId && (
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
