import { Box, TextField } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";

interface Props {
  control: Control;
  error: FieldError;
}

export const Tel = ({ control, error }: Props) => {
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
