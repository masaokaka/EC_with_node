import { useEffect, FC } from "react";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  selectUid,
  registerAsync,
  UserInfoType,
  selectUserInfoErrorMsg,
  selectUserInfoStatus,
  unsetUserError,
} from "../../features/userinfo/userinfoSlice";
import { Container, Box } from "@material-ui/core";
import { Btn, ErrorMessage } from "../atoms";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import {
  Name,
  Tel,
  Zipcode,
  Address,
  UserName,
  Email,
  Password,
} from "../atoms/forms";

interface RegisterInfoType extends UserInfoType {
  password?: string;
}

const Register: FC = () => {
  const uid = useAppSelector(selectUid);
  const userinfoError = useAppSelector(selectUserInfoErrorMsg);
  const userinfoStatus = useAppSelector(selectUserInfoStatus);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
  } = useForm<FieldValues>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      zipcode: "",
      address: "",
      tel: "",
      username: "",
      password: "",
    },
  });
  const doRegister: SubmitHandler<RegisterInfoType> = (data) => {
    let new_userinfo: UserInfoType = {
      name: data.name,
      email: data.email,
      zipcode: data.zipcode,
      address: data.address,
      tel: data.tel,
      username: data.username,
    };
    dispatch(
      registerAsync({ password: data.password!, userinfo: new_userinfo })
    );
    history.push("/");
  };

  useEffect(() => {
    if (uid) {
      history.push("/");
    }
    return () => {
      dispatch(unsetUserError());
    };
  }, [uid, dispatch, history]);

  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h2>新規登録</h2>
        {userinfoStatus === "failed" && userinfoError !== null && (
          <ErrorMessage msg={userinfoError} />
        )}
        <form onSubmit={handleSubmit(doRegister)}>
          <Name control={control} error={errors.name!} />
          <Tel control={control} error={errors.tel!} />
          <Zipcode
            control={control}
            error={errors.zipcode!}
            getValues={getValues}
            setValue={setValue}
            setError={setError}
          />
          <Address control={control} error={errors.address!} />
          <UserName control={control} error={errors.username!} />
          <Email control={control} error={errors.email!} />
          <Password control={control} error={errors.password!} />
          <Box mt={5} textAlign="center">
            <Btn text="登録" onClick={handleSubmit(doRegister)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
