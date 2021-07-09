import { Container } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import { selectToppings } from "../../app/store/topping/toppingsSlice";
import { AdminToppingsForm } from "../organisms/admin/AdminToppingsForm";
import { AdminToppingsTable } from "../organisms/admin/AdminToppingsTable";
export const AdminToppings = () => {
  const toppings = useAppSelector(selectToppings);
  return (
    <Container>
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
