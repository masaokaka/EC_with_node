import { Container } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import { selectUsersInfo } from "../../app/store/usersinfo/usersinfoSlice";
import { AdminUsersTable } from "../organisms/admin/AdminUsersTable";
export const AdminUsers = () => {
  const usersInfo = useAppSelector(selectUsersInfo);
  return (
    <Container>
      <h2>ユーザー情報</h2>
      <AdminUsersTable usersInfo={usersInfo} />
    </Container>
  );
};
