import React, { useState, useEffect } from "react";
import FormInput from "../FormInput";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";

const UserForm = ({ user, fetchUsers, mode, handleClose }) => {
  const [userForm, setUserForm] = useState({
    username: "",
    password: "",
    role: "",
    email: "",
    isBlocked: false,
  });

  useEffect(() => {
    if (mode === "update" && user) {
      setUserForm({
        username: user.username,
        password: user.password,
        role: user.role,
        email: user.email,
        isBlocked: user.isBlocked,
      });
    }
  }, [mode, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({
      ...userForm,
      [name]: value === "true" ? true : value === "false" ? false : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === "create") {
      await createUser();
    } else {
      await updateUser(user._id);
    }

    setUserForm({
      username: "",
      password: "",
      role: "",
      email: "",
      isBlocked: false,
    });
    fetchUsers();
    handleClose();
  };

  const createUser = async () => {
    try {
      await axios.post(`${BASE_URL}/api/v1/createUser`, userForm, );
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const updateUser = async (id) => {
    try {
      await axios.put(`${BASE_URL}/api/v1/updateUser/${id}`, userForm, );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
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
        {/* Form Header */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === "create" ? "Create User" : "Update User"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Username"
              type="text"
              name="username"
              value={userForm.username}
              onChange={handleInputChange}
              placeholder="Enter username"
              required
            />
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={userForm.password}
              onChange={handleInputChange}
              placeholder="Enter password"
              required
            />
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={userForm.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              required
            />
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="role" className="block text-gray-700 mb-2">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={userForm.role}
                onChange={handleInputChange}
                className="block w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="" disabled>
                  Select role
                </option>
                <option value="admin">Admin</option>
                <option value="player">Player</option>
              </select>
            </div>
            {/* Optional Blocked Section */}
            {/* Uncomment if needed */}
            {/* {mode === "update" && (
              <div className="col-span-1 md:col-span-2 flex items-center space-x-4">
                <label className="text-gray-700">Blocked:</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="isBlocked"
                      value={true}
                      checked={userForm.isBlocked === true}
                      onChange={handleInputChange}
                      className="form-radio text-bananaYellow-dark"
                    />
                    <span>Yes</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="isBlocked"
                      value={false}
                      checked={userForm.isBlocked === false}
                      onChange={handleInputChange}
                      className="form-radio text-bananaYellow-dark"
                    />
                    <span>No</span>
                  </label>
                </div>
              </div>
            )} */}
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-bananaYellow-dark hover:bg-bananaYellow-light text-white rounded"
            >
              {mode === "create" ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
