import styles from './bookfilter.module.css'
import { Input } from '../../input/Input'
import { memo } from 'react';
export const BookFilter = memo(() => {
  return (
    <div className={styles.filterContainer}>
      <Input style={{ padding:"10px " }} placeholder="Nombre" />
      <Input style={{ padding:"10px " }} placeholder="Autor" />
      <div>
        <button>Filtrar</button>
      </div>
    </div>
  )
});
