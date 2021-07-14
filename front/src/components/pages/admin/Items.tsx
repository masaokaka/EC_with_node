import { FC } from "react";
import { Container } from "@material-ui/core";
import { useAppSelector } from "../../../app/hooks";
import { selectItems } from "../../../features/item/itemsSlice";
import { AdminItemsForm } from "../../organisms/admin/AdminItemsForm";
import { AdminItemsTable } from "../../organisms/admin/AdminItemsTable";
import AdminHeader from "../../organisms/admin/AdminHeader";

const Items: FC = () => {
  const items = useAppSelector(selectItems);
  return (
    <Container>
      <AdminHeader />
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

export default Items;
