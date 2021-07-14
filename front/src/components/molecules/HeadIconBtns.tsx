import { IconBtn } from "../atoms";
import { useHistory } from "react-router";
import Box from "@material-ui/core/Box";
import { logout_from_firebase } from "../../features/userinfo/userinfoAPI";
import { ADMIN_ID } from "../../static/admin";
interface Props {
  uid: string | undefined;
}
export const HeadIconBtns = ({ uid }: Props) => {
  const history = useHistory();
  return (
    <Box style={{ paddingLeft: "20px" }}>
      {uid === ADMIN_ID && (
        <IconBtn icon={"Admin"} onClk={() => history.push("/admin/users")} />
      )}
      <IconBtn icon={"Cart"} onClk={() => history.push("/cart")} />
      {uid && (
        <IconBtn icon={"History"} onClk={() => history.push("/orderhistory")} />
      )}
      {uid ? (
        <IconBtn icon={"Logout"} onClk={() => logout_from_firebase()} />
      ) : (
        <IconBtn icon={"Login"} onClk={() => history.push("/login")} />
      )}
    </Box>
  );
};
