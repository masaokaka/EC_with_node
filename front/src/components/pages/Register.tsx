import { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectUser } from "../../app/store/user/userSlice";
import { register } from "../../app/store/user/userOperation";
import { Container, Box } from "@material-ui/core";
import { Btn } from "../atoms/Btn";
import { useForm, SubmitHandler } from "react-hook-form";
import { UserInfoType } from "../../app/store/userinfo/userinfoSlice";
import { Name } from "../molecules/forms/Name";
import { Tel } from "../molecules/forms/Tel";
import { Zipcode } from "../molecules/forms/Zipcode";
import { Address } from "../molecules/forms/Address";
import { UserName } from "../molecules/forms/UserName";
import { Email } from "../molecules/forms/Email";
import { Password } from "../molecules/forms/Password";

interface RegisterInfoType extends UserInfoType {
  password?: string;
}

export const Register = () => {
  const user = useAppSelector(selectUser);
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setError,
  } = useForm<RegisterInfoType>({
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
    let userInfo: UserInfoType = {
      name: data.name,
      email: data.email,
      zipcode: data.zipcode,
      address: data.address,
      tel: data.tel,
      username: data.username,
    };
    dispatch(register(data.password!, userInfo));
    history.push("/");
  };

  useEffect(() => {
    if (user.uid) {
      history.push("/");
    }
  }, []);
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h2>新規登録</h2>
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
            <Btn text="登録" onClk={handleSubmit(doRegister)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};
