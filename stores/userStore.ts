import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserType = {
  id: string;
  email: string;
  password: string;
  username: string;
};

type UserStore = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  allUser: UserType[];
  addUser: (user: UserType) => void;
  removeUser: (user: UserType) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      allUser: [],

      addUser: (user) =>
        set((state) => ({
          allUser: [...state.allUser, user],
        })),

      removeUser: (user) =>
        set((state) => ({
          allUser: state.allUser.filter(
            (value) => value.email !== user.email
          ),
        })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);