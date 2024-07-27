import { Alert, Modal, Spin } from "antd";
import EditTodoForm from "./edit-todo-from";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { todoQueryOptions } from "@/services/query-options";
import React from "react";
import { generalConstant } from "@/constants";

const EditTodoModal = ({
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

    return <EditTodoForm todo={data} onClose={onCancel} />;
  })();

  return (
    <Modal open={isOpen} onCancel={onCancel} onClose={onCancel} footer={null}>
      {content}
    </Modal>
  );
};

export default EditTodoModal;
