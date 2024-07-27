import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { createTodo, deleteTodo, updateTodo } from "@/services/todo";
import { Button, Form, Modal } from "antd";
import { useState } from "react";
import TodoList from "@/components/todo/todo-list";
import { FetchedTodos, OptimisticTodo, Todo } from "@/types/todo";
import { todoListOptions } from "@/services/query-options";
import { todoConstant } from "@/constants";
import { Outlet, useNavigate, useSearch } from "@tanstack/react-router";
import { useTodoStore } from "@/store/todo";
interface ModalState {
  open: boolean;
  todoId?: string;
}

export default function Todos() {
  const queryClient = useQueryClient();

  const { page, limit } = useSearch({ from: "/_protected/todos" }) || 0;
  const onPageChange = (page: number) => navigate({ search: { page, limit } });
  // Fetch todos on mount

  const {
    data: todos,
    isLoading,
    isError,
  } = useSuspenseQuery(todoListOptions(page, todoConstant.INITIAL_LIMIT));

  const setTotalTodos = useTodoStore((state) => state.setTotalTodos);
  setTotalTodos(todos.total);

  //Optimistic updating UI

  //get triggerd afer end of fetch and refetch todos
  const handleSettled = () =>
    queryClient.invalidateQueries({
      queryKey: todoListOptions(page, todoConstant.INITIAL_LIMIT).queryKey,
    });

  // Delete todo mutation
  const { mutateAsync: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
    onSettled: handleSettled,
  });

  // get triggered with clicking on "Edit Button" in todo-list
  const handleUpdate = async (id: string): Promise<void> => {
    navigate({
      from: "/todos",
      to: "$id/edit",
      params: { id },
      search: { page, limit },
    });
  };

  const handleView = async (id: string): Promise<void> => {
    navigate({
      from: "/todos",
      to: "$id/view",
      params: { id },
      search: { page, limit },
    });
  };

  // get triggered with clicking on "Delete Button" in todo-list
  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteTodoMutation(id);
    } catch (err) {
      console.log(err);
    }
  };

  if (isError) return <span>error</span>;

  const navigate = useNavigate();

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() =>
          navigate({
            to: "/todos/add",
            search: {
              page,
              limit,
            },
          })
        }
      >
        Create New Todo
      </Button>

      <TodoList
        crrPage={page}
        loading={isLoading}
        limit={todoConstant.INITIAL_LIMIT}
        total={todos?.total}
        todos={todos?.items}
        onUpdate={handleUpdate}
        onView={handleView}
        onDelete={handleDelete}
        onPageChange={onPageChange}
      />

      <Outlet />
    </div>
  );
}
