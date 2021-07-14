import { FC } from "react";
import { Redirect, useLocation } from "react-router";
import { useAppSelector } from "../../app/hooks";
import { selectUid } from "../../features/userinfo/userinfoSlice";
interface Props {
  children: any;
}
const AuthGuard: FC<Props> = ({ children }) => {
  const uid = useAppSelector(selectUid);
  const location = useLocation();
  console.log(uid);
  return uid !== undefined ? (
    <>{children}</>
  ) : (
    <Redirect to={{ pathname: "/login", state: { from: location } }} />
  );
};

export default AuthGuard;
