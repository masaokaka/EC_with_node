import { FC } from "react";
import { IconBtn } from "../atoms";
import { useHistory } from "react-router";
import Box from "@material-ui/core/Box";
import { logout_from_firebase } from "../../features/userinfo/userinfoAPI";
import { ADMIN_ID } from "../../static/admin";
interface Props {
  uid: string | undefined;
}

const HeadIconBtns: FC<Props> = ({ uid }: Props) => {
  const history = useHistory();
  return (
    <Box style={{ paddingLeft: "20px" }}>
      {uid === ADMIN_ID && (
        <IconBtn icon={"Admin"} onClick={() => history.push("/admin/users")} />
      )}
      <IconBtn icon={"Cart"} onClick={() => history.push("/cart")} />
      {uid && (
        <IconBtn icon={"History"} onClick={() => history.push("/orderhistory")} />
      )}
      {uid ? (
        <IconBtn icon={"Logout"} onClick={() => logout_from_firebase()} />
      ) : (
        <IconBtn icon={"Login"} onClick={() => history.push("/login")} />
      )}
    </Box>
  );
};

export default HeadIconBtns;
