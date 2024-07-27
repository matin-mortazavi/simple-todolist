import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export interface RouteModal {
  urlToNavigate: string;
  params?: object;
  search?: object;
}

export function useRouteModal({ urlToNavigate, search, params }: RouteModal) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  const onCancel = () => {
    setIsOpen(false);
    setTimeout(() => navigate({ to: urlToNavigate, search, params }), 200);
  };

  return {
    modal: {
      isOpen,
      onCancel,
    },
  };
}
