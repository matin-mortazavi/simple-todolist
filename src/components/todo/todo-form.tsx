import { generalConstant } from "@/constants";
import { Todo } from "@/types/todo";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
} from "antd";
import { FormInstance } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";

interface TodoFormProps {
  form: FormInstance;
  onFinish: (payload: Todo) => void;
  onClose: () => void;
  loading: boolean;
}

const priorities = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

const intitalValues = {
  title: "",
  id: "",
  priority: "",
  isCompleted: "",
};

const TodoForm = ({ form, onFinish, onClose, loading }: TodoFormProps) => {
  return (
    <Card>
      <Form onFinish={onFinish} form={form} initialValues={intitalValues}>
        <Row justify="space-between">
          <Col span={16}>
            <Form.Item
              label="priority"
              name="priority"
              rules={[generalConstant.DEFAULT_REQUIRED_FIELD_CONFIG]}
            >
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
          <Button loading={loading} htmlType="submit" type="primary">
            Submit
          </Button>
        </Flex>
      </Form>
    </Card>
  );
};

export default TodoForm;
