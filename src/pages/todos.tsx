import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, getTodos, updateTodo } from "@/services/todo";
import { Button, Form, Modal, Spin } from "antd";
import { useState } from "react";
import TodoForm from "@/components/todo/todo-form";
import TodoList from "@/components/todo/todo-list";
import { OptimisticTodo, Todo } from "@/types/todo";

interface ModalState {
  open: boolean;
  todoId?: string;
}

export default function Todos() {
  const [form] = Form.useForm();
  const [modal, setModal] = useState<ModalState>({ open: false, todoId: "" });

  const handleCloseModal = () => {
    setModal({ todoId: "", open: false });
    form.resetFields();
  };

  const queryClient = useQueryClient();

  const todoListOptions = {
    queryKey: ["todos"],
    queryFn: getTodos,
  };

  // Fetch todos on mount
  const {
    data: todos,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(todoListOptions);

  const handleMutate = async (todo: Todo) => {
    queryClient.cancelQueries({ queryKey: todoListOptions.queryKey });
    const prevTodos = queryClient.getQueryData<Todo[]>(
      todoListOptions.queryKey
    );

    if (prevTodos) {
      queryClient.setQueryData(todoListOptions.queryKey, [
        ...prevTodos,
        { ...todo, isPending: true } as OptimisticTodo,
      ]);
    }
  };

  const handleSettled = () => {
    queryClient.invalidateQueries({ queryKey: todoListOptions.queryKey });
  };

  // Create todo mutation
  const { mutateAsync: addTodoMutation, isPending: addTodoLoading } =
    useMutation({
      mutationFn: createTodo,
      onMutate: handleMutate,
      onSettled: handleSettled,
    });

  // Update todo mutation
  const { mutateAsync: updateTodoMutation, isPending: updateTodoLoading } =
    useMutation({
      mutationFn: updateTodo,
      onMutate: handleMutate,
      onSuccess: (data, variables) => {
        queryClient.setQueryData([["todo"], { id: variables.id }], data);
      },
      onSettled: handleSettled,
    });

  // Delete todo mutation
  const { mutateAsync: deleteTodoMutation } = useMutation({
    mutationFn: deleteTodo,
  });

  // get triggered with clicking on "Edit Button" in todo-list
  const handleUpdate = async (id: string): Promise<void> => {
    const todoToEdit = todos?.find((item) => item.id === id);

    setModal({ todoId: id, open: true });
    form.setFieldsValue(todoToEdit);
  };

  // get triggered with clicking on "Delete Button" in todo-list
  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteTodoMutation(id);
    } catch (err) {
      console.log(err);
    }
  };

  // get triggered with "onOk" in Modal
  const onSubmit = async () => {
    try {
      const payload = form.getFieldsValue();

      if (modal.todoId) {
        await updateTodoMutation({ ...payload, id: modal.todoId });
      } else {
        const payloadWithId = {
          id: (todos!.length + 1).toString(),
          ...payload,
        };
        await addTodoMutation(payloadWithId);
      }
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
        title={modal.todoId ? "Edit Todo" : "Add Todo"}
        open={modal.open}
        footer={null}
        onCancel={handleCloseModal}
      >
        <TodoForm
          form={form}
          onFinish={onSubmit}
          onClose={handleCloseModal}
          loading={addTodoLoading || updateTodoLoading}
        />
      </Modal>
    </div>
  );
}
