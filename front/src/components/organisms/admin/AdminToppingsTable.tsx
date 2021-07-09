import { useDispatch } from "react-redux";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { ToppingType } from "../../../app/store/topping/toppingsSlice";
import { ItemsTableHead } from "../../molecules/ItemsTableHead";
import { Btn } from "../../atoms/Btn";
import { deleteTopping } from "../../../app/store/topping/toppingsOperation";
import { Price } from "../../atoms/Price";
interface Props {
  toppings: ToppingType[];
}
export const AdminToppingsTable = ({ toppings }: Props) => {
  const dispatch = useDispatch();
  const doDeleteTopping = (delTopping: ToppingType) => {
    dispatch(deleteTopping(delTopping, toppings));
  };
  return (
    <TableContainer>
      <Table>
        <ItemsTableHead
          heads={[
            { text: "ID", col: 2 },
            { text: "商品名", col: 2 },
            { text: "M価格(税抜)", col: 2 },
            { text: "L価格(税抜)", col: 2 },
            { text: "", col: 2 },
          ]}
        />
        <TableBody>
          {toppings.map((topping) => (
            <TableRow key={topping.id}>
              <TableCell colSpan={2} align="center">
                {topping.id}
              </TableCell>
              <TableCell colSpan={2} align="center">
                {topping.name}
              </TableCell>
              <TableCell colSpan={2} align="center">
                <Price price={topping.mprice!} tax={false} bigsize={false} />
              </TableCell>
              <TableCell colSpan={2} align="center">
                <Price price={topping.lprice!} tax={false} bigsize={false} />
              </TableCell>
              <TableCell colSpan={2} align="center">
                <Btn text="削除" onClk={() => doDeleteTopping(topping)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
