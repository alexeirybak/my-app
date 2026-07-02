import { queryOptions } from "@tanstack/react-query";
import { getComments } from "../api/comments";

export const commentsQueryOptions = (postId: number) =>
  queryOptions({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });
