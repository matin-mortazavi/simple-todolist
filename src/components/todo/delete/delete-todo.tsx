import { generalConstant } from "@/constants";
import { todosQueryOptions } from "@/services/query-options";
import { deleteTodo } from "@/services/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import { notification, Popconfirm } from "antd";
import React from "react";

export interface DeleteTodoProps {
  id: string;
  children: React.ReactNode;
}
const DeleteTodo: React.FC<DeleteTodoProps> = ({ id, children }) => {
  const { page, limit } = useSearch({ from: "/_protected/todos" });

  const queryClient = useQueryClient();
  const handleSettled = () =>
    queryClient.invalidateQueries({
      queryKey: todosQueryOptions(page, limit).queryKey,
    });

  // Delete todo mutation
  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSettled: handleSettled,
  });

  const onConfirm = async () => {
    try {
      await deleteTodoMutation.mutateAsync(id);
      notification.success({ message: "Todo was deleted successfully" });
    } catch (err) {
      notification.error({ message: generalConstant.DEFAULT_ERROR_MESSEGE });
    }
  };
  return (
    <Popconfirm
      title="Delete the task"
      description="Are you sure to delete this task?"
      onConfirm={onConfirm}
      okText="Yes"
      cancelText="No"
    >
      {children}
    </Popconfirm>
  );
};

export default DeleteTodo;
