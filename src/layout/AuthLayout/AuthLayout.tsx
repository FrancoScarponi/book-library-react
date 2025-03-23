import { Outlet, useNavigate } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
import styles from "./authlayout.module.css";
import { IoLogOut } from "react-icons/io5";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

export const AuthLayout = () => {
  const navigate = useNavigate();
  const {removeUser} = useContext(AuthContext)
  const handleLogout = ()=>{
    navigate('/');
    setTimeout(()=>{
      removeUser();
    },100)
    localStorage.removeItem('token');
    localStorage.removeItem('lastPath');
    
  }
  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div onClick={() => navigate("/dashboard")} className={styles.logoContainer}>
            <FaBookOpen size={40} />
            <span>BOOKS</span>
          </div>
          <div className={styles.linksContainer}>
            <button onClick={()=>navigate('/authors')}>Autores</button>
            <button onClick={()=>navigate('/books')}>Libros</button>
          </div>
          <div className={styles.userContainer}>
            <IoLogOut size={30} onClick={handleLogout}/>
          </div>
        </div>
      </nav>
      <main className={styles.principal}>
        <Outlet />
      </main>
    </div>
  );
};
