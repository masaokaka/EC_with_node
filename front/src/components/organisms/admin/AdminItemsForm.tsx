import { Container, Box } from "@material-ui/core";
import { useState, useEffect, FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../../app/hooks";
import { addItemAsync, ItemType } from "../../../features/item/itemsSlice";
import { Name, Mprice, Lprice, Img, Text } from "../../atoms/forms";
import { Btn } from "../../atoms";

interface Props {
  items: ItemType[];
}

export const AdminItemsForm: FC<Props> = ({ items }) => {
  const [imgFile, setImgFile] = useState<File | undefined>();
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
    clearErrors,
    reset,
  } = useForm<ItemType>({
    mode: "onBlur",
    defaultValues: {
      name: "",
      text: "",
      mprice: 0,
      lprice: 0,
      img: "",
    },
  });

  const doAddItem: SubmitHandler<ItemType> = async (data) => {
    data.mprice = Number(data.mprice);
    data.lprice = Number(data.lprice);
    dispatch(addItemAsync({ item: data, img: imgFile! }));
    reset({
      name: "",
      text: "",
      mprice: 0,
      lprice: 0,
      img: "",
    });
    setImgFile(undefined);
  };
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h3>商品登録</h3>
        <form onSubmit={handleSubmit(doAddItem)}>
          <Name control={control} error={errors.name!} />
          <Text control={control} error={errors.text!} />
          <Mprice control={control} error={errors.mprice!} />
          <Lprice control={control} error={errors.lprice!} />
          <Img
            control={control}
            error={errors.img!}
            setValue={setValue}
            setError={setError}
            clearErrors={clearErrors}
            setImgFile={setImgFile}
          />
          <Box mt={5} textAlign="center">
            <Btn text="登録" onClick={handleSubmit(doAddItem)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};
