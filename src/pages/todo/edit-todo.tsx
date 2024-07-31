import EditTodoModal from "@/components/todo/edit/edit-todo-modal";
import { useRouteModal } from "@/hooks/useRouteModal";
import { useParams, useSearch } from "@tanstack/react-router";

const EditTodo = () => {
  const { id } = useParams({ from: "/_protected/todos/$id/edit" });
  const { page, limit } = useSearch({ from: "/_protected/todos/$id/edit" });

  const { modal } = useRouteModal({
    urlToNavigate: "/todos",
    search: { page, limit },
  });

  return (
    <EditTodoModal
      id={id.toString()}
      isOpen={modal.isOpen}
      onCancel={modal.onCancel}
    />
  );
};

export default EditTodo;
