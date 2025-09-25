import { configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "../modules/users/users.slice";
import { countersReducer } from "../modules/counters/counters.slice";
import { usersApi } from "../modules/users/api";
import { useDispatch, useSelector, useStore } from "react-redux";

export const store = configureStore({
  reducer: {
    counters: countersReducer,
    [usersSlice.name]: usersSlice.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (gDM) => gDM().concat(usersApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
