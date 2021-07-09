import { Box, TextField } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";

interface Props {
  control: Control;
  error: FieldError;
}

export const Mprice = ({ control, error }: Props) => {
  return (
    <Box mt={3}>
      <Controller
        name="mprice"
        control={control}
        rules={{ required: true, pattern: /\d[0-9]/g }}
        render={({ field }) => <TextField label="Mサイズ値段" {...field} />}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "金額を入力してください"}
          {error.type === "pattern" && "半角数字で入力して下さい"}
        </p>
      )}
    </Box>
  );
};
