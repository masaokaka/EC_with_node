import { db } from "../../../lib/firebase";
import { setUsersInfo } from "./usersinfoSlice";
import { USER_TABLE_PATH } from "../../../state/admin";
import { AppThunk } from "../../store";

//ユーザー情報取得
export const fetchUsersInfo = (): AppThunk => (dispatch) => {
  db.collection(USER_TABLE_PATH)
    .get()
    .then((snapShot) => {
      snapShot.forEach((doc) => {
        dispatch(setUsersInfo(doc.data().userData));
      });
    });
};
