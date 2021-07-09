import Button from "@material-ui/core/Button";

interface Props {
  text: string;
  col?: string;
  onClk: () => void;
}
export const Btn = ({ text, col, onClk }: Props) => {
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
