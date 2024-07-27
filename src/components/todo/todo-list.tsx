import React from "react";
import { OptimisticTodo, Todo } from "@/types/todo";
import { Button, Popconfirm, Spin, Table, TableProps, Tag } from "antd";
import DeleteTodo from "./delete/delete-todo";

const colors: {
  [key: string]: string;
} = {
  high: "volcano",
  medium: "geekblue",
  low: "green",
};

interface TodoListProps {
  todos?: Todo[] | OptimisticTodo[];
  total?: number;
  crrPage: number;
  limit: number;
  loading: boolean;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;

  onPageChange: (page: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  total,
  crrPage = 1,
  limit = 6,
  loading,
  onUpdate,
  onView,
  onPageChange,
}) => {
  
  const columns: TableProps<Todo | OptimisticTodo>["columns"] = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title, record) => (
        <span>
          {(record as OptimisticTodo).isPending && <Spin />} {title}
        </span>
      ),
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
          <DeleteTodo id={record.id}>
            <Button disabled={(record as OptimisticTodo).isPending} danger>
              Delete
            </Button>
          </DeleteTodo>

          <Button
            disabled={(record as OptimisticTodo).isPending}
            onClick={() => onUpdate(record.id)}
          >
            Edit
          </Button>

          <Button
            type="primary"
            disabled={(record as OptimisticTodo).isPending}
            onClick={() => onView(record.id)}
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      loading={loading}
      rowClassName={(record) =>
        (record as OptimisticTodo).isPending ? "bg-gray-50  text-gray-300" : ""
      }
      pagination={{
        total,
        current: crrPage,
        defaultPageSize: limit,
        onChange: onPageChange,
      }}
      columns={columns}
      dataSource={todos}
    />
  );
};

export default TodoList;
