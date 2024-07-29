import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/constant";
import { getToken } from "../constants/getToken";
import { io } from "socket.io-client";

const socket = io(BASE_URL);

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: getToken() });
  const [isBlocked, setIsBlocked] = useState(false);

  const fetchUserRole = async () => {
    try {
      const role = getToken();
      if (role) {
        setAuth({ user: { role } });
      } else {
        setAuth({ user: null });
      }
    } catch (err) {
      console.error("Failed to fetch user role:", err);
      setAuth({ user: null });
    }
  };

 const getUser = async ()=>{
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/getUser/${auth.user.id}`)
    const data = response.data;
    setIsBlocked(data.isBlocked)
  } catch (err) {
    console.log(err);
  }
 }

  useEffect(() => {
    fetchUserRole();
    getUser();
  }, []);

  
  const login = async (username, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/login`,
        { username, password },
        { withCredentials: true }
      );
      fetchUserRole();
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    const token = getToken();
    if (token?.username) {
      socket.emit('userOffline', token?.username);
    }
    await axios.post(
      `${BASE_URL}/api/v1/logout`,
      {},
      { withCredentials: true }
    );
    setAuth({ user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, isBlocked }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
