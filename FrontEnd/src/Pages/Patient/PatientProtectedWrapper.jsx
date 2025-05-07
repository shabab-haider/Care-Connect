import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../../Context/UserContext";

const PatientProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useState(useContext(UserDataContext));
  console.log(user);
  useEffect(() => {
    if (!token) {
      navigate("/sign-in");
    } else {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/patients/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setLoading(false);
        })
        .catch((err) => {
          navigate("/sign-in");
        });
    }
  }, [token]);
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return <>{children}</>;
  }
};

export default PatientProtectedWrapper;
