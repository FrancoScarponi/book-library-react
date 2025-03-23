import React, { memo, useCallback, useEffect, useState } from "react";
import { BookType, SumaryBookType } from "../../../types/booksTypes";
import { storeBook, updateBook } from "../../../services/bookServices";
import styles from "./booksform.module.css";
import { Input } from "../../input/Input";
import { SelectAuthor } from "../Select/SelectAuthor";
import { useMemo } from "react";

interface Props {
  book?: BookType | null;
  onSucces?: () => void;
}

export const BooksForm: React.FC<Props> = memo(({ book, onSucces }) => {
  const [authorId, setAuthorId] = useState<number>(book?.author.id || 0);

  const initialFormData = useMemo(() => ({
    id: book?.id || 0,
    name: book?.name || "",
    description: book?.description || "",
    pages: book?.pages || 0,
  }), [book]);
  
  const [formData, setFormData] = useState<SumaryBookType>(initialFormData);
  
  const [errors, setErrors] = useState("");

  useEffect(() => {
    setFormData({
      id: book?.id || 0,
      name: book?.name || "",
      description: book?.description || "",
      pages: book?.pages || 0,
    });
  }, [book]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }, []);
  

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(authorId);
      if (formData.id) {
        await updateBook(
          formData.id,
          formData.name,
          formData.description,
          formData.pages,
          authorId
        );
      } else {
        await storeBook(
          formData.name,
          formData.description,
          formData.pages,
          authorId
        );
      }
      if (onSucces) onSucces();
    } catch (error: any) {
      setErrors(error.message);
    }
  },[])

  return (
    <form onSubmit={handleSubmit} className={styles.formulario} action="">
      <Input
        value={formData.name}
        onChange={handleChange}
        name="name"
        label="Nombre"
      />
      
      <Input
        value={formData.pages == 0 ? "" :formData.pages }
        onChange={handleChange}
        name="pages"
        type="number"
        label="Paginas"
      />
      <SelectAuthor authorId={authorId} setAuthorId={setAuthorId}/>
      <div className={styles.description}>
        <label htmlFor="description">Descripcion</label>
        <textarea value={formData.description} onChange={handleChange}  name="description" id="description"></textarea>
      </div>
      <div>{errors}</div>
      <button type="submit">{book?.id ? "Actualizar" : "Agregar"}</button>
    </form>
  );
});
