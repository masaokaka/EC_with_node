import { Box } from "@material-ui/core";
import { useState } from "react";
import { IconBtn } from "../atoms";
import { TextField } from "@material-ui/core";
import { FC } from "react";

interface Props {
  search: (word: string) => void;
}

const SearchForm: FC<Props> = ({ search }) => {
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
      <IconBtn icon="Search" onClick={() => search(word!)} />
    </Box>
  );
};

export default SearchForm;
