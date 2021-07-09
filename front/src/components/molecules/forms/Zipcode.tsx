import { Box, TextField, IconButton } from "@material-ui/core";
import { searchAddress } from "../../../utils/functions";
import {
  Controller,
  Control,
  FieldError,
  UseFormSetError,
  UseFormSetValue,
  FieldValues,
  UseFormGetValues,
} from "react-hook-form";
import { SearchOutlined } from "@material-ui/icons";

interface Props {
  control: Control;
  error: FieldError;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  setError: UseFormSetError<FieldValues>;
}

export const Zipcode = ({
  control,
  error,
  getValues,
  setValue,
  setError,
}: Props) => {
  //住所検索処理
  const getAddress = () => {
    const zipcode = getValues("zipcode");
    searchAddress(zipcode!)
      .then((address) => {
        setValue("address", address);
      })
      .catch((e) => {
        setError("address", {
          type: "getAddress",
          message: e,
        });
      });
  };
  return (
    <Box mt={3}>
      <Controller
        name="zipcode"
        control={control}
        rules={{ required: true, pattern: /^\d{3}[-]\d{4}$/ }}
        render={({ field }) => <TextField label="郵便番号" {...field} />}
      />
      <IconButton onClick={() => getAddress()}>
        <SearchOutlined />
      </IconButton>
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "郵便番号を入力してください"}
          {error.type === "pattern" && "XXX-XXXXの形式で入力して下さい"}
          {error.type === "getAddress" && error.message}
        </p>
      )}
    </Box>
  );
};
