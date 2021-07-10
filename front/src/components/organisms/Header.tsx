import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import { IconBtn, Logo } from "../atoms";
import { HeadIconBtns } from "../molecules/HeadIconBtns";
import { useDispatch } from "react-redux";
import { toggle } from "../../features/sidenavSlice";
import { useAppSelector } from "../../app/hooks";
import { selectUserInfo } from "../../features/userinfo/userinfoSlice";

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
  const dispatch = useDispatch();
  const userInfo = useAppSelector(selectUserInfo);
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
            <Grid item>
              {userInfo.username && <p>ようこそ{userInfo.username}さん</p>}
            </Grid>
            <Grid item>
              <HeadIconBtns uid={userInfo.uid} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};
