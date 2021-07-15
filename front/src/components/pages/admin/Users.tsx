import { FC } from "react";
import { Container } from "@material-ui/core";
import { useAppSelector } from "../../../app/hooks";
import { selectUserInfos } from "../../../features/userinfos/userinfosSlice";
import { AdminUsersTable } from "../../organisms/admin/AdminUsersTable";
import AdminHeaderBtns from "../../organisms/admin/AdminHeaderBtns";

const Users: FC = () => {
  const userInfos = useAppSelector(selectUserInfos);
  return (
    <Container>
      <AdminHeaderBtns />
      <h2>ユーザー情報</h2>
      <AdminUsersTable userInfos={userInfos} />
    </Container>
  );
};

export default Users;
