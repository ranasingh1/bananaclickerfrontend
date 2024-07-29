import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { BASE_URL } from "../../constants/constant";


const OnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const socket = io(BASE_URL);

    socket.on('get-users', (users) => {
      setOnlineUsers(users);
    });
    console.log('yes');

    return () => {
      console.log('no');
      socket.off('get-users');
    };
  }, []);

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Online Users</h1>
      <div className="w-2/3 mx-auto mb-4">
        <div className="flex justify-between bg-yellow-500 text-white text-xl font-semibold  p-4 shadow-md">
          <span>Username</span>
          <span>Banana Clicks</span>
        </div>
      </div>
      <ul className="flex flex-col items-center w-2/3 mx-auto">
        {onlineUsers.map((user, index) => (
          <li
            key={index}
            className="border-t border-l border-r border-gray-300 bg-gray-800 text-yellow-400 text-lg font-medium p-4 w-full flex justify-between hover:bg-gray-700 hover:text-yellow-300 transition duration-200 ease-in-out"
          >
            <span>{user?.username}</span>
            <span>{user?.bananaClicks}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OnlineUsers;
