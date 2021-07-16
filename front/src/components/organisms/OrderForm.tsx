import { FC } from "react";
import { Container, Box } from "@material-ui/core";
import { useHistory } from "react-router";
import { Btn } from "../atoms";
import { useDispatch } from "react-redux";
import { UserInfoType } from "../../features/userinfo/userinfoSlice";
import {
  OrderInfoType,
  OrderType,
  orderAsync,
} from "../../features/order/ordersSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { CartType } from "../../features/cart/cartSlice";
import { ORDER_STATUS_PAID, ORDER_STATUS_UNPAID,ORDER_COMP_TOKEN } from "../../static/const";
import {
  Name,
  Tel,
  Zipcode,
  Address,
  Email,
  Calender,
  Payment,
  CardNumber,
} from "../atoms/forms";

interface Props {
  cart: CartType;
  userInfo: UserInfoType;
  totalPrice: number;
}

const OrderForm: FC<Props> = ({ cart, userInfo, totalPrice }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
  } = useForm<OrderInfoType>({
    mode: "onBlur",
    defaultValues: {
      name: userInfo.name,
      email: userInfo.email,
      zipcode: userInfo.zipcode,
      address: userInfo.address,
      tel: userInfo.tel,
      status: 1,
      orderDatetime: "",
      payType: 1,
      cardNo: "",
      timestamp: 0,
      totalPrice: 0,
    },
  });
  //Payment Method hange watcher
  const watchPayType = watch("payType", 1);

  const doOrder: SubmitHandler<OrderInfoType> = (data) => {
    let timestamp = new Date();
    data.timestamp = Math.floor(timestamp.getTime() / 1000);
    data.totalPrice = totalPrice;
    if (watchPayType === ORDER_STATUS_PAID) {
      data.status = ORDER_STATUS_PAID;
    } else {
      data.status = ORDER_STATUS_UNPAID;
      data.cardNo = "";
    }
    let new_order: OrderType = {
      _id: cart._id,
      uid: cart.uid,
      itemInfo: cart.itemInfo,
      name: data.name,
      email: data.email,
      zipcode: data.zipcode,
      address: data.address,
      tel: data.tel,
      status: data.status,
      orderDatetime: data.orderDatetime,
      payType: data.payType,
      cardNo: data.cardNo,
      timestamp: data.timestamp,
      totalPrice: data.totalPrice,
    };
    console.log(new_order);
    dispatch(orderAsync({ order: new_order }));
    localStorage.setItem("token-order-complete", ORDER_COMP_TOKEN);
    history.push("/ordercomp");
  };
  return (
    <Container maxWidth="sm">
      <Box mt={3} textAlign="center">
        <h2>配送先情報</h2>
        <form onSubmit={handleSubmit(doOrder)}>
          {/* 名前 */}
          <Name control={control} error={errors.name!} />
          {/* メールアドレス */}
          <Email control={control} error={errors.email!} />
          {/* 電話番号 */}
          <Tel control={control} error={errors.email!} />
          {/* 郵便番号 */}
          <Zipcode
            control={control}
            error={errors.zipcode!}
            getValues={getValues}
            setValue={setValue}
            setError={setError}
          />
          {/* 住所 */}
          <Address control={control} error={errors.address!} />
          {/* カレンダー */}
          <Calender
            control={control}
            error={errors.orderDatetime!}
            setValue={setValue}
            clearErrors={clearErrors}
            setError={setError}
          />
          {/* 支払い方法 */}
          <Payment
            control={control}
            error={errors.payType!}
            watchPayType={watchPayType!}
          />
          {/* カード番号 */}
          {watchPayType === 2 && (
            <CardNumber control={control} error={errors.cardNo!} />
          )}
          <Box mt={3}>
            <Btn text="注文を確定する" onClick={handleSubmit(doOrder)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default OrderForm;
