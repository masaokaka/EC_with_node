import { FC } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const Copyright: FC = () => {
  return (
    <Typography variant="body2">
      {"Copyright © "}Masakazu Toyoyama{"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  footer: {
    padding: theme.spacing(3, 2),
    backgroundColor: "orange",
    position: "relative",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "30px",
  },
}));

const Footer: FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography variant="body1">ラクラクカリー</Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
};

export default Footer;
