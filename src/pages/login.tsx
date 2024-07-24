import {
  Link,
  useNavigate,
  useRouteContext,
  useRouter,
  useSearch,
} from "@tanstack/react-router";
import { Button, Flex, Form, Input, Typography } from "antd";
import { login } from "../services/auth";
import { User } from "../types/user";
import { useEffect } from "react";

export default function Login() {
  const search: { redirect?: string } = useSearch({ from: "/login" });
  const router = useRouter();
  const navigate = useNavigate({ from: "/login" });

  const [form] = Form.useForm();

  const context = useRouteContext({
    from: "/login",
    select: (context) => context?.auth,
  });

  const onFinish = async (payload: User) => {
    const user = await login(payload);
    if (user) {
      await context.login(user);
      router.invalidate();
    }
  };

  const onLogoutClick = () => context.logout();

  useEffect(() => {
    if (context?.isAuthorized) {
      navigate({ to: search.redirect });
    }
  }, [context?.isAuthorized, search.redirect]);

  return (
    <div className=" w-[500px] bg-slate-300 p-[32px] rounded-xl mx-auto">
      {!context?.isAuthorized ? (
        <Form onFinish={onFinish} form={form}>
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
      ) : (
        <Flex gap="24" vertical>
          <Typography.Paragraph>
            You loggedIn as
            <span className="ml-[8px] text-lg">{context.user.username}</span>
          </Typography.Paragraph>
          <Typography.Paragraph>
            Navigate to dashboard <Link to="/todos"> Navigate </Link>
          </Typography.Paragraph>
          <Button type="primary" onClick={onLogoutClick}>
            Log out
          </Button>
        </Flex>
      )}
    </div>
  );
}
