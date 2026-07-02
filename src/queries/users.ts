import { queryOptions } from "@tanstack/react-query";
import { getUser, getUserPosts } from "../api/users";

export const userQueryOptions = (userId: number) =>
  queryOptions({
    queryKey: ["user", userId],
    queryFn: () => getUser(userId),
    enabled: userId !== undefined && userId > 0,
  });

export const userPostsQueryOptions = (userId?: number) =>
  queryOptions({
    queryKey: ["posts", userId],
    queryFn: () => getUserPosts(userId!),
    enabled: userId !== undefined && userId > 0,
  });
