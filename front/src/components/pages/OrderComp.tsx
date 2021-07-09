import { useHistory } from "react-router-dom";
import { Btn } from "../atoms/Btn";

export const OrderComp = () => {
  const history = useHistory();
  return (
    <div style={{ alignContent: "center" }}>
      <h2>注文ありがとうございます！</h2>
      <h4>この度はご注文ありがとうございます。</h4>
      <h4>
        ご注文内容については、「注文確認メール」もしくは「注文履歴」からご確認ください。
      </h4>
      <Btn
        text="トップ画面に戻る"
        onClk={() => {
          history.push("/");
        }}
      />
    </div>
  );
};
