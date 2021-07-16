import { FC } from "react";
import { useHistory } from "react-router-dom";
import { Divider, Grid } from "@material-ui/core";
import { Btn } from "../../atoms";

const AdminHeaderBtns: FC = () => {
  const history = useHistory();
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item style={{ margin: "10px 5px" }}>
          <Btn
            text="ユーザー情報"
            color="#fff"
            bgcolor="orange"
            onClick={() => history.push("/admin/users")}
          />
        </Grid>
        <Grid item style={{ margin: "10px 5px" }}>
          <Btn
            text="商品情報"
            color="#fff"
            bgcolor="orange"
            onClick={() => history.push("/admin/items")}
          />
        </Grid>
        <Grid item style={{ margin: "10px 5px" }}>
          <Btn
            text="トッピング情報"
            color="#fff"
            bgcolor="orange"
            onClick={() => history.push("/admin/toppings")}
          />
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default AdminHeaderBtns;
