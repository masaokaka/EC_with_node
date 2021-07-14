import Button from "@material-ui/core/Button";
import { FC } from "react";

interface Props {
  text: string;
  col?: string;
  onClk: () => void;
}
const Btn: FC<Props> = ({ text, col, onClk }) => {
  return (
    <>
      {col !== undefined ? (
        <Button variant="contained" onClick={onClk} style={{ color: col }}>
          {text}
        </Button>
      ) : (
        <Button variant="contained" onClick={onClk} color="secondary">
          {text}
        </Button>
      )}
    </>
  );
};

export default Btn;
