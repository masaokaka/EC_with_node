import { Item } from "./Item";
import Box from "@material-ui/core/Box";
import { ItemType } from "../../features/item/itemsSlice";

interface Props {
  items?: ItemType[];
  noItem?: boolean;
}

export const Items = ({ items, noItem }: Props) => {
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center">
      {noItem ? (
        <h3>該当する商品はありません</h3>
      ) : (
        items!.map((item, index) => <Item item={item} key={index} />)
      )}
    </Box>
  );
};
