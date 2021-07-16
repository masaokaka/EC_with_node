import { FC } from "react";
import { Redirect } from "react-router";
import { ADMIN_ID } from "../../static/admin";
interface Props {
  uid: string | undefined;
  children: any;
}
const AuthGuard: FC<Props> = ({ uid, children }) => {
  return uid !== undefined && uid === ADMIN_ID ? (
    children
  ) : (
    <Redirect to={"/"} />
  );
};

export default AuthGuard;
