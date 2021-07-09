import { Container, Box } from "@material-ui/core";
import { useHistory } from "react-router";
import { Btn } from "../atoms/Btn";
import { useDispatch } from "react-redux";
import { UserInfoType } from "../../app/store/userinfo/userinfoSlice";
import { OrderInfoType, OrderType } from "../../app/store/order/ordersSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { order } from "../../app/store/order/ordersOperation";
import { CartType } from "../../app/store/cart/cartSlice";
import { ORDER_STATUS_PAID, ORDER_STATUS_UNPAID } from "../../state/const";
import { Name } from "../molecules/forms/Name";
import { Tel } from "../molecules/forms/Tel";
import { Zipcode } from "../molecules/forms/Zipcode";
import { Address } from "../molecules/forms/Address";
import { Email } from "../molecules/forms/Email";
import { Calender } from "../molecules/forms/Calender";
import { Payment } from "../molecules/forms/Payment";
import { CardNumber } from "../molecules/forms/CardNumber";
interface Props {
  cart: CartType;
  userInfo: UserInfoType;
  totalPrice: number;
}

export const OrderForm = ({ cart, userInfo, totalPrice }: Props) => {
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
    let newOrder: OrderType = {
      id: cart.id,
      userId: cart.userId,
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
    dispatch(order(newOrder));
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
            <Btn text="注文を確定する" onClk={handleSubmit(doOrder)} />
          </Box>
        </form>
      </Box>
    </Container>
  );
};
