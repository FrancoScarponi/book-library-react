import { useCallback, useEffect, useState } from "react";
import { Table } from "../../components/Authors/Table/Table";
import { AuthorType } from "../../types/authorsTypes";
import { deleteAuthor, getAuthors } from "../../services/authorServices";
import styles from "./authors.module.css";
import { Modal } from "../../components/modal/Modal";
import { AuthorForm } from "../../components/AuthorForm/AuthorForm";
import { Pagination } from "../../components/Pagination/Pagination";
import { AuthorFilter } from "../../components/AuthorFilter/AuthorFilter";
import { PaginationType } from "../../types/globalTypes";

export const Authors = () => {
  const [authors, setAuthors] = useState<AuthorType[]>([]);
  const [editingAuthor, setEditingAuthor] = useState<AuthorType | null>();
  const [isOpen, setIsOpen] = useState(false);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter,setFilter] = useState({name:"",email:""});

  const loadAuthors = useCallback(async () => {
    try {
      console.log("nombre ",filter.name)
      const response = await getAuthors(currentPage,filter.name,filter.email);
      if (!response) return;
      setAuthors(response.authors);
      setPagination(response.pagination);
    } catch (error: any) {
      console.log(error.message);
    }
  }, [currentPage, filter]);

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await deleteAuthor(id);
        loadAuthors();
      } catch (error: any) {
        console.log(error.message);
      }
    },
    [loadAuthors]
  );

  const handleEdit =useCallback( (author: AuthorType) => {
    setEditingAuthor(author);
    setIsOpen(true);
  },[]);

  const handleSuccess = useCallback(() => {
    loadAuthors();
    setIsOpen(false);
  }, []);

  useEffect(() => {
    loadAuthors();
  }, [loadAuthors]);

  return (
    <div className={styles.principal}>
      <section className={styles.seccion}>
        <article className={styles.tableContainer}>
          <AuthorFilter setFilter={setFilter} />
          <div className={styles.table}>
            <div>
              <Table
                data={authors}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
              {pagination && (
                <Pagination
                  setCurrentPage={setCurrentPage}
                  pagination={pagination}
                />
              )}
            </div>
            <div>
              <button onClick={() => setIsOpen(true)}>Agregar autor</button>
            </div>
          </div>
        </article>
      </section>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditingAuthor(null);
        }}
      >
        <AuthorForm author={editingAuthor} onSucces={handleSuccess} />
      </Modal>
    </div>
  );
};
