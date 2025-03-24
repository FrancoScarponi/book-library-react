import axios from "axios";
import { BookResponseType, BooksResponseType } from "../types/booksTypes";
const API_URL = import.meta.env.VITE_API_URL

export const getBooks = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await axios.get<BooksResponseType>(`${API_URL}/books`, {
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
      `${API_URL}/books`,
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
      `${API_URL}/books/${id}`,
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
      `${API_URL}/books/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};
