import { useNavigate, useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { useDeleteUserMutation, useGetUserQuery } from "./api";

export default function UserInfo() {
  const navigate = useNavigate();
  const { userId = "" } = useParams<{ userId: string }>();

  const { data: user, isLoading: isLoadingUser } = useGetUserQuery(
    userId ? userId : skipToken
  );
  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();

  const handleBackButtonClick = () => {
    navigate("..", { relative: "path" });
  };

  const handleDeleteButtonClick = async () => {
    if (!userId) return;
    try {
      await deleteUser(userId).unwrap();
      navigate("..", { relative: "path" });
    } catch {
      // TODO
    }
  };

  if (isLoadingUser || !user) {
    return (
      <div className="flex flex-col items-center">
        <button
          onClick={handleBackButtonClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
        >
          Back
        </button>
        <h2 className="text-2xl">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={handleBackButtonClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md"
      >
        Back
      </button>
      <h2 className="text-3xl">{user.name}</h2>
      <p className="text-xl">{user.description}</p>
      <button
        onClick={handleDeleteButtonClick}
        disabled={isLoadingDelete}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded md mt-4 disabled:opacity-60"
      >
        Delete
      </button>
    </div>
  );
}
