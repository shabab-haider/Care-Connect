import React, { useContext, useEffect } from "react";
import { UserDataContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const ProfileProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/sign-up");
    }
  }, [user]);
  return <>{children}</>;
};

export default ProfileProtectedWrapper;
