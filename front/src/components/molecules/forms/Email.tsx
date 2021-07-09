import { Box, TextField } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";

interface Props {
  control: Control;
  error: FieldError;
}

export const Email = ({ control, error }: Props) => {
  return (
    <Box mt={3}>
      <Controller
        name="email"
        control={control}
        rules={{ required: true, pattern: /.+@.+/ }}
        render={({ field }) => <TextField label="メールアドレス" {...field} />}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "メールアドレスを入力してください"}
          {error.type === "pattern" && "形式が違います"}
        </p>
      )}
    </Box>
  );
};
