import { Container, Box } from "@material-ui/core";
import { useEffect, FC } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  ToppingType,
  addToppingAsync,
} from "../../../features/topping/toppingsSlice";
import { Name, Id, Mprice, Lprice } from "../../atoms/forms";
import { Btn } from "../../atoms";
import { SIZE_L_PRICE, SIZE_M_PRICE } from "../../../static/const";

interface Props {
  toppings: ToppingType[];
}
export const AdminToppingsForm: FC<Props> = ({ toppings }) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ToppingType>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      mprice: SIZE_M_PRICE,
      lprice: SIZE_L_PRICE,
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        name: "",
        mprice: SIZE_M_PRICE,
        lprice: SIZE_L_PRICE,
      });
    }
  }, [isSubmitSuccessful, reset]);

  const doAddTopping: SubmitHandler<ToppingType> = (data) => {
    dispatch(addToppingAsync({ topping: data }));
  };
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <p>トッピング登録</p>
        <form onSubmit={handleSubmit(doAddTopping)}>
          <Name control={control} error={errors.name!} />
          <Mprice control={control} error={errors.mprice!} />
          <Lprice control={control} error={errors.lprice!} />
          <Box mt={5} textAlign="center">
            <Btn text="登録" onClick={handleSubmit(doAddTopping)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};
