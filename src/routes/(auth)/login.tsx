import Login from "@/pages/auth/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/login")({
  component: Login,
});
