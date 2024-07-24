import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../types/user";
export interface AuthStore {
  isAuthorized: boolean;
  user: User;
  login: (user: User) => void;
  logout: () => void;
}
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthorized: false,
      user: {},
      login: (user) => {
        set({ isAuthorized: true, user });
      },
      logout: () => {
        set({ isAuthorized: false, user: {} });
      },
    }),

    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
