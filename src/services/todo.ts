import { Todo } from "@/types/todo";

const BASE_URL = "http://localhost:3000";

export const getTodos = (): Promise<Todo[]> =>
  fetch(`${BASE_URL}/todos`).then((res) => res.json());

export const getTodo = ({ id }: { id: string }): Promise<Todo> =>
  fetch(`${BASE_URL}/todos/${id}`).then((res) => res.json());

export const createTodo = (payload: Todo): Promise<Todo> =>
  fetch(`${BASE_URL}/todos`, {
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
