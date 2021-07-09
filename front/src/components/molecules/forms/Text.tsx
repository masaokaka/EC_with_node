import { Box, TextField } from "@material-ui/core";
import { Controller, Control, FieldError } from "react-hook-form";

interface Props {
  control: Control;
  error: FieldError;
}

export const Text = ({ control, error }: Props) => {
  return (
    <Box mt={3}>
      <Controller
        name="text"
        control={control}
        rules={{ required: true, maxLength: 100 }}
        render={({ field }) => (
          <TextField
            label="商品テキスト"
            multiline
            rows={4}
            variant="outlined"
            {...field}
          />
        )}
      />
      {error !== undefined && (
        <p style={{ color: "red" }}>
          {error.type === "required" && "テキストを入力してください"}
          {error.type === "maxLength" &&
            "テキストは100文字以内で入力してください"}
        </p>
      )}
    </Box>
  );
};
