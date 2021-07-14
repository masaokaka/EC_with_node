import { FC } from "react";
import { Container } from "@material-ui/core";
import { useAppSelector } from "../../../app/hooks";
import { selectUsersInfo } from "../../../features/usersinfo/usersinfoSlice";
import { AdminUsersTable } from "../../organisms/admin/AdminUsersTable";
import AdminHeader from "../../organisms/admin/AdminHeader";

const Users: FC = () => {
  const usersInfo = useAppSelector(selectUsersInfo);
  return (
    <Container>
      <AdminHeader />
      <h2>ユーザー情報</h2>
      <AdminUsersTable usersInfo={usersInfo} />
    </Container>
  );
};

export default Users;
