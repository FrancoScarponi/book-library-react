import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./homelayout.module.css";
import { FaBookOpen } from "react-icons/fa";


export const HomeLayout = () => {
  const location = useLocation()
  const navigate = useNavigate();
  return (
    <div className={styles.layout}>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div onClick={()=>navigate('/')} className={styles.logoContainer}>
            <FaBookOpen size={40}/>
            <span>BOOKS</span>
          </div>
          <div className={styles.linksContainer}>
            {location.pathname != '/login' && <Link className={styles.link} to={"/login"}>Iniciar Sesion</Link>}
            {location.pathname != '/signup' && <Link className={styles.link} to={"/signup"}>Registrarse</Link>}
          </div>
        </div>
      </nav>
      <main className={styles.principal}>
        <Outlet />
      </main>
    </div>
  );
};
