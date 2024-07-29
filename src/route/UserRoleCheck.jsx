import React, { useContext, useEffect } from 'react';
import { getToken } from '../constants/getToken';

const UserRoleCheck = ({admin, user}) => {
  const token = getToken();

  useEffect(() => {
    if (!token) {
     alert("An Error Occured");   
      return;
    }
  }, [token]);

  
  return (
    <>
      {token?.role === 'admin' && admin}
      {token?.role === 'player' && user}
    </>
  );
};

export default UserRoleCheck;
