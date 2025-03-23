import { memo } from "react";
import { PaginationType } from "../../types/globalTypes"
import styles from './pagination.module.css'
interface Props{
  pagination:PaginationType;
  setCurrentPage:(page:number)=>void
}

export const Pagination:React.FC<Props> = memo(({pagination,setCurrentPage}) => {
  return (
    <div className={styles.container}>
      <button onClick={()=>setCurrentPage(pagination.meta.current_page-1)} disabled={pagination.meta.current_page == 1}>Anterior</button>
      <button onClick={()=>setCurrentPage(pagination.meta.current_page+1)} disabled={pagination.meta.current_page == pagination.meta.last_page}>Siguiente</button>
    </div>
  )
})
