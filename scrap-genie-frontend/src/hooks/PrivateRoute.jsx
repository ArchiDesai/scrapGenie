import React, { useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
  const [authState, setAuthState] = useState({ isLoggedin: false, role: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");
    if (id) {
      setAuthState({ isLoggedin: true }, role);
    }
    setLoading(false);
  }, []);

  return { ...authState, loading };
};

const PrivateRoute = () => {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }

  return auth.isLoggedin?<Outlet/>:<Navigate to={"/login"}/>
};

export default PrivateRoute;
