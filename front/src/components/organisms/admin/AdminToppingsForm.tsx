import { Container, Box } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { ToppingType } from "../../../features/topping/toppingsSlice";
import { Name, Id, Mprice, Lprice } from "../../atoms/forms";
import { Btn } from "../../atoms";
import { addTopping } from "../../../features/topping/toppingsAPI";
import { SIZE_L_PRICE, SIZE_M_PRICE } from "../../../static/const";

interface Props {
  toppings: ToppingType[];
}
export const AdminToppingsForm = ({ toppings }: Props) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ToppingType>({
    mode: "onBlur",
    defaultValues: {
      id: toppings.length + 1,
      name: "",
      mprice: SIZE_M_PRICE,
      lprice: SIZE_L_PRICE,
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        id: toppings.length + 1,
        name: "",
        mprice: SIZE_M_PRICE,
        lprice: SIZE_L_PRICE,
      });
    }
  }, [isSubmitSuccessful, toppings]);

  const doAddTopping: SubmitHandler<ToppingType> = (data) => {
    dispatch(addTopping(toppings, data));
  };
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <p>トッピング登録</p>
        <form onSubmit={handleSubmit(doAddTopping)}>
          <Id control={control} error={errors.id!} />
          <Name control={control} error={errors.name!} />
          <Mprice control={control} error={errors.mprice!} />
          <Lprice control={control} error={errors.lprice!} />
          <Box mt={5} textAlign="center">
            <Btn text="登録" onClk={handleSubmit(doAddTopping)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};
