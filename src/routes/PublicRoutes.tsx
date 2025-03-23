import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

export const PublicRoutes = () => {
  const { user } = useContext(AuthContext);
  const lastPath = localStorage.getItem("lastPath");
  
  return user ? <Navigate to={lastPath?lastPath:"/dashboard"}/>: <Outlet /> ;
};
