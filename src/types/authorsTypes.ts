import { PaginationType } from "./globalTypes";

export interface AuthorType {
  id: number;
  name: string;
  email: string;
  birthdate: string;
}

export interface AuthorResponseType {
  message: string;
  data: AuthorType;
}

export interface AuthorsResponse {
  message: string;
  data: AuthorType[];
  pagination: PaginationType;
}
