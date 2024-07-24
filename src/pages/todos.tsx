import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, getTodos, updateTodo } from "@/services/todo";
import { Button, Form, Modal, Spin } from "antd";
import { useState } from "react";
import TodoForm from "@/components/todo/todo-form";
import TodoList from "@/components/todo/todo-list";

interface Modal {
  open: boolean;
  todoId?: string;
}

export default function Todos() {
  const [form] = Form.useForm();
  const [modal, setModal] = useState<Modal>({ open: false, todoId: "" });

  const handleCloseModal = () => {
    setModal({ todoId: "", open: false });
    form.resetFields();
  };

  const queryClient = useQueryClient();

  //Fetch todos in mount
  const {
    data: todos,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  //Create todo mutation
  const { mutateAsync: addTodoMutation, isPending: addTodoLoading } =
    useMutation({
      mutationFn: createTodo,
    });

  //Update todo mutation
  const { mutateAsync: updateTodoMutation, isPending: updateTodoLoading } =
    useMutation({
      mutationFn: updateTodo,
      onSuccess: (data, variables) => {
        queryClient.setQueryData([["todo"], { id: variables.id }], data);
      },
    });

  //Delete todo mutation
  const { mutateAsync: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
  });

  //get triggered with clicking on "Edit Button" in todo-list
  const handleUpdate = async (id: string): Promise<void> => {
    const todoToEdit = todos?.find((item) => item.id === id);

    setModal({ todoId: id, open: true });
    form.setFieldsValue(todoToEdit);

    console.log(form.getFieldsValue());
  };

  //get triggered with clicking on "Delete Button" in todo-list
  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteTodoMutation(id);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  //get triggered with "onOk" in Modal
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
    handleCloseModal();
  };

  if (isLoading) return <Spin />;
  else if (isError) return <span>error</span>;

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => setModal({ todoId: "", open: true })}
      >
        Create New Todo
      </Button>

      {isSuccess && (
        <TodoList
          todos={todos}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}

      <Modal
        okText={modal.todoId ? "Edit" : "Add"}
        open={modal.open}
        onOk={onSubmit}
        confirmLoading={addTodoLoading || updateTodoLoading}
        onClose={handleCloseModal}
        onCancel={handleCloseModal}
      >
        <TodoForm form={form} />
      </Modal>
    </div>
  );
}
