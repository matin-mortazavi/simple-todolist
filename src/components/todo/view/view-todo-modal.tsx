import { Alert, Modal, Spin, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { todoQueryOptions } from "@/services/query-options";
import { generalConstant } from "@/constants";
import React from "react";

const ViewTodoModal = ({
  id,
  isOpen,
  onCancel,
}: {
  id: string;
  isOpen: boolean;
  onCancel: () => void;
}) => {
  const { data, isLoading } = useQuery(todoQueryOptions(id));

  const content: React.ReactNode = (() => {
    if (isLoading) return <Spin />;

    if (!data?.title)
      return (
        <Alert message={generalConstant.DEFAULT_ERROR_MESSEGE} type="error" />
      );
    return <Typography.Title>{data.title}</Typography.Title>;
  })();

  return (
    <Modal open={isOpen} onCancel={onCancel} onClose={onCancel} footer={null}>
      {content}
    </Modal>
  );
};

export default ViewTodoModal;
