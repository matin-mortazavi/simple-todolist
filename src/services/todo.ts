import { FetchedTodos, Todo } from "@/types/todo";

const BASE_URL = "http://localhost:3000";

export const getTodos = async (): Promise<FetchedTodos> => {
  try {
    const res = await fetch(`${BASE_URL}/todos?_page=1&_limit=2`);
    const items = await res.json();

    const data = {
      items,
      total: Number(res.headers.get("X-Total-Count"))!,
    };

    return data;
  } catch (err) {
    throw new Error("Something went wrong");
  }
};

export const getTodo = ({ id }: { id: string }): Promise<Todo> =>
  fetch(`${BASE_URL}/todos/${id}`).then((res) => res.json());

export const createTodo = (payload: Todo): Promise<Todo> =>
  fetch(`${BASE_URL}/todos`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());

export const deleteTodo = (id: string): Promise<Todo> =>
  fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());

export const updateTodo = (payload: Todo): Promise<Todo> =>
  fetch(`${BASE_URL}/todos/${payload.id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    method: "PATCH",
  }).then((res) => res.json());
