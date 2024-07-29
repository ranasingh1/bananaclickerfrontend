import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { BASE_URL } from '../constants/constant';

const socket = io(BASE_URL);

const RankPage = () => {
  const [rankings, setRankings] = useState([]);
  console.log(rankings);

  useEffect(() => {
    socket.emit('getInitialRankings');

    socket.on('initialRankings', (initialRankings) => {
      setRankings(initialRankings);
    });

    socket.on('updateRankings', (updatedRankings) => {
      setRankings(updatedRankings);
    });

    return () => {
      socket.off('initialRankings');
      socket.off('updateRankings');
    };
  }, []);

  return (
    <div className="min-h-screen bg-bananaYellow-light p-6 flex flex-col items-center">
      <div className="bg-bananaYellow p-6 rounded-lg shadow-md mb-12 w-full mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Live Rankings</h1>
        <div className="w-2/3 mx-auto mb-4">
          <div className="flex justify-between bg-yellow-500 text-white text-xl font-semibold rounded-t-lg p-4 shadow-md">
            <span>Username</span>
            <span>Banana Clicks</span>
          </div>
        </div>
        <ul className="flex flex-col items-center w-2/3 mx-auto">
          {rankings.length ? (
            rankings.map((user, index) => (
              <li
                key={index}
                className="border-t border-l border-r border-gray-300 bg-gray-800 text-yellow-400 text-lg font-medium p-4 w-full flex justify-between hover:bg-gray-700 hover:text-yellow-300 transition duration-200 ease-in-out rounded-b-lg first:rounded-t-lg"
              >
                <span>{user?.username}</span>
                <span>{user?.bananaClicks}</span>
              </li>
            ))
          ) : (
            <li className="text-gray-600">No rankings available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RankPage;
