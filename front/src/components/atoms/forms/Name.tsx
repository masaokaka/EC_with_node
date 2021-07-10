import { FC } from "react";
import { Box, TextField } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";

interface Props {
  control: Control;
  error: FieldError;
}

const Name: FC<Props> = ({ control, error }) => {
  return (
    <Box mt={3}>
      <Controller
        name="name"
        control={control}
        rules={{ required: true }}
        render={({ field }) => <TextField label="名前" {...field} />}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "名前を入力してください"}
        </p>
      )}
    </Box>
  );
};

export default Name;
