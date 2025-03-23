import { createContext, useState } from "react";
import { UserType } from "../types/userTypes";
interface AuthContextType {
  loading: boolean,
  changeLoading:(isLoading:boolean)=>void,
  user: UserType | null;
  storeUser: (user: UserType) => void;
  removeUser: () => void;
}

const defaultAuthContext: AuthContextType = {
  loading:false,
  changeLoading:()=>{},
  user: null,
  storeUser: () => {},
  removeUser: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface Props {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading,setLoading] = useState(false)
  const storeUser = (user: UserType) => {
    setUser(user);
  };
  const removeUser = () => {
    setUser(null);
  };
  const changeLoading = (isLoading:boolean)=>{
    setLoading(isLoading)
  }
  return (
    <AuthContext.Provider value={{loading,changeLoading, user, storeUser, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
