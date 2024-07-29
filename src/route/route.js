import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login";
import ProtectedRoute from "./ProtectedRoute";
import UserDashboard from "../page/UserDahboard";
import AdminDashboard from "../page/AdminDashboard";
import RankPage from "../page/RankPage";
import UserRoleCheck from "./UserRoleCheck";
import Layout from "../Layout/Layout";

const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    
    {
      path: "/",
      element: <ProtectedRoute children={<Layout/>}/>,
      children: [
        {
          path: "/",
          element: <UserRoleCheck admin={<AdminDashboard/>} user= {<UserDashboard/>} />
        },
        {
          path:"/rankings",
          element:<RankPage/>
        }
      ],
    },
  ]);
  
  export default router;