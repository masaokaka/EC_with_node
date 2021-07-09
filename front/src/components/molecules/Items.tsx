import { Item } from "./Item";
import Box from "@material-ui/core/Box";
import { ItemType } from "../../app/store/item/itemsSlice";

interface Props {
  items?: ItemType[];
  noItem?: boolean;
}

export const Items = ({ items, noItem }: Props) => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {items!.length === 0 && <h3>読み込み中...</h3>}
      {noItem ? (
        <h3>該当する商品はありません</h3>
      ) : (
        items!.map((item, index) => <Item item={item} key={index} />)
      )}
    </Box>
  );
};
