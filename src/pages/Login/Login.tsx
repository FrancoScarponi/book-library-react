import { useContext, useState } from "react";
import { Input } from "../../components/input/Input";
import styles from "./login.module.css";
import { login } from "../../services/authServices";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { Loader } from "../../components/Loader/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { storeUser } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = await login(email, password);
      if (!userData) return;
      storeUser(userData);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.mainContainer}>
      <form action="" className={styles.formulario}>
        <div className={styles.inputs}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="ejemplo@gmail.com"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Contrasena"
            type="password"
            placeholder="*******"
          />
          {error && <div>{error}</div>}
          <button className={styles.btnEnviar} onClick={(e) => handleLogin(e)}>{loading?<Loader/>:"Iniciar"}</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
