import axios from "axios";
import { AuthorResponseType, AuthorsResponse } from "../types/authorsTypes";

export const getAuthors = async (page=1, name="", email="") => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const response = await axios.get<AuthorsResponse>(
      `http://api-crud-books.test/api/authors?page=${page}&name=${name}&email=${email}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return {
      authors: response.data.data,
      pagination: response.data.pagination,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message);
  }
};

export const storeAuthor = async (
  name: string,
  email: string,
  date: string
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const response = await axios.post<AuthorResponseType>(
      "http://api-crud-books.test/api/authors",
      {
        name,
        email,
        birthdate: date,
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

export const updateAuthor = async (
  id: number,
  name: string,
  email: string,
  date: string
) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const response = await axios.put<AuthorResponseType>(
      `http://api-crud-books.test/api/authors/${id}`,
      {
        name,
        email,
        birthdate: date,
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

export const deleteAuthor = async (id: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const response = await axios.delete<{message:string}>(
      `http://api-crud-books.test/api/authors/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data
  } catch (error:any) {
    throw new Error(error.response?.data?.message)
  }
};
