import axios from "axios";
import { API_PATH, USERINFOS_COLLECTION_PATH } from "../../apis/mongoDB";
import { UserInfoType } from "../userinfo/userinfoSlice";

//ユーザー情報取得
export const get_all_userinfo_from_db = (): Promise<UserInfoType[]> =>
  axios
    .get(`${API_PATH + USERINFOS_COLLECTION_PATH}/get-all-userinfo`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error(e.message);
    });
