import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DoctorDataContext } from "../../Context/DoctorContext";

const DoctorProtectedWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/doctors/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(async (res) => {
          setLoading(false);
          const id = res.data.doctor._id;
          const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/doctors/${id}/availability`
          );
          console.log(response);
        })
        .catch((err) => {
          navigate("/login");
        });
    }
  }, [token]);
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return <>{children}</>;
  }
};

export default DoctorProtectedWrapper;
