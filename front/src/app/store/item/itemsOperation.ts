import { db, fieldValue, storage } from "../../../lib/firebase";
import { ItemType, setItems } from "./itemsSlice";
import { AppThunk } from "../../store";
import { ITEM_TABLE_ID, ITEM_TABLE_PATH } from "../../../state/admin";

//アイテムの取得
export const fetchItems = (): AppThunk => (dispatch) => {
  db.collection(ITEM_TABLE_PATH)
    .doc(ITEM_TABLE_ID)
    .get()
    .then((doc) => {
      if (doc.exists) {
        let data = doc.data();
        dispatch(setItems(data!.itemData));
      }
    })
    .catch((error) => {
      alert(error);
    });
};

//商品追加
export const addItem =
  (items: ItemType[], item: ItemType, img: File): AppThunk =>
  (dispatch) => {
    let storageRef = storage.ref().child(`item/${item.img}`);
    storageRef.put(img).then(() => {
      storageRef.getDownloadURL().then((url) => {
        item.img = url;
        db.collection(ITEM_TABLE_PATH)
          .doc(ITEM_TABLE_ID)
          .update({ itemData: fieldValue.arrayUnion(item) })
          .then(() => {
            let newItems = [...items, item];
            dispatch(setItems(newItems));
          });
      });
    });
  };

//商品削除
export const deleteItem =
  (delItem: ItemType, items: ItemType[]): AppThunk =>
  (dispatch): void => {
    db.collection(ITEM_TABLE_PATH)
      .doc(ITEM_TABLE_ID)
      .update({ itemData: fieldValue.arrayRemove(delItem) })
      .then(() => {
        let newItems = items.filter((item) => item.id !== delItem.id);
        dispatch(setItems(newItems));
      })
      .catch((error) => {
        alert(error);
      });
  };
