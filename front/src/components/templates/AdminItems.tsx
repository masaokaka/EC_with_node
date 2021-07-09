import { Container } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import { selectItems } from "../../app/store/item/itemsSlice";
import { AdminItemsForm } from "../organisms/admin/AdminItemsForm";
import { AdminItemsTable } from "../organisms/admin/AdminItemsTable";

export const AdminItems = () => {
  const items = useAppSelector(selectItems);
  return (
    <Container>
      <h2>商品管理画面</h2>
      <AdminItemsForm items={items} />
      {items.length !== 0 ? (
        <AdminItemsTable items={items} />
      ) : (
        <div>商品がありません</div>
      )}
    </Container>
  );
};
