import { Select, FormControl, MenuItem, FormLabel } from "@material-ui/core";
import React from "react";

interface Props {
  itemNum: number;
  setItemNum: React.Dispatch<React.SetStateAction<number>>;
}

const maxNum: number = 15;
let nums: number[] = [];
for (let i = 1; i <= maxNum; i++) {
  nums.push(i);
}
export const SelectNumForm = ({ itemNum, setItemNum }: Props) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">数量</FormLabel>
      <Select
        name="数量"
        value={itemNum}
        onChange={(e: any) => setItemNum(e.target.value)}
      >
        {nums.map((num, index) => (
          <MenuItem value={num} key={index}>
            {num}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
