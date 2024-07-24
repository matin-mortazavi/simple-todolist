import {
  createFileRoute,
  useNavigate,
  useRouteContext,
  useRouter,
  useSearch,
} from "@tanstack/react-router";
import { Button, Form, Input } from "antd";
import { login } from "../services/auth";
import { User } from "../types/user";
import { useEffect, useLayoutEffect } from "react";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const search = Route.useSearch();
  const router = useRouter();
  const navigate = useNavigate();

  const context = useRouteContext({
    select: (context) => context,
  });
  const { auth } = context || {};

  const [form] = Form.useForm();

  const onSubmit = async () => {
    const payload: User = form.getFieldsValue();
    const user = await login(payload);
    if (user) {
      auth.login(user);
      router.invalidate();
    }
  };

  useEffect(() => {
    if (auth?.isLoqggedIn) {
      navigate({ to: search.redirect });
    }
  }, [auth?.isLoqggedIn, search.redirect]);

  return (
    <div className=" w-[500px] bg-slate-300 p-[32px] rounded-xl">
      {!auth?.isLoqggedIn ? (
        <Form onFinish={onSubmit} form={form}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input />
          </Form.Item>
          <Button htmlType="submit">Login</Button>
        </Form>
      ) : null}
    </div>
  );
}
