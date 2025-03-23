import axios from "axios";
import { BookResponseType, BooksResponseType } from "../types/booksTypes";
import { apiUrlBooks } from "./apiURL";

export const getBooks = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await axios.get<BooksResponseType>(apiUrlBooks, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const storeBook = async (
  name: string,
  description: string,
  pages: number,
  author_id: number
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const response = await axios.post<BookResponseType>(
      apiUrlBooks,
      {
        name,
        description,
        pages,
        author_id,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const updateBook = async (
  id: number,
  name: string,
  description: string,
  pages: number,
  author_id: number
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const response = await axios.put<BookResponseType>(
      `${apiUrlBooks}/${id}`,
      {
        name,
        description,
        pages,
        author_id,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const deleteBook = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const response = await axios.delete(
      `${apiUrlBooks}/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};
