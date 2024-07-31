import { generalConstant } from "@/constants";
import { User } from "@/types/user";
import { Button, Form, FormInstance, Input } from "antd";

const AuthForm = ({
  form,
  onFinish,
  loading,
}: {
  form: FormInstance;
  onFinish: (payload: User) => void;
  loading: boolean;
}) => {
  return (
    <Form onFinish={onFinish} form={form}>
      <Form.Item
        name="username"
        label="Username"
        rules={[generalConstant.DEFAULT_REQUIRED_FIELD_CONFIG]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[generalConstant.DEFAULT_REQUIRED_FIELD_CONFIG]}
      >
        <Input />
      </Form.Item>
      <Button loading={loading} htmlType="submit">
        Login
      </Button>
    </Form>
  );
};

export default AuthForm;
