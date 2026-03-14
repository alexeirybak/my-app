import { createSlice } from "@reduxjs/toolkit";
import type { Product } from "../../types";

interface ProductsState {
  items: Product[];
}

const initialProducts: Product[] = [
  { id: 1, name: "Ноутбуки", category: "electronics" },
  { id: 2, name: "Смартфоны", category: "electronics" },
  { id: 3, name: "Книги", category: "books" },
  { id: 4, name: "Одежда", category: "clothing" },
  { id: 5, name: "Игрушки", category: "toys" },
];

const initialState: ProductsState = {
  items: initialProducts,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;
