import { Box, TextField } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";

interface Props {
  control: Control;
  error: FieldError;
}

export const Id = ({ control, error }: Props) => {
  return (
    <Box mt={3}>
      <Controller
        name="id"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextField label="ID" {...field} />}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "Idを入力してください"}
        </p>
      )}
    </Box>
  );
};
