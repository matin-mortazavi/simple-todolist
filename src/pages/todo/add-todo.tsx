import AddTodoModal from "@/components/todo/add/add-todo-modal";
import { useRouteModal } from "@/hooks/useRouteModal";
import { useSearch } from "@tanstack/react-router";

const AddTodo = () => {
  const { page, limit } = useSearch({ from: "/_protected/todos/add" });

  const { modal } = useRouteModal({
    urlToNavigate: "/todos",
    search: { page, limit },
  });

  return <AddTodoModal isOpen={modal.isOpen} onCancel={modal.onCancel} />;
};

export default AddTodo;
