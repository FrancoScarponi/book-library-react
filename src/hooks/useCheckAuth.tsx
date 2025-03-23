import { useContext, useEffect } from "react";
import { checkAuth } from "../services/authServices";
import AuthContext from "../context/AuthProvider";

export const useCheckAuth = () => {
  const { storeUser, removeUser,changeLoading } = useContext(AuthContext);
  useEffect(() => {
    const fetchAuth = async () => {
      try {
        changeLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          changeLoading(false)
          removeUser();
          return;
        }

        const userData = await checkAuth();
        if (!userData) {
          return;
        }
        storeUser(userData);
        
      } catch {
        removeUser();
      } finally {
        changeLoading(false)
      }
    };

    fetchAuth();
  }, []);

};
