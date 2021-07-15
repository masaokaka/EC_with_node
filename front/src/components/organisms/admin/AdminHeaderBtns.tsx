import { FC } from "react";
import { useHistory } from "react-router-dom";
import { Divider, Grid } from "@material-ui/core";
import { Btn } from "../../atoms";

const AdminHeaderBtns: FC = () => {
  const history = useHistory();
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item>
          <Btn text="ユーザー情報" onClk={() => history.push("/admin/users")} />
        </Grid>
        <Grid item>
          <Btn text="商品情報" onClk={() => history.push("/admin/items")} />
        </Grid>
        <Grid item>
          <Btn
            text="トッピング情報"
            onClk={() => history.push("/admin/toppings")}
          />
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default AdminHeaderBtns;
