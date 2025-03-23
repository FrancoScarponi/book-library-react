import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider';

export const PrivatesRoutes = () => {
  const {user} = useContext(AuthContext);
  return user ? <Outlet/> : <Navigate to={'/login'}/> ;
}
