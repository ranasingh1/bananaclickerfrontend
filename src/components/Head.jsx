import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export const Head = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex h-16 mb-2  z-20 sticky top-0 max-w-full  bg-white">
     <Link to="/"><h1 className="text-bananaYellow-dark  font-bold p-4 text-2xl"> Banana Clicker</h1></Link>

      <button
        onClick={logout}
        className="absolute top-4 right-4  w-24  bg-bananaYellow-dark hover:bg-bananaYellow-light text-white hover:text-gray-600  font-bold py-2 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#528f9b]"
        aria-label="Logout"
      >
        Logout
      </button>
    </div>
  );
};
