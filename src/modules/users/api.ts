import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "./users.slice";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Users", "User"],
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),
    getUser: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["Users"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({ url: `/users/${id}`, method: "DELETE" }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useDeleteUserMutation } =
  usersApi;
