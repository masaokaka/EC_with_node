import { Select, InputLabel, FormControl, MenuItem } from "@material-ui/core";
import { ToppingType } from "../../app/store/topping/toppingsSlice";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import { CartTopType } from "../../app/store/cart/cartSlice";

interface Props {
  topping: ToppingType;
  addedToppings: CartTopType[];
  setAddedToppings: React.Dispatch<React.SetStateAction<CartTopType[]>>;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const SelectForm = ({
  topping,
  addedToppings,
  setAddedToppings,
}: Props) => {
  const classes = useStyles();
  const [size, setSize] = useState(9);

  useEffect(() => {
    //最初は空なので、空だったらたしてやる処理を書く。
    if (addedToppings.length === 0) {
      setAddedToppings([{ id: topping.id!, size: size }]);
    } else {
      let index: number | null = null;
      addedToppings.forEach((top) => {
        if (top.id === topping.id) {
          index = addedToppings.indexOf(top);
        }
      });
      if (index !== null) {
        addedToppings[index].size = size;
        setAddedToppings([...addedToppings]);
      } else {
        setAddedToppings([...addedToppings, { id: topping.id!, size: size }]);
      }
    }
  }, [size]);
  return (
    <FormControl key={topping.id} className={classes.formControl}>
      <InputLabel id={topping.name}>{topping.name}</InputLabel>
      <Select
        labelId={topping.name}
        name={topping.name}
        value={size}
        onChange={(e: any) => setSize(e.target.value)}
      >
        <MenuItem value={9}>選択</MenuItem>
        <MenuItem value={0}>普通</MenuItem>
        <MenuItem value={1}>多め</MenuItem>
      </Select>
    </FormControl>
  );
};
