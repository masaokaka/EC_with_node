import { Box, TextField } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";

interface Props {
  control: Control;
  error: FieldError;
}

export const Address = ({ control, error }: Props) => {
  return (
    <Box mt={3}>
      <Controller
        name="address"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextField label="住所" {...field} />}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "住所を入力してください"}
        </p>
      )}
    </Box>
  );
};
