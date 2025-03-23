import styles from "./signup.module.css";
import { Input } from "../../components/input/Input";
import { useContext, useState } from "react";
import { signUp } from "../../services/authServices";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");
  const { storeUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await signUp(name, email, password, confirmation);
      if (!userData) return;
      storeUser(userData);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };
  return (
    <section className={styles.mainContainer}>
      <form onSubmit={handleSubmit} action="" className={styles.formulario}>
        <div className={styles.inputs}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Nombre completo"
            placeholder="Ejemplo"
          />
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
          <Input
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            label="Confirmar contrasena"
            type="password"
            placeholder="*******"
          />
          {error && <p>{error}</p>}
          <button>Registrarse</button>
        </div>
      </form>
    </section>
  );
};
