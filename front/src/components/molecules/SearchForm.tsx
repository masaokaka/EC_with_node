import { Box } from "@material-ui/core";
import { useState } from "react";
import { IconBtn } from "../atoms/IconBtn";
import { TextField } from "@material-ui/core";

interface Props {
  search: (word: string) => void;
}
export const SearchForm = ({ search }: Props) => {
  const [word, setWord] = useState<string>();
  return (
    <Box>
      <TextField
        type="text"
        variant="outlined"
        size="small"
        label="検索"
        color="primary"
        onChange={(e) => setWord(e.target.value)}
      />
      <IconBtn icon="Search" onClk={() => search(word!)} />
      </Box>
  );
};
