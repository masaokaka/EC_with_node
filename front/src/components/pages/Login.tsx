import { useEffect, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Link, useHistory } from "react-router-dom";
import { Container, Box } from "@material-ui/core";
import {
  loginAsync,
  selectUid,
  selectUserInfoErrorMsg,
  selectUserInfoStatus,
  unsetUserError,
} from "../../features/userinfo/userinfoSlice";
import { Email, Password } from "../atoms/forms";
import { Btn, ErrorMessage } from "../atoms";
import { useForm, SubmitHandler } from "react-hook-form";

interface LoginInfoType {
  email?: string;
  password?: string;
}

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const uid = useAppSelector(selectUid);
  const userinfoError = useAppSelector(selectUserInfoErrorMsg);
  const userinfoStatus = useAppSelector(selectUserInfoStatus);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInfoType>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (uid) {
      history.push("/");
    }
    return () => {
      if (localStorage.ItemInfo) {
        localStorage.removeItem("ItemInfo");
      }
      dispatch(unsetUserError());
    };
  }, [uid, history,dispatch]);

  const doLogin: SubmitHandler<LoginInfoType> = (data) => {
    dispatch(loginAsync({ email: data.email!, password: data.password! }));
  };
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h2>ログイン</h2>
        {userinfoStatus === "failed" && userinfoError !== null && (
          <ErrorMessage msg={userinfoError} />
        )}
        <form onSubmit={handleSubmit(doLogin)}>
          <Email control={control} error={errors.email!} />
          <Password control={control} error={errors.password!} />
          <Box mt={3}>
            <Btn text="ログイン" onClick={handleSubmit(doLogin)} />
          </Box>
        </form>
        <Box mt={3}>
          <Link to="/register">ユーザー登録はこちら</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
