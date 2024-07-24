import React from "react";
import { OptimisticTodo, Todo } from "@/types/todo";
import { Button, Popconfirm, Spin, Table, TableProps, Tag } from "antd";

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
  onPageChange: (page: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  total,
  crrPage = 1,
  limit = 6,
  loading,
  onUpdate,
  onDelete,
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
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            okText="Confirm"
            cancelText="No"
            onConfirm={() => onDelete(record.id)}
          >
            <Button disabled={(record as OptimisticTodo).isPending} danger>
              Delete
            </Button>
          </Popconfirm>

          <Button
            className=""
            disabled={(record as OptimisticTodo).isPending}
            onClick={() => onUpdate(record.id)}
          >
            Edit
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
