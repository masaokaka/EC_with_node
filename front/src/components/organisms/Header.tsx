import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { IconBtn, Logo } from "../atoms";
import { HeadIconBtns } from "../molecules/HeadIconBtns";
import { toggle } from "../../features/sidenavSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectUserInfo,
  selectUid,
} from "../../features/userinfo/userinfoSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    padding: theme.spacing(1, 1),
    backgroundColor: "orange",
  },
}));

export const Header = () => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const uid = useAppSelector(selectUid);
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item>
              <IconBtn
                icon={"Menu"}
                onClk={() => dispatch(toggle(true))}
              ></IconBtn>
            </Grid>
            <Grid item>
              <Logo />
            </Grid>
            {userInfo && (
              <Grid item>
                {userInfo.username && <p>ようこそ{userInfo.username}さん</p>}
              </Grid>
            )}
            <Grid item>
              <HeadIconBtns uid={uid} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};
