import { memo, useMemo, useState } from "react";
import type { User } from "./users.slice";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./api";

export default function UsersList() {
  const [sortType, setSortType] = useState<"asc" | "desc">("asc");
  const { data: users, isLoading } = useGetUsersQuery();

  const sortedUsers = useMemo(() => {
    return [...(users ?? [])].sort((a, b) =>
      sortType === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }, [users, sortType]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-between">
        <div className="flex flex-row items-center">
          <button
            onClick={() => setSortType("asc")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Asc
          </button>
          <button
            onClick={() => setSortType("desc")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2"
          >
            Desc
          </button>
        </div>
        <ul className="list-none">
          {sortedUsers.map((user) => (
            <UserListItem user={user} key={user.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

const UserListItem = memo(function UserListItem({ user }: { user: User }) {
  const navigate = useNavigate();
  const handleUserClick = () => {
    navigate(user.id, { relative: "path" });
  };
  return (
    <li className="py-2" onClick={handleUserClick}>
      <span className="hover:underline cursor-pointer">{user.name}</span>
    </li>
  );
});
