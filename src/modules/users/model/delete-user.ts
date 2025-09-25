import type { UserId } from "../users.slice";
import { usersApi } from "../api";
import { store } from "../../../app/store";

export async function deleteUserAndGoToList(userId: UserId) {
  await store.dispatch(usersApi.endpoints.deleteUser.initiate(userId)).unwrap();
  await store.dispatch(
    usersApi.util.invalidateTags([{ type: "Users", id: "LIST" }])
  );
  window.history.pushState(null, "", "/users");
  window.dispatchEvent(new PopStateEvent("popstate"));
}
