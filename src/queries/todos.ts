import { queryOptions } from "@tanstack/react-query";
import { getTodos } from "../api/todos";

export const todosQueryOptions = () =>
  queryOptions({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
