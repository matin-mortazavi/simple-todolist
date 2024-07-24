import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, getTodos, updateTodo } from "@/services/todo";
import { Button, Form, Modal } from "antd";
import { useState } from "react";
import TodoForm from "@/components/todo/todo-form";
import TodoList from "@/components/todo/todo-list";
import { FetchedTodos, OptimisticTodo, Todo } from "@/types/todo";

interface ModalState {
  open: boolean;
  todoId?: string;
}

const LIMIT = 4;

export default function Todos() {
  const [form] = Form.useForm();
  const [modal, setModal] = useState<ModalState>({ open: false, todoId: "" });
  const [page, setPage] = useState<number>(1);

  const handleCloseModal = () => {
    setModal({ todoId: "", open: false });
    form.resetFields();
  };

  const queryClient = useQueryClient();

  const todoListOptions = {
    queryKey: ["todos", page],
    queryFn: () => getTodos(page, LIMIT),
  };

  // Fetch todos on mount
  const { data: todos, isLoading, isError } = useQuery(todoListOptions);

  const handleMutate = async (todo: Todo) => {
    queryClient.cancelQueries({ queryKey: todoListOptions.queryKey });
    const prevTodos = queryClient.getQueryData<FetchedTodos>(
      todoListOptions.queryKey
    );

    if (prevTodos) {
      const updatedTodos = [
        ...prevTodos.items,
        { ...todo, isPending: true } as OptimisticTodo,
      ];
      const updatedTotalTodos = prevTodos.total + 1;

      queryClient.setQueryData(todoListOptions.queryKey, {
        total: updatedTotalTodos,
        items: updatedTodos,
      });
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
    onSettled: handleSettled,
  });

  // get triggered with clicking on "Edit Button" in todo-list
  const handleUpdate = async (id: string): Promise<void> => {
    const todoToEdit = todos?.items.find((item) => item.id === id);

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
          id: (todos!.total + 1).toString(),
          ...payload,
        };
        await addTodoMutation(payloadWithId);
      }
    } catch (err) {
      console.log(err);
    }
    handleCloseModal();
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  if (isError) return <span>error</span>;

  return (
    <div>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => setModal({ todoId: "", open: true })}
      >
        Create New Todo
      </Button>

      <TodoList
        crrPage={page}
        loading={isLoading}
        limit={LIMIT}
        total={todos?.total}
        todos={todos?.items}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onPageChange={onPageChange}
      />

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
