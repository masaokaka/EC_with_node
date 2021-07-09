import { Container, Box } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { ItemType } from "../../../app/store/item/itemsSlice";
import { Name } from "../../molecules/forms/Name";
import { Id } from "../../molecules/forms/Id";
import { Mprice } from "../../molecules/forms/Mprice";
import { Lprice } from "../../molecules/forms/Lprice";
import { Img } from "../../molecules/forms/Img";
import { Text } from "../../molecules/forms/Text";
import { Btn } from "../../atoms/Btn";
import { addItem } from "../../../app/store/item/itemsOperation";

interface Props {
  items: ItemType[];
}

export const AdminItemsForm = ({ items }: Props) => {
  const [imgFile, setImgFile] = useState<File | undefined>();
  const dispatch = useDispatch();
  const [itemsLength, setItemLength] = useState(items.length + 1);
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
      id: itemsLength,
      name: "",
      text: "",
      mprice: 0,
      lprice: 0,
      img: "",
    },
  });
  useEffect(() => {
    console.log(itemsLength);
  }, [itemsLength]);

  const doAddItem: SubmitHandler<ItemType> = (data) => {
    data.mprice = Number(data.mprice);
    data.lprice = Number(data.lprice);
    console.log(data.img);
    dispatch(addItem(items, data, imgFile!));
    reset({
      id: itemsLength + 1,
      name: "",
      text: "",
      mprice: 0,
      lprice: 0,
      img: "",
    });
    setImgFile(undefined);
    setItemLength(itemsLength + 1);
  };
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h3>商品登録</h3>
        <form onSubmit={handleSubmit(doAddItem)}>
          <Id control={control} error={errors.id!} />
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
            <Btn text="登録" onClk={handleSubmit(doAddItem)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};
