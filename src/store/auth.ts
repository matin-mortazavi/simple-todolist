import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { User } from "../types/user";

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthorized: false,
      user: {},
      login: (user: User) => {
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
