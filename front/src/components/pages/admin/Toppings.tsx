import { FC } from "react";
import { Container } from "@material-ui/core";
import { useAppSelector } from "../../../app/hooks";
import { selectToppings } from "../../../features/topping/toppingsSlice";
import { AdminToppingsForm } from "../../organisms/admin/AdminToppingsForm";
import { AdminToppingsTable } from "../../organisms/admin/AdminToppingsTable";
import AdminHeader from "../../organisms/admin/AdminHeader";
const Toppings:FC = () => {
  const toppings = useAppSelector(selectToppings);
  return (
    <Container>
      <AdminHeader />
      <h2>トッピング管理画面</h2>
      <AdminToppingsForm toppings={toppings} />
      {toppings.length !== 0 ? (
        <AdminToppingsTable toppings={toppings} />
      ) : (
        <div>トッピングがありません</div>
      )}
    </Container>
  );
};

export default Toppings