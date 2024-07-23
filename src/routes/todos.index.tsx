import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../services/todo";
import { Button, Form, Modal, Spin } from "antd";
import { useState } from "react";
import TodoForm from "../components/todo-form";
import TodoList from "../components/todo-list";

export const Route = createFileRoute("/todos/")({
  component: Todos,
});

interface Modal {
  open: boolean;
  todoId?: string;
}

function Todos() {
  const [form] = Form.useForm();
  const [modal, setModal] = useState<Modal>({ open: false, todoId: "" });

  const {
    data: todos,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
  const queryClient = useQueryClient();
  const { mutateAsync: updateTodoMutation, isPending: updateTodoLoading } =
    useMutation({
      mutationFn: updateTodo,
      onSuccess: (data, variables) => {
        queryClient.setQueryData([["todo"], { id: variables.id }], data);
      },
    });

  const { mutateAsync: deleteTodoMutation, isPending: delteTodoLoading } =
    useMutation({
      mutationFn: deleteTodo,
    });

  const handleUpdate = async (id: string): Promise<void> => {
    const todoToEdit = todos?.find((item) => item.id === id);

    setModal({ todoId: id, open: true });
    form.setFieldsValue(todoToEdit);

    console.log(form.getFieldsValue());
  };

  const handleDelete = async (id: string): Promise<void> => {
    await deleteTodoMutation(id);
  };

  const { mutateAsync: addTodoMutation, isPending: addTodoLoading } =
    useMutation({
      mutationFn: createTodo,
    });

  const onSubmit = async () => {
    try {
      const payload = form.getFieldsValue();

      if (modal.todoId) {
        await updateTodoMutation({ ...payload, id: modal.todoId });
      } else {
        payload.id = todos!.length + 1;
        await addTodoMutation(payload);
      }
      refetch();
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  const handleClose = () => {
    setModal({ todoId: "", open: false });
    form.resetFields();
  };

  if (isLoading) return <Spin />;
  else if (isError) return <span>error</span>;

  return (
    <div>
      <Button style={{marginBottom : 16}} onClick={() => setModal({ todoId: "", open: true })}>
        Create New Todo
      </Button>

      <TodoList todos={todos} onUpdate={handleUpdate} onDelete={handleDelete} />
      <Modal
        okText={modal.todoId ? "Edit" : "Add"}
        open={modal.open}
        onOk={onSubmit}
        confirmLoading={addTodoLoading || updateTodoLoading}
        onClose={handleClose}
        onCancel={handleClose}
      >
        <TodoForm form={form} />
      </Modal>
    </div>
  );
}
