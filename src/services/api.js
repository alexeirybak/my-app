import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://67ed28164387d9117bbc7da1.mockapi.io/api/v1/",
  }),
  tagTypes: ["Todos"],
  // refetchOnReconnect: true,
  // refetchOnFocus: true,
  //keepUnusedDataFor: 3600,
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => "todos",
      providesTags: ["Todos"],
    }),

    getTodoById: builder.query({
      query: (id) => `todos/${id}`,
    }),

    createTodo: builder.mutation({
      query: (newTodo) => ({
        url: "todos",
        method: "POST",
        body: newTodo,
      }),
      //invalidatesTags: ["Todos"],
    }),

    updateTodo: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `todos/${id}`,
        method: "PUT",
        body: rest,
      }),
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getTodos", undefined, (draft) => {
            const todo = draft.find((todo) => todo.id === id);
            if (todo) {
              Object.assign(todo, patch);
            }
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Todos"],
    }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useLazyGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  usePrefetch,
} = api;
