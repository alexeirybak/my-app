import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import type { IUser } from "../types";

interface IUserState {
  user: IUser | null;
  gameOver: boolean;
  isLoading: boolean;
  error: string | null;
}

interface IUserActions {
  setUser: (user: IUser) => void;
  levelUp: () => void;
  addExperience: (amount: number) => void;
  resetUser: () => void;
  canLevelUp: () => boolean;
  getExpForNextLevel: () => number;
  restartGame: () => void;
  fetchRandomUser: () => Promise<void>;
  clearError: () => void;
}

type IUserStore = IUserState & IUserActions;

const initialState: IUserState = {
  user: null,
  gameOver: false,
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

export const useUserStore = create<IUserStore>()(
  devtools(
    persist(
      immer((set, get) => ({
        ...initialState,
        user: defaultUser,
        setUser: (user) =>
          set((state) => {
            state.user = user;
            state.error = null;
          }),
        levelUp: () =>
          set(
            (state) => {
              if (state.user && !state.gameOver) {
                state.user.level += 1;
                state.user.experience += 100;
              }
            },
            false,
            "Изменение уровня",
          ),
        addExperience: (amount) =>
          set(
            (state) => {
              if (state.user && !state.gameOver) {
                state.user.experience += amount;
                state.user.level = Math.floor(state.user.experience / 100) + 1;

                if (state.user.experience >= 1000) {
                  state.gameOver = true;
                }
              }
            },
            false,
            "Изменение опыта",
          ),
        resetUser: () =>
          set((state) => {
            state.user = defaultUser;
            state.gameOver = false;
            state.error = null;
          }),
        restartGame: () =>
          set((state) => {
            state.user = defaultUser;
            state.gameOver = false;
            state.error = null;
          }),
        clearError: () =>
          set((state) => {
            state.error = null;
          }),
        canLevelUp: () => {
          const currentUser = get().user;
          if (!currentUser || currentUser.experience >= 1000) return false;
          return currentUser.experience >= 100;
        },
        getExpForNextLevel: () => {
          const currentUser = get().user;
          if (!currentUser || currentUser.experience >= 1000) return 0;
          const expNeeded = 100 - (currentUser.experience % 100);
          return expNeeded === 100 ? 0 : expNeeded;
        },
        fetchRandomUser: async () => {
          set((state) => {
            state.isLoading = true;
            state.error = null;
          });
          try {
            const randomId = Math.floor(Math.random() * 10) + 1;
            const response = await fetch(
              `https://jsonplaceholder.typicode.com/users/${randomId}`,
            );
            if (!response.ok) {
              throw new Error("Ошибка при загрузке данных пользователя");
            }
            const jsonUser = await response.json();
            const newUser: IUser = {
              id: jsonUser.id,
              name: jsonUser.name,
              email: jsonUser.email,
              age: Math.floor(Math.random() * 30) + 20,
              level: 1,
              experience: 0,
              tasksCompleted: 0,
            };

            set((state) => {
              state.user = newUser;
              state.gameOver = false;
              state.isLoading = false;
            });
          } catch (error) {
            set((state) => {
              state.error =
                error instanceof Error ? error.message : "Неизвестная ошибка";
              state.isLoading = false;
            });
          }
        },
      })),
      {
        name: "user-store",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          user: state.user
            ? {
                id: state.user.id,
                name: state.user.name,
                level: state.user.level,
                experience: state.user.experience,
                tasksCompleted: state.user.tasksCompleted,
              }
            : null,
          gameOver: state.gameOver,
        }),
      },
    ),
  ),
);

export const useUser = () => useUserStore((state) => state.user);
export const useUserName = () =>
  useUserStore((state) => state.user?.name || "");
export const useUserLevel = () =>
  useUserStore((state) => state.user?.level || 1);
export const useUserExperience = () =>
  useUserStore((state) => state.user?.experience || 0);
export const useUserTasksCompleted = () =>
  useUserStore((state) => state.user?.tasksCompleted || 0);
export const useGameOver = () => useUserStore((state) => state.gameOver);
export const useIsLoading = () => useUserStore((state) => state.isLoading);
export const useError = () => useUserStore((state) => state.error);

export const useUserActions = () => ({
  levelUp: useUserStore((state) => state.levelUp),
  addExperience: useUserStore((state) => state.addExperience),
  resetUser: useUserStore((state) => state.resetUser),
  canLevelUp: useUserStore((state) => state.canLevelUp),
  getExpForNextLevel: useUserStore((state) => state.getExpForNextLevel),
  restartGame: useUserStore((state) => state.restartGame),
  fetchRandomUser: useUserStore((state) => state.fetchRandomUser),
  clearError: useUserStore((state) => state.clearError),
});
