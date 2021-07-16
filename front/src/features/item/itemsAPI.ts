import { ItemType } from "./itemsSlice";
import { API_PATH, ITEMS_COLLECTION_PATH } from "../../apis/mongoDB";
import axios from "axios";

//アイテムの取得
export const fetch_all_items = (): Promise<ItemType[]> =>
  axios
    .get(`${API_PATH + ITEMS_COLLECTION_PATH}/fetch-all-items`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error(e);
    });

//AWSからS3への画像ファイルアップロードに必要なURLを取得する処理
export const get_temporaryUrl_from_aws_s3 = (): Promise<string> =>
  axios
    .get(`${API_PATH + ITEMS_COLLECTION_PATH}/get-s3-url`)
    .then((res) => {
      return res.data.url;
    })
    .catch((e) => {
      throw new Error(e);
    });

export const save_img_to_aws_s3 = (url: string, img: File): Promise<any> =>
  axios.put(url, img).catch((e) => {
    throw new Error(e);
  });

export const add_item_to_db = (item: ItemType): Promise<ItemType> =>
  axios
    .post(`${API_PATH + ITEMS_COLLECTION_PATH}/add-item`, item)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      throw new Error(e);
    });

//商品削除
export const delete_item_from_db = (_id: string): Promise<any> =>
  axios
    .post(`${API_PATH + ITEMS_COLLECTION_PATH}/delete-item`, { _id })
    .then((res) => {
      console.log(res.data.deletedItem);
      return;
    })
    .catch((e) => {
      throw new Error(e);
    });
