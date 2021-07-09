import { ItemType } from "../../app/store/item/itemsSlice";
import { Container } from "@material-ui/core";
interface Props {
  item: ItemType | undefined;
}
export const ItemDetail = ({ item }: Props) => {
  return (
    <Container>
      {item !== undefined && (
        <div>
          <img
            src={item.img}
            alt="画像"
            style={{ width: "300px", height: "200px" }}
          />
          <h3>{item.name}</h3>
          <p>{item.text}</p>
        </div>
      )}
    </Container>
  );
};
