import { db } from "../../apis/firebase";
import { setUsersInfo } from "./usersinfoSlice";
import { USER_TABLE_PATH } from "../../static/admin";
import { AppThunk } from "../../app/store";

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
