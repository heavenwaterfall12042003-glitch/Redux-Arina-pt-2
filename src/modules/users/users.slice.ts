import {
  createSelector,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

export type UserId = string;
export type User = { id: UserId; name: string; description: string };

export type UsersState = {
  entities: Record<UserId, User | undefined>;
  ids: UserId[];
  fetchUsersStatus: "idle" | "pending" | "success" | "failed";
  fetchUserStatus: "idle" | "pending" | "success" | "failed";
  deleteStatus: "idle" | "pending" | "success" | "failed";
};

const initialUsersState: UsersState = {
  entities: {},
  ids: [],
  fetchUsersStatus: "idle",
  fetchUserStatus: "idle",
  deleteStatus: "idle",
};

export const usersSlice = createSlice({
  name: "users",
  initialState: initialUsersState,
  selectors: {
    selectUserById: (state, userId: UserId) => state.entities[userId],
    selectSortedUsers: createSelector(
      (state: UsersState) => state.ids,
      (state: UsersState) => state.entities,
      (_: UsersState, sort: "asc" | "desc") => sort,
      (ids, entities, sort) =>
        ids
          .map((id) => entities[id])
          .filter((u): u is User => !!u)
          .sort((a, b) =>
            sort === "asc"
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name)
          )
    ),
    selectIsFetchUsersPending: (state) => state.fetchUsersStatus === "pending",
    selectIsFetchUsersIdle: (state) => state.fetchUsersStatus === "idle",
    selectIsFetchUserPending: (state) => state.fetchUserStatus === "pending",
    selectIsDeletePending: (state) => state.deleteStatus === "pending",
  },
  reducers: {
    deleteUserPending: (state) => {
      state.deleteStatus = "pending";
    },
    deleteUserSuccess: (state, action: PayloadAction<{ userId: UserId }>) => {
      const { userId } = action.payload;
      state.deleteStatus = "success";
      delete state.entities[userId];
      state.ids = state.ids.filter((id) => id !== userId);
    },
    deleteUserFailed: (state) => {
      state.deleteStatus = "failed";
    },
  },
});

export const { deleteUserPending, deleteUserSuccess, deleteUserFailed } =
  usersSlice.actions;
export const usersReducer = usersSlice.reducer;
