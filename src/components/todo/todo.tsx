import { Todo as PropType } from "@/types/todo";
import { useNavigate } from "@tanstack/react-router";

const Todo = ({
  todo,
  onUpdate,
}: {
  todo: PropType;
  onUpdate: (payload: PropType) => void;
}) => {
  const navigate = useNavigate();

  return (
    <div className=" h-[100px] w-full bg-red-300 flex flex-col">
      <span>{todo.title}</span>

      <button onClick={() => onUpdate({ ...todo, title: "edited" })}>
        Update Todo
      </button>

      <button
      // onClick={() => navigate({ to: "/todos/$id", params: { id: todo.id } })}
      >
        Show detail
      </button>
    </div>
  );
};

export default Todo;
