import { useForm, FieldValues } from "react-hook-form";
import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  TextFieldHookForm,
  TextBoxHookForm,
  ZipcodeInputHookForm,
  PaymentRadioHookForm,
  CalenderInputHookForm,
  ImgInputHookForm,
} from "../";
import {
  EMAIL_WITHOUT_WHITESPACE_REGEX,
  EMAIL_ERROR_MSG,
} from "../../../static/const";

const MockFormCmponent = (props: any) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onBlur",
    defaultValues: {
      email: "test@test.com",
      text: "テストテキスト",
      zipcode: "000-0000",
      orderDatetime: "",
      payType: 1,
      img: "",
    },
  });
  const watchPayType = watch("payType", 1);
  return (
    <form onSubmit={handleSubmit(props.mockFunc)}>
      <TextFieldHookForm
        formName="email"
        label="メールアドレス"
        type="text"
        control={control}
        error={errors.email!}
        pattern={EMAIL_WITHOUT_WHITESPACE_REGEX}
        errorMsg={EMAIL_ERROR_MSG}
      />
      <TextBoxHookForm control={control} error={errors.text!} />
      <ZipcodeInputHookForm
        control={control}
        error={errors.zipcode!}
        getValues={getValues}
        setValue={setValue}
        setError={setError}
      />
      <CalenderInputHookForm
        control={control}
        error={errors.orderDatetime!}
        setValue={setValue}
        clearErrors={clearErrors}
        setError={setError}
      />
      <PaymentRadioHookForm
        control={control}
        error={errors.payType!}
        watchPayType={watchPayType!}
      />
      <ImgInputHookForm
        control={control}
        error={errors.payType!}
        setValue={setValue}
        clearErrors={clearErrors}
        setError={setError}
        setImgFile={props.mockFunc}
      />
      <div>
        <button onClick={handleSubmit(props.mockFunc)} data-testid="testbtn">
          注文を確定する
        </button>
      </div>
    </form>
  );
};

describe("HookForms", () => {
  let TextField: any;
  let TextBox: any;
  let Zipcode: any;
  let Calender: any;
  let Paytype1: any;
  let Paytype2: any;
  let Img: any;
  const mockFunc = jest.fn();
  //テスト用の擬似画像ファイル作成
  let file = new File(["testtest"], "test.png", { type: "image/png" });
  beforeEach(() => {
    render(<MockFormCmponent mockFunc={mockFunc} />);
    TextField = screen.getByDisplayValue("test@test.com");
    TextBox = screen.getByDisplayValue("テストテキスト");
    Zipcode = screen.getByDisplayValue("000-0000");
    Calender = screen.getAllByDisplayValue("")[0];
    Paytype1 = screen.getAllByRole("radio")[0];
    Paytype2 = screen.getAllByRole("radio")[1];
    Img = screen.getAllByDisplayValue("")[1];
  });
  describe("with valid input", () => {
    it("calls onsubmit mockFunc", async () => {
      await act(async () => {
        fireEvent.change(TextField, { target: { value: "aaaa@aa.com" } });
        fireEvent.change(TextBox, { target: { value: "aaaaa" } });
        fireEvent.change(Zipcode, { target: { value: "111-1111" } });
        fireEvent.change(Calender, {
          target: { value: "2021-10-01T10:00:00" },
        });
        fireEvent.change(Img, { target: { files: [file] } });
      });
      await act(async () => {
        fireEvent.click(screen.getByTestId("testbtn"));
      });
      expect(mockFunc).toHaveBeenCalled();
    });
  });
  describe("with invalid input", () => {
    it("invalid email", async () => {
      await act(async () => {
        fireEvent.change(TextField, { target: { value: "aaaa" } });
        fireEvent.blur(TextField);
      });
      expect(screen.getByText("形式が違います")).toBeInTheDocument();
    });
    it("invalid textbox", async () => {
      await act(async () => {
        fireEvent.change(TextBox, { target: { value: "" } });
        fireEvent.blur(TextBox);
      });
      expect(
        screen.getByText("テキストを入力してください")
      ).toBeInTheDocument();
    });
    it("invalid zipcode", async () => {
      await act(async () => {
        fireEvent.change(Zipcode, { target: { value: "aaaa" } });
        fireEvent.blur(Zipcode);
      });
      expect(
        screen.getByText("XXX-XXXXの形式で入力して下さい")
      ).toBeInTheDocument();
    });
    it("zipcode btn click", async () => {
      let btn = screen.getAllByRole("button")[0];
      await act(async () => {
        fireEvent.click(btn);
      });
    });
    it("invalid calender", async () => {
      await act(async () => {
        fireEvent.change(Calender, {
          target: { value: "2021-01-01T10:00:00" },
        });
        fireEvent.blur(Calender);
      });
      expect(
        screen.getByText("今から3時間後の日時をご入力ください")
      ).toBeInTheDocument();
    });
    it("paytype1 checked", async () => {
      await act(async () => {
        fireEvent.click(Paytype1);
      });
      expect(Paytype2).not.toBeChecked();
    });
    it("paytype2 checked", async () => {
      await act(async () => {
        fireEvent.click(Paytype2);
      });
      expect(Paytype1).not.toBeChecked();
    });
    it("invalid image", async () => {
      let wrongfile = new File(["aaaa"], "test.txt", {
        type: "text/plain",
      });
      await act(async () => {
        fireEvent.change(Img, {
          target: { files: [wrongfile] },
        });
      });
      await act(async () => {
        fireEvent.click(screen.getByTestId("testbtn"));
      });
      expect(mockFunc).not.toHaveBeenCalled();
    });
  });
});
