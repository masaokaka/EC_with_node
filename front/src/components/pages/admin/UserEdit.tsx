import { useParams } from "react-router";
import { Btn } from "../../atoms";
import { useEffect, useState, FC } from "react";
import { useDispatch } from "react-redux";
import { Container } from "@material-ui/core";
import { UserInfoType } from "../../../features/userinfo/userinfoSlice";
import { useAppSelector } from "../../../app/hooks";
import { selectUsersInfo } from "../../../features/usersinfo/usersinfoSlice";
import { OrderItemsTable } from "../../organisms/OrderItemsTable";
import {
  selectOrders,
  unsetOrders,
  fetchOrdersAsync,
} from "../../../features/order/ordersSlice";
import { selectItems } from "../../../features/item/itemsSlice";
import AdminHeader from "../../organisms/admin/AdminHeader";

const UserEdit: FC = () => {
  const { userid }: { userid: string } = useParams();
  const [user, setUser] = useState<UserInfoType>();
  const orders = useAppSelector(selectOrders);
  const items = useAppSelector(selectItems);
  const [toggle, setToggle] = useState(false);
  const usersInfo = useAppSelector(selectUsersInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    let user = usersInfo.filter((userInfo) => userInfo.uid === userid);
    setUser(user[0]);
    dispatch(unsetOrders());
    dispatch(fetchOrdersAsync({ uid: userid }));
    return () => {
      dispatch(unsetOrders());
    };
  }, []);
  return (
    <Container>
      <AdminHeader />
      <h2>ユーザー情報詳細 (ID: {userid})</h2>
      {user && (
        <div>
          <div>
            <strong>名前：</strong>
            {user.name}
          </div>
          <div>
            <strong>Email：</strong>
            {user.email}
          </div>
          <div>
            <strong>TEL：</strong>
            {user.tel}
          </div>
          <div>
            <strong>住所情報：</strong>
            <div>〒{user.zipcode}</div>
            <div>{user.address}</div>
          </div>
          <Btn text="注文履歴の操作" onClk={() => setToggle(!toggle)} />
          {toggle &&
            (orders.length !== 0 ? (
              <OrderItemsTable items={items} orders={orders} uid={userid} />
            ) : (
              <h3>履歴がありません</h3>
            ))}
        </div>
      )}
    </Container>
  );
};

export default UserEdit;
