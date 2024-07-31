import ViewTodoModal from "@/components/todo/view/view-todo-modal";
import { useRouteModal } from "@/hooks/useRouteModal";
import { useParams, useSearch } from "@tanstack/react-router";

const ViewTodo = () => {
  const { id } = useParams({ from: "/_protected/todos/$id/view" });
  const { page, limit } = useSearch({ from: "/_protected/todos/$id/view" });

  const { modal } = useRouteModal({
    urlToNavigate: "/todos",
    search: { page, limit },
  });

  return (
    <ViewTodoModal onCancel={modal.onCancel} isOpen={modal.isOpen} id={id} />
  );
};

export default ViewTodo;
