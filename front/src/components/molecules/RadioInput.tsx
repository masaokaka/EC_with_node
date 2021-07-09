import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { ItemType } from "../../app/store/item/itemsSlice";

interface Props {
  item: ItemType | undefined;
  itemSize: number;
  setItemSize: React.Dispatch<React.SetStateAction<number>>;
}

export const RadioInput = ({ item, itemSize, setItemSize }: Props) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">サイズ</FormLabel>
      {item !== undefined && (
        <RadioGroup
          aria-label="itemSize"
          name="itemSize"
          value={itemSize}
          onChange={(e) => setItemSize(parseInt(e.target.value))}
        >
          <FormControlLabel
            value={0}
            control={<Radio />}
            label={`Mサイズ：${item.mprice}円(税抜)`}
          />
          <FormControlLabel
            value={1}
            control={<Radio />}
            label={`Lサイズ：${item.lprice}円(税抜)`}
          />
        </RadioGroup>
      )}
    </FormControl>
  );
};
