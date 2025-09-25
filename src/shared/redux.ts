import { createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector, useStore } from "react-redux";
import { store } from "../app/store";
import type { User, UserId } from "../modules/users/users.slice";

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type Extra = {
  api: {
    getUsers: () => Promise<User[]>;
    getUser: (id: UserId) => Promise<User>;
    deleteUser: (id: UserId) => Promise<unknown>;
  };
};

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
export const createAppSelector = createSelector.withTypes<AppState>();

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppState;
  dispatch: AppDispatch;
  extra: Extra;
}>();
