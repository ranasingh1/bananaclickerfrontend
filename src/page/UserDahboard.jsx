import React, { useContext, useEffect, useState } from "react";
import { banana, BASE_URL } from "../constants/constant";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { getToken } from "../constants/getToken";
import { AuthContext } from "../context/AuthContext";

const socket = io(BASE_URL);

const UserDashboard = () => {
  const [count, setCount] = useState(0);
  const [showIncrement, setShowIncrement] = useState(false);
  const {isBlocked} = useContext(AuthContext);
  const token = getToken();

  useEffect(() => {
    if (token?.username) {
      socket.emit('userOnline', token?.username);

      socket.on('initialCount', (initialCount) => {
        setCount(initialCount);
      });

      socket.on('updateCount', (updatedCount) => {
        setCount(updatedCount);
      });

      socket.emit('getInitialCount', { username: token?.username });
    }

    return () => {
      socket.emit('userOffline');
      socket.off('initialCount');
      socket.off('updateCount');
    };
  }, [token?.username]);
 

  const handleClick = () => {
    socket.emit('bananaClick', { username: token?.username });
    setShowIncrement(true);
    setTimeout(() => {
      setShowIncrement(false);
    }, 1000);
  };

  if(isBlocked){
    return <div className="w-full text-center text-3xl text-red-600 ">You are Blocked!</div>
  }

  return (
    <div className="min-h-screen bg-bananaYellow  p-6 relative flex flex-col items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg mb-12 w-full mx-auto transition-transform duration-500">
        <div className="text-center mt-4 flex justify-between text-2xl font-bold text-gray-800 ">
          <h1 className="border-black border-2 w-fit p-2 text-center rounded bg-yellow-500"> Banana Count: {count}</h1>
          <Link to="/rankings">
            <button className="border-black border-2 w-fit p-2 text-center rounded bg-yellow-500">Live Ranking</button>
          </Link>
        </div>
        <div className="relative w-full items-center flex justify-center">
          <button onClick={handleClick} className="focus:outline-none">
            <img src={banana} alt="Banana" className=" bg-inherit w-[30rem]" />
          </button>
          {showIncrement && (
            <div className="absolute top-0 transform -translate-x-1/2 text-[5rem] font-bold text-yellow-500 animate-fade-out">
              +1
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
