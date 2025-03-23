import styles from "./home.module.css";
import ilustracion from "../../assets/book-lover-25.svg";
import { Link } from "react-router-dom";
export const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.content}>
        <img src={ilustracion} alt="" />
        <div>
          <h1>Econtra tu libro favorito</h1>
          <p>Busca en nuestro catalogo tus libros preferidos.</p>
          <Link className={styles.link} to={"/login"}>
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
};
