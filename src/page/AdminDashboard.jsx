import React, { useState } from 'react';
import UserMangement from '../components/AdminDashboard/UserMangement';
import OnlineUsers from '../components/AdminDashboard/OnlineUsers';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('onlineUsers');

  return (
    <div className="p-6">
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setActiveTab('onlineUsers')}
          className={`px-4 py-2 mx-2 ${
            activeTab === 'onlineUsers'
              ? 'bg-bananaYellow-dark text-white border-b-2 border-bananaYellow-dark'
              : 'bg-bananaYellow-light text-gray-600'
          } rounded-t-lg focus:outline-none`}
        >
          Online Users
        </button>
        <button
          onClick={() => setActiveTab('userManagement')}
          className={`px-4 py-2 mx-2 ${
            activeTab === 'userManagement'
              ? 'bg-bananaYellow-dark text-white border-b-2 border-bananaYellow-dark'
              : 'bg-bananaYellow-light text-gray-600'
          } rounded-t-lg focus:outline-none`}
        >
          User Management
        </button>
      </div>
      <div className="bg-bananaYellow p-6 rounded-b-lg shadow-md">
        {activeTab === 'onlineUsers' && <OnlineUsers />}
        {activeTab === 'userManagement' && <UserMangement />}
      </div>
    </div>
  );
}

export default AdminDashboard;
