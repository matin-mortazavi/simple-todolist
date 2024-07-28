import { generalConstant, todoConstant } from "@/constants";
import { todoListOptions, todoQueryOptions } from "@/services/query-options";
import { updateTodo } from "@/services/todo";
import { FetchedTodos, OptimisticTodo, Todo } from "@/types/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearch } from "@tanstack/react-router";
import {
  Button,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  notification,
  Row,
  Select,
} from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { produce } from "immer";
import React, { useEffect } from "react";

interface EditTodoFormProps {
  onClose: () => void;
  todo: Todo;
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({ onClose, todo }) => {
  const [form] = useForm();
  const { page, limit } = useSearch({ from: "/_protected/todos/$id/edit" });
  const queryClient = useQueryClient();

  const handleMutate = async (todo: Todo) => {
    queryClient.cancelQueries({
      queryKey: todoListOptions(page, todoConstant.INITIAL_LIMIT).queryKey,
    });

    const prevTodos = queryClient.getQueryData<FetchedTodos>(
      todoListOptions(page, todoConstant.INITIAL_LIMIT).queryKey
    );

    if (prevTodos) {
      const existedTodo = prevTodos.items.find((item) => item.id === todo.id);
      const updatedTodo = {
        ...todo,
        isPending: true,
      } as OptimisticTodo;

      const updatedTodoIndex = prevTodos.items.findIndex(
        (todo) => todo.id === existedTodo?.id
      );
      const updatedData = produce(prevTodos, (draft) => {
        draft.items.splice(updatedTodoIndex, 1, updatedTodo);
      });

      queryClient.setQueryData(
        todoListOptions(page, limit).queryKey,
        updatedData
      );
    }
  };

  const handleSettled = () =>
    queryClient.invalidateQueries({
      queryKey: todoListOptions(page, limit).queryKey,
    });

  const editTodoMutation = useMutation({
    mutationFn: updateTodo,
    onMutate: handleMutate,
    onSettled: handleSettled,
  });

  const onFinish = async (payload: Todo) => {
    try {
      const payloadWithId = produce(payload, (draft) => {
        draft.id = todo.id;
      });

      const updatedTodo = await editTodoMutation.mutateAsync(payloadWithId);

      queryClient.setQueryData(todoQueryOptions(todo.id).queryKey, updatedTodo);
      notification.success({ message: "Todo updated was successfully" });

      form.resetFields();
      onClose();
    } catch (err) {
      notification.error({ message: "Something went wrong" });
    }
  };

  useEffect(() => {
    form.setFieldsValue(todo);
  }, [todo]);
  return (
    <Form onFinish={onFinish} form={form}>
      <Row justify="space-between">
        <Col span={16}>
          <Form.Item
            label="priority"
            name="priority"
            rules={[generalConstant.DEFAULT_REQUIRED_FIELD_CONFIG]}
          >
            <Select options={todoConstant.PRIORITIES} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Complated"
            name="isCompleted"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </Col>
        <Col span={24}>
          <FormItem
            label="Title"
            name="title"
            rules={[generalConstant.DEFAULT_REQUIRED_FIELD_CONFIG]}
          >
            <Input />
          </FormItem>
        </Col>
      </Row>
      <Flex gap={16}>
        <Button onClick={onClose} htmlType="submit">
          Cancele
        </Button>
        <Button
          loading={editTodoMutation.isPending}
          htmlType="submit"
          type="primary"
        >
          Submit
        </Button>
      </Flex>
    </Form>
  );
};

export default EditTodoForm;
