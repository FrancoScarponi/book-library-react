import { useState } from "react";
import { Input } from "../input/Input";
import styles from "./authorfilter.module.css";
type filter = {
  name:string,
  email:string
}
interface Props {
  setFilter:({}:filter)=>void;
}
export const AuthorFilter = ({ setFilter }: Props) => {
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");

  return (
    <div className={styles.filterContainer}>
      <Input
        style={{ padding: "10px " }}
        onChange={(e) => setNameFilter(e.target.value)}
        placeholder="Nombre"
      />
      <Input
        style={{ padding: "10px " }}
        onChange={(e) => setEmailFilter(e.target.value)}
        placeholder="Email"
      />
      <div>
        <button onClick={()=>setFilter({name:nameFilter,email:emailFilter})}>Filtrar</button>
      </div>
    </div>
  );
};
