import { create } from "zustand";
import type { IUser } from "../types";

interface IUserState {
  user: IUser | null;
  isLoading: boolean;
  error: string | null;
}

interface IUserActions {
  setUser: (user: IUser) => void;
  updateUser: (updates: Partial<IUser>) => void;
  levelUp: () => void;
  addExperience: (amount: number) => void;
  resetUser: () => void;
  clearError: () => void;
}

type IUserStore = IUserState & IUserActions;

const initialState: IUserState = {
  user: null,
  isLoading: false,
  error: null,
};

const defaultUser: IUser = {
  id: 1,
  name: "Алексей Петров",
  email: "alex@example.com",
  age: 28,
  level: 1,
  experience: 0,
  tasksCompleted: 0,
};

export const useUserStore = create<IUserStore>((set) => ({
  ...initialState,
  user: defaultUser,
  setUser: (user) => set({ user }),
  updateUser: (updates) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...updates } : null,
    })),
  levelUp: () =>
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            level: state.user.level + 1,
            experience: state.user.experience + 100,
          }
        : null,
    })),
  addExperience: (amount) =>
    set((state) => {
      if (!state.user) return state;
      const newExperience = state.user.experience + amount;
      const newLevel = Math.floor(newExperience / 100) + 1;
      return {
        user: {
          ...state.user,
          experience: newExperience,
          level: newLevel,
        },
      };
    }),
  resetUser: () => set({ user: defaultUser, error: null }),
  clearError: () => set({ error: null }),
}));

export const useUser = () => useUserStore((state) => state.user);
export const useUserName = () =>
  useUserStore((state) => state.user?.name || "");
export const useUserLevel = () =>
  useUserStore((state) => state.user?.level || 1);
export const useUserExperience = () =>
  useUserStore((state) => state.user?.experience || 0);
export const useUserTasksCompleted = () =>
  useUserStore((state) => state.user?.tasksCompleted || 0);
export const useIsLoading = () => useUserStore((state) => state.isLoading);
export const useError = () => useUserStore((state) => state.error);

export const useUserActions = () => ({
  levelUp: useUserStore((state) => state.levelUp),
  addExperience: useUserStore((state) => state.addExperience),
  resetUser: useUserStore((state) => state.resetUser),
  updateUser: useUserStore((state) => state.updateUser),
});
