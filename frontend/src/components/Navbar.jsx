import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout, user } = useContext(AuthContext);

  return (
    <div className="bg-white shadow px-8 py-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">ticktock</h1>

      <div className="flex items-center gap-4">
        <span>{user?.email}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
