import { todoQueryOptions } from "@/services/query-options";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { Card, Flex } from "antd";

const Todo = () => {
  const { id } = useParams({ from: "/_protected/todos/$id" });
  const { data } = useSuspenseQuery(todoQueryOptions(id));

  return (
    <Card>
      <Flex gap={16}>
        <span>{data.title}</span>
        <span>{data.priority.toUpperCase()}</span>
        <span>Status : {data.isCompleted ? "completed" : "not completed"}</span>
      </Flex>
    </Card>
  );
};

export default Todo;
