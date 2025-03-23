import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

export const Dashboard = () => {
  const {user} = useContext(AuthContext)
  return <div>
    <h1>Bienvenido {user?.name}!</h1>

  </div>;
};
