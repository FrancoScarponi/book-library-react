import styles from "./table.module.css";
import { MdDeleteForever } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { BookType } from "../../../types/booksTypes";
import { memo } from "react";

interface Props {
  data: BookType[];
  onEdit?: (row: BookType) => void;
  onDelete?: (id: number) => void;
}

export const Table = memo(({ data, onEdit, onDelete }: Props) => {

  return (
    <table className={styles.tabla}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Páginas</th>
          <th>Autor</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.pages}</td>
            <td>{row.author.name}</td>
            <td>
              <div className={styles.icons}>
                <MdDeleteForever
                  onClick={() => onDelete?.(row.id)}
                  size={25}
                  className={styles.icon}
                />
                <AiFillEdit
                  onClick={() => onEdit?.(row)}
                  className={styles.icon}
                  size={25}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
