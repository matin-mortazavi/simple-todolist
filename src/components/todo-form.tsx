import { Card, Checkbox, Col, Form, Input, Row, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";

const TodoForm = ({ id, form }: { id?: string; form: any }) => {
  const isEditMode = !!id;

  const priorities = [
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ];

  const intitalValues = {
    title: "",
    id: "",
    priority: "",
    isComplated: "",
  };

  return (
    <Card>
      <Form form={form} initialValues={intitalValues}>
        <Row justify="space-between">
          <Col span={16}>
            <Form.Item label="priority" name="priority">
              <Select options={priorities} />
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
            <FormItem label="Title" name="title">
              <Input />
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default TodoForm;
