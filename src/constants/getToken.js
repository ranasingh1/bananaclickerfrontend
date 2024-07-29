import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};