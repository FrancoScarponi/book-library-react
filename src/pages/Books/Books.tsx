import { useCallback, useEffect, useState } from "react";
import { Table } from "../../components/Books/Table/Table";
import { deleteBook, getBooks } from "../../services/bookServices";
import { BookType } from "../../types/booksTypes";
import { Modal } from "../../components/modal/Modal";
import { BooksForm } from "../../components/Books/Form/BooksForm";
import styles from "./books.module.css";
import { BookFilter } from "../../components/Books/Filter/BookFilter";

export const Books = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [modal, setModal] = useState(false);
  const [editingBook, setEditingBook] = useState<BookType | null>(null);
  
  const loadBooks = useCallback(async () => {
    try {
      const data = await getBooks();
      if (!data) return;
      setBooks(data.data);
    } catch (error: any) {
      console.error(error.message)
    }
  },[]);

  const handleDelete = useCallback(async (id: number) => {
    try {
      await deleteBook(id);
      loadBooks();
    } catch (error) {
      console.log(error);
    }
  },[])

  const editBook = useCallback((book: BookType) => {
    setEditingBook(book);
    setModal(true);
  },[])

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  return (
    <div className={styles.principal}>
      <section className={styles.filterContainer}>
        <BookFilter />
        <div className={styles.auxContainer}>
          <article className={styles.tableContainer}>
            <div className={styles.table}>
              <Table data={books} onDelete={handleDelete} onEdit={editBook} />
            </div>
            <div className={styles.pagination}>
              <button>Anterior</button>
              <button>Siguiente</button>
            </div>
          </article>
          <div>
            <button onClick={() => setModal(true)}>Agregar libro</button>
          </div>
        </div>
      </section>

      
      <Modal isOpen={modal} onClose={() => {setEditingBook(null);setModal(false);}}>
        <BooksForm
          book={editingBook}
          onSucces={() => {
            setModal(false);
            loadBooks();
            
          }}
        />
      </Modal>
    </div>
  );
};
