import React, { useContext } from "react";
import AuthContext from "../context/authContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? <Outlet /> : <Navigate to={"/api/auth/login"} />;
}

export default ProtectedRoutes;
