import { FC } from "react";
import { Box, TextField } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";

interface Props {
  control: Control;
  error: FieldError;
}

const Tel: FC<Props> = ({ control, error }) => {
  return (
    <Box mt={3}>
      <Controller
        name="tel"
        control={control}
        rules={{
          required: true,
          pattern: /\d{2,5}[-(]\d{1,4}[-)]\d{4}$/,
        }}
        render={({ field }) => <TextField label="電話番号" {...field} />}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "電話番号を入力してください"}
          {error.type === "pattern" && "XXX-XXXX-XXXXの形式で入力して下さい"}
        </p>
      )}
    </Box>
  );
};

export default Tel;
