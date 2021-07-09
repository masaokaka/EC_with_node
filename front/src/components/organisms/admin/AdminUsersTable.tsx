import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { ItemsTableHead } from "../../molecules/ItemsTableHead";
import { IconBtn } from "../../atoms/IconBtn";
import { useHistory } from "react-router";
import { UserInfoType } from "../../../app/store/userinfo/userinfoSlice";

interface Props {
  usersInfo: UserInfoType[];
}

export const AdminUsersTable = ({ usersInfo }: Props) => {
  const history = useHistory();
  return (
    <TableContainer>
      <Table>
        <ItemsTableHead
          heads={[
            { text: "No", col: 2 },
            { text: "ID", col: 2 },
            { text: "ユーザー名", col: 2 },
            { text: "メールアドレス", col: 2 },
            { text: "", col: 2 },
          ]}
        />
        <TableBody>
          {usersInfo.map((user, index) => (
            <TableRow key={index}>
              <TableCell colSpan={2} align="center">
                {index + 1}
              </TableCell>
              <TableCell colSpan={2} align="center">
                {user.uid}
              </TableCell>
              <TableCell colSpan={2} align="center">
                {user.username}
              </TableCell>
              <TableCell colSpan={2} align="center">
                {user.email}
              </TableCell>
              <TableCell colSpan={2} align="center">
                <IconBtn
                  icon="Edit"
                  onClk={() => history.push(`/admin/users/${user.uid}`)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
