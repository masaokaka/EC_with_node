import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { ItemType } from "../../app/store/item/itemsSlice";
import { useHistory } from "react-router-dom";
import { Price } from "../atoms/Price";

const useStyles = makeStyles({
  root: {
    width: 280,
    height: 280,
    marginTop: 30,
    marginRight: 8,
    marginLeft: 8,
  },
  media: {
    height: 160,
  },
});

interface Props {
  item: ItemType;
}

export const Item = ({ item }: Props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => history.push(`iteminfo/${item.id}`)}>
        <CardMedia
          className={classes.media}
          image={item.img}
          title={item.name}
        />
        <CardContent>
          <Typography>{item.name}</Typography>
        </CardContent>
      </CardActionArea>
      <CardContent style={{ paddingTop: "0" }}>
        <Typography variant="body2" color="textPrimary" component="div">
          <Grid container>
            <Grid item xs={6}>
              <strong>M:</strong>
              <Price price={item.mprice!} bigsize={false} tax={false}></Price>
            </Grid>
            <Grid item xs={6}>
              <strong>L:</strong>
              <Price price={item.lprice!} bigsize={false} tax={false}></Price>
            </Grid>
          </Grid>
        </Typography>
      </CardContent>
    </Card>
  );
};
