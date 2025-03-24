import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "../pages/Login/Login";
import { Home } from "../pages/Home/Home";
import { HomeLayout } from "../layout/homeLayout/HomeLayout";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { PrivatesRoutes } from "./PrivatesRoutes";
import { useCheckAuth } from "../hooks/useCheckAuth";
import { AuthLayout } from "../layout/AuthLayout/AuthLayout";
import { memo, useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { SignUp } from "../pages/SignUp/SignUp";
import { Authors } from "../pages/Authors/Authors";
import { Books } from "../pages/Books/Books";
import { PublicRoutes } from "./PublicRoutes";
import { Loader } from "../components/Loader/Loader";

export const AppRoute = memo(() => {  
  const { user, loading } = useContext(AuthContext);

  useCheckAuth();
  
  //para guardar la ultima ruta visitada por si refresca.
  const location = useLocation();
  useEffect(() => {
    if (user && location.pathname !== '/' && localStorage.getItem("lastPath") !== location.pathname) {
      localStorage.setItem("lastPath", location.pathname);
    }
  }, [location.pathname, user]);

  if (loading) {
    return <Loader/>;
  }
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
        <Route element={<PublicRoutes />}>
          <Route
            path="/login"
            element={user ? <Navigate to={"/dashboard"} /> : <Login />}
          />
        </Route>
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route element={<PrivatesRoutes />}>
        <Route element={<AuthLayout />}>
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
});
