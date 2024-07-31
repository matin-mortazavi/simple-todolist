import { useNavigate, useRouter, useSearch } from "@tanstack/react-router";
import { Form, notification } from "antd";
import { login } from "@/services/auth";
import { User } from "@/types/user";
import { useEffect } from "react";
import AuthForm from "@/components/auth/auth-form";
import AlreadyLoggedin from "@/components/auth/already-loggedin";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/auth";

export default function Login() {
  const search: { redirect?: string } = useSearch({ from: "/login" });
  const router = useRouter();
  const navigate = useNavigate({ from: "/login" });

  const [form] = Form.useForm();

  const [isAuthorized, user, logout, contextLogin] = useAuthStore((state) => [
    state.isAuthorized,
    state.user,
    state.logout,
    state.login,
  ]);
  const authMutation = useMutation({
    mutationFn: login,
  });

  const onFinish = async (payload: User) => {
    try {
      const user = await authMutation.mutateAsync(payload);
      await contextLogin(user);
      router.invalidate();
    } catch (err) {
      notification.error({ message: "Username or password isn't correct" });
    } finally {
      form.resetFields();
    }
  };

  const onLogoutClick = () => logout();

  useEffect(() => {
    if (isAuthorized) navigate({ to: search.redirect });
  }, [isAuthorized, search.redirect]);

  return (
    <div className=" w-[500px] bg-blue-200 p-[32px] rounded-xl mx-auto ">
      {!isAuthorized ? (
        <AuthForm
          form={form}
          onFinish={onFinish}
          loading={authMutation.isPending}
        />
      ) : (
        <AlreadyLoggedin
          onLogoutClick={onLogoutClick}
          username={user.username!}
        />
      )}
    </div>
  );
}
