import { generalConstant, todoConstant } from "@/constants";
import { todoListOptions } from "@/services/query-options";
import { createTodo } from "@/services/todo";
import { useTodoStore } from "@/store/todo";
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
import React from "react";

interface AddTodoFormProps {
  onClose: () => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const [form] = useForm();
  const { page, limit } = useSearch({ from: "/_protected/todos/add" });
  const totalTodos = useTodoStore((state) => state.totalTodos);

  const handleMutate = async (todo: Todo) => {
    queryClient.cancelQueries({
      queryKey: todoListOptions(page, limit).queryKey,
    });

    const prevTodos = queryClient.getQueryData<FetchedTodos>(
      todoListOptions(page, limit).queryKey
    );

    if (prevTodos) {
      const newTodo = { ...todo, isPending: true } as OptimisticTodo;
      const updatedItems = [...prevTodos.items, newTodo];

      const updatedTotal = prevTodos.total++;

      queryClient.setQueryData(todoListOptions(page, limit).queryKey, {
        total: updatedTotal,
        items: updatedItems,
      });
    }
  };

  const handleSettled = () =>
    queryClient.invalidateQueries({
      queryKey: todoListOptions(page, limit).queryKey,
    });

  const addTodoMutation = useMutation({
    mutationFn: createTodo,
    onMutate: handleMutate,
    onSettled: handleSettled,
  });

  const onFinish = async (payload: Todo) => {
    try {
      //We have to add a id manual for our api
      const payloadWithId = {
        ...payload,
        id: totalTodos.toString(),
      };
      await addTodoMutation.mutateAsync(payloadWithId);

      notification.success({ message: "Todo was added successfully" });
      form.resetFields();
      onClose();
    } catch (err) {
      notification.error({ message: "Something went wrong" });
    }
  };
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
          loading={addTodoMutation.isPending}
          htmlType="submit"
          type="primary"
        >
          Submit
        </Button>
      </Flex>
    </Form>
  );
};

export default AddTodoForm;
