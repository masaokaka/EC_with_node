import { useState, useEffect, FC } from "react";
import { Box } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import { Items, SearchForm } from "../../components/molecules";
import { selectItems, ItemType } from "../../features/item/itemsSlice";

export const Home: FC = () => {
  const items = useAppSelector(selectItems);
  const [searchItems, setSearchItems] = useState<ItemType[]>(items);
  const [noItem, setNoItem] = useState(false);

  useEffect(() => {
    setSearchItems(items);
  }, [items]);

  const search = (word: string) => {
    if (word === "" || word === undefined) {
      setSearchItems(items);
      setNoItem(false);
    } else {
      let newItems = items!.filter((item) => item.name!.indexOf(word) >= 0);
      if (newItems.length === 0) {
        setNoItem(true);
      } else {
        setSearchItems(newItems);
        setNoItem(false);
      }
    }
  };
  return (
    <>
      <Box m={3} textAlign="right">
        <SearchForm search={search} />
      </Box>
      <Box>
        <Items items={searchItems!} noItem={noItem} />
      </Box>
    </>
  );
};

export default Home;
