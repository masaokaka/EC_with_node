import { IconBtn } from "../atoms/IconBtn";
import { useHistory } from "react-router";
import Box from "@material-ui/core/Box";
import { logout } from "../../app/store/user/userOperation";
import { ADMIN_ID } from "../../state/admin";
interface Props {
  uid: string | undefined;
}
export const HeadIconBtns = ({ uid }: Props) => {
  const history = useHistory();
  return (
    <Box style={{ paddingLeft: "20px" }}>
      {uid === ADMIN_ID && (
        <IconBtn icon={"Admin"} onClk={() => history.push("/admin")} />
      )}
      <IconBtn icon={"Cart"} onClk={() => history.push("/cart")} />
      {uid && (
        <IconBtn icon={"History"} onClk={() => history.push("/orderhistory")} />
      )}
      {uid ? (
        <IconBtn icon={"Logout"} onClk={() => logout()} />
      ) : (
        <IconBtn icon={"Login"} onClk={() => history.push("/login")} />
      )}
    </Box>
  );
};
