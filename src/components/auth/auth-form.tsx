import { User } from "@/types/user";
import { Button, Form, FormInstance, Input } from "antd";

const AuthForm = ({
  form,
  onFinish,
}: {
  form: FormInstance;
  onFinish: (payload: User) => void;
}) => {
  const requiredItem = { required: true, message: "This field is required" };

  const formItems = [
    {
      name: "username",
      label: "Username",
      rules: [requiredItem],
      childElem: {
        elem: <Input />,
        props: {},
      },
    },
    {
      name: "password",
      label: "Password",
      rules: [requiredItem],
      childElem: {
        elem: <Input />,
        props: {
          type: "password",
        },
      },
    },
  ];
  return (
    <Form onFinish={onFinish} form={form}>
     {formItems.map((item) => <Form.item>)}
      <Button htmlType="submit">Login</Button>
    </Form>
  );
};

export default AuthForm;
