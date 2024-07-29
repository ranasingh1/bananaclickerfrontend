import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";
import UpdateUser from "./UserForm";
import { AuthContext } from "../../context/AuthContext";

const UserMangement = () => {
  const [users, setUsers] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState({});
  const [mode, setMode] = useState("");
  const { token } = useContext(AuthContext);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/getUsers`, );
      setUsers(response.data);
      setToggle(false);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleClose = () => {
    setToggle(false);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/deleteUser/${id}`, );
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const blockUser = async (userId) => {
    try {
      await axios.put(
        `${BASE_URL}/api/v1/blockUser/${userId}`,
        {},
      );
      fetchUsers();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const unblockUser = async (userId) => {
    try {
      await axios.put(
        `${BASE_URL}/api/v1/unblockUser/${userId}`,
        {},
      );
      fetchUsers();
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  return (
    <div className="relative container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">User Management</h1>
      <div className="flex justify-end">
        <button
          onClick={() => {
            setUser({});
            setMode("create");
            setToggle(true);
          }}
          className="bg-bananaYellow-dark hover:bg-bananaYellow-light hover:text-gray-600 m-4 p-2 rounded text-white font-bold"
        >
          Create User
        </button>
      </div>
      <table className="min-w-full bg-gray-800 text-yellow-400 border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Banana Clicks</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">{user.username}</td>
              <td className="py-2 px-4 border-b">{user.bananaClicks}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b uppercase">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => {
                    setUser(user);
                    setMode("update");
                    setToggle(true);
                  }}
                  className="px-2 py-1 bg-bananaYellow-dark hover:bg-bananaYellow-light hover:text-gray-600 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    user?.isBlocked
                      ? unblockUser(user._id)
                      : blockUser(user._id)
                  }
                  className={`px-2 py-1 ${
                    user.isBlocked ? "bg-green-500" : "bg-yellow-500"
                  } text-white rounded`}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
                <button
                  onClick={() => deleteUser(user._id)}
                  className="px-2 py-1 bg-red-500 ml-2 text-white rounded mr-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {toggle && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 max-w-lg relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
            <UpdateUser
              user={user}
              fetchUsers={fetchUsers}
              mode={mode}
              handleClose={handleClose}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMangement;
