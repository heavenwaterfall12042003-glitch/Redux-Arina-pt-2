import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { z } from "zod";
import type { User, UserId } from "../modules/users/users.slice";

const baseUrl = "http://localhost:3000";

const UserDtoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export const baseApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Users", "User"],
  endpoints: () => ({}),
});

export const usersApi = baseApi.injectEndpoints({
  endpoints: (create) => ({
    getUsers: create.query<User[], void>({
      query: () => "/users",
      transformResponse: (res: unknown) => UserDtoSchema.array().parse(res),
      providesTags: (result) =>
        result
          ? [
              ...result.map((u) => ({ type: "User" as const, id: u.id })),
              { type: "Users" as const, id: "LIST" },
            ]
          : [{ type: "Users" as const, id: "LIST" }],
    }),
    getUser: create.query<User, UserId>({
      query: (userId) => `/users/${userId}`,
      transformResponse: (res: unknown) => UserDtoSchema.parse(res),
      providesTags: (_res, _err, userId) => [{ type: "User", id: userId }],
    }),
    deleteUser: create.mutation<void, UserId>({
      query: (userId) => ({ method: "DELETE", url: `/users/${userId}` }),
      invalidatesTags: (_res, _err, userId) => [
        { type: "User", id: userId },
        { type: "Users", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: true,
});

export const { useGetUsersQuery, useGetUserQuery, useDeleteUserMutation } =
  usersApi;
