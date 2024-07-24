import general from "@/constants/general";
import { User } from "@/types/user";
import { Button, Form, FormInstance, Input } from "antd";

const AuthForm = ({
  form,
  onFinish,
}: {
  form: FormInstance;
  onFinish: (payload: User) => void;
}) => {
  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item
        name="username"
        label="Username"
        rules={[general.DEFAULT_REQUIRED_FIELD_CONFIG]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[general.DEFAULT_REQUIRED_FIELD_CONFIG]}
      >
        <Input />
      </Form.Item>
      <Button htmlType="submit">Login</Button>
    </Form>
  );
};

export default AuthForm;
