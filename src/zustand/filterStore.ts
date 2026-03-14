import { create } from "zustand";

interface FilterState {
  category: string;
  setCategory: (category: string) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  category: "all",
  setCategory: (category) => set({ category }),
}));
