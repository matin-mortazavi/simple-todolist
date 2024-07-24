import {
  Link,
  useNavigate,
  useRouteContext,
  useRouter,
  useSearch,
} from "@tanstack/react-router";
import { Button, Flex, Form, Input, Typography } from "antd";
import { login } from "@/services/auth";
import { User } from "@/types/user";
import { useEffect } from "react";
import AuthForm from "@/components/auth/auth-form";
import AlreadyLoggedin from "@/components/auth/already-loggedin";

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
        <AuthForm form={form} onFinish={onFinish} />
      ) : (
        <AlreadyLoggedin
          onLogoutClick={onLogoutClick}
          username={context.user.username!}
        />
      )}
    </div>
  );
}
