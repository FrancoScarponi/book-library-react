import { useEffect, useState } from "react";
import { getAuthors } from "../../../services/authorServices";
import { AuthorType } from "../../../types/authorsTypes";
import styles from "./selectauthor.module.css";

interface Props {
  authorId?: number | null;
  setAuthorId: (id:number)=>void
}

export const SelectAuthor = ({ authorId , setAuthorId}: Props) => {
  const [authors, setAuthors] = useState<AuthorType[]>([]);

  useEffect(() => {
    const loadAuthors = async () => {
      try {
        const data = await getAuthors();
        if (!data) return;
        setAuthors(data.authors);
      } catch (error) {
        console.log(error);
      }
    };
    loadAuthors();
  }, []);

  return (
    <div className={styles.selectContainer}>
      <label htmlFor="author">Autor</label>
      <select
        value={authorId ? authorId : ""}
        className={styles.select}
        name="author"
        onChange={(e)=>{setAuthorId(parseInt(e.target.value))}}
      >
        <option value="" disabled hidden>
          Seleccione un author
        </option>
        {authors.map((author) => (
          <option key={author.id} value={author.id}>{author.name}</option>
        ))}
      </select>
    </div>
  );
};
