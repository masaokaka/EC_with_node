import { Box, TextField } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";

interface Props {
  control: Control;
  error: FieldError;
}

export const CardNumber = ({ control, error }: Props) => {
  return (
    <Box mt={3}>
      <Controller
        name="cardNo"
        control={control}
        defaultValue={""}
        rules={{ required: true, pattern: /\d[0-9]{13}/g }}
        render={({ field }) => <TextField label="カード番号" {...field} />}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "カード番号を入力してください"}
          {error.type === "pattern" && "形式が違います"}
        </p>
      )}
    </Box>
  );
};
