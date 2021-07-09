import { useDispatch } from "react-redux";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { ItemType } from "../../../app/store/item/itemsSlice";
import { ItemsTableHead } from "../../molecules/ItemsTableHead";
import { Btn } from "../../atoms/Btn";
import { deleteItem } from "../../../app/store/item/itemsOperation";
import { Price } from "../../atoms/Price";

interface Props {
  items: ItemType[];
}

export const AdminItemsTable = ({ items }: Props) => {
  const dispatch = useDispatch();
  const doDeleteItem = (delItem: ItemType) => {
    dispatch(deleteItem(delItem, items));
  };
  return (
    <TableContainer>
      <Table>
        <ItemsTableHead
          heads={[
            { text: "ID", col: 2 },
            { text: "画像", col: 2 },
            { text: "商品名", col: 2 },
            { text: "M価格(税抜)", col: 2 },
            { text: "L価格(税抜)", col: 2 },
            { text: "", col: 2 },
          ]}
        />
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell colSpan={2} align="center">
                {item.id}
              </TableCell>
              <TableCell colSpan={2} align="center">
                <img src={item.img} width="180" height="140" alt="画像" />
              </TableCell>
              <TableCell colSpan={2} align="center">
                {item.name}
              </TableCell>
              <TableCell colSpan={2} align="center">
                <Price price={item.mprice!} tax={false} bigsize={false} />
              </TableCell>
              <TableCell colSpan={2} align="center">
                <Price price={item.lprice!} tax={false} bigsize={false} />
              </TableCell>
              <TableCell colSpan={2} align="center">
                <Btn text="削除" onClk={() => doDeleteItem(item)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
