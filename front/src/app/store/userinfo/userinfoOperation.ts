import { db } from "../../../lib/firebase";
import { setUserInfo, UserInfoType } from "./userinfoSlice";
import { AppThunk } from "../../store";

//ユーザー情報取得
export const fetchUserInfo =
  (uid: string): AppThunk =>
  (dispatch) => {
    db.collection(`users/${uid}/userInfo`)
      .get()
      .then((snapShot) => {
        snapShot.forEach((doc) => {
          doc.data().id = doc.id;
          dispatch(setUserInfo(doc.data()));
        });
      });
  };

export const registerUserInfo =
  (userInfo: UserInfoType): AppThunk =>
    (dispatch) => {
    db.collection(`users/${userInfo.uid}/userInfo`)
      .add(userInfo)
      .then(() => {
        dispatch(setUserInfo(userInfo));
      });
  };
