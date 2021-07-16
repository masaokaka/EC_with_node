import { useHistory } from "react-router-dom";
import { FC } from "react";
import { Btn } from "../atoms";

const OrderComp: FC = () => {
  const history = useHistory();
  return (
    <div style={{ textAlign: "center" }}>
      <h2>注文が完了しました！</h2>
      <h4>この度はご注文ありがとうございます。</h4>
      <h4>
        ご注文内容については、「注文確認メール」もしくは「注文履歴」からご確認ください。
      </h4>
      <Btn
        text="トップ画面に戻る"
        onClick={() => {
          history.push("/");
        }}
      />
    </div>
  );
};

export default OrderComp;
