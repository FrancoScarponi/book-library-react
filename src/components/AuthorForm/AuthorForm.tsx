import { memo, useEffect, useState } from "react";
import { Input } from "../input/Input";
import styles from "./authorform.module.css";
import { storeAuthor, updateAuthor } from "../../services/authorServices";
import { AuthorType } from "../../types/authorsTypes";
interface Props {
  author?:AuthorType|null;
  onSucces?: () => void;
}
export const AuthorForm: React.FC<Props> = memo(({author, onSucces,}) => {
  const [formData, setFormData] = useState<AuthorType>({
    id: author?.id || 0,
    name: author?.name || "",
    email: author?.email || "",
    birthdate: author?.birthdate || "",
  });
  const [errors,setErrors] = useState('');

  useEffect(() => {
    setFormData({
      id: author?.id || 0,
      name: author?.name || "",
      email: author?.email || "",
      birthdate: author?.birthdate || "",
    });
  }, [author]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await updateAuthor(formData.id, formData.name, formData.email, formData.birthdate);
      } else {
        await storeAuthor(formData.name, formData.email, formData.birthdate);
      }
      if (onSucces) onSucces(); 
    } catch (error: any) {
      setErrors(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formulario} action="">
      <Input
        value={formData.name}
        onChange={handleChange}
        name="name"
        label="Nombre"
      />
      <Input
        value={formData.email}
        onChange={handleChange}
        name="email"
        label="Email"
      />
      <Input
        value={formData.birthdate}
        onChange={handleChange}
        name="birthdate"
        type="date"
        label="Fecha de nacimiento"
      />
      <div>{errors}</div>
      <button type="submit">{author?.id ? "Actualizar" : "Agregar"}</button>
    </form>
  );
});
