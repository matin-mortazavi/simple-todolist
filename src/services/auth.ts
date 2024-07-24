import { User } from "../types/user";

const BASE_URL = "http://localhost:3000";

export const login = async (payload: User): Promise<User> => {
  try {
    const res = await fetch(`${BASE_URL}/users/${payload.username}`);
    const user = await res.json();
    if (user.password === payload.password)
      return { username: user.id, token: "FAKE_TOKEN" };
    else throw new Error("Password in wrong");
  } catch (err) {
    throw new Error("Username or Password is wrong");
  }
};
