import { User } from "@/types/user";
import { authConstant } from "@/constants/auth";

const BASE_URL = "http://localhost:3000";

export const login = async (payload: User): Promise<User> => {
  try {
    const res = await fetch(`${BASE_URL}/users/${payload.username}`);
    const user = await res.json();

    //We don't have a real backend-api therefore we should check
    //authentication approach manual in frontend side
    if (user.password === payload.password)
      //We use json-server as data provider and it work with "id" property
      //so we fetch with id but we transform it to "username" in returb
      return { username: user.id, token: authConstant.TOKEN };
    else throw new Error("Password in wrong");
  } catch (err) {
    throw new Error("Username or Password is wrong");
  }
};
