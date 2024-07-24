import React from "react";
import { Todo } from "@/types/todo";
import { Button, Popconfirm, Table, TableProps, Tag } from "antd";

const colors: {
  [key: string]: string;
} = {
  high: "volcano",
  medium: "geekblue",
  low: "green",
};

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}
const TodoList: React.FC<TodoListProps> = ({ todos, onUpdate, onDelete }) => {
  const columns: TableProps<Todo>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => {
        return (
          <Tag color={colors[priority]} key={priority}>
            {priority.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "status",
      dataIndex: "isCompleted",
      key: "isCompleted",
      render: (status) => {
        return (
          <div
            style={{ backgroundColor: status ? "green" : "red" }}
            className=" w-[30px] h-[30px]"
          ></div>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className=" flex gap-[16px] [&>*]:cursor-pointer">
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Confirm"
            cancelText="No"
            onConfirm={() => onDelete(record.id)}
          >
            <Button danger>Delete</Button>
          </Popconfirm>

          <Button onClick={() => onUpdate(record.id)}>Edit</Button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} dataSource={todos} />;
};

export default TodoList;
