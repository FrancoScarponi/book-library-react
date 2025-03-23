import { AuthorType } from "./authorsTypes";
import { PaginationType } from "./globalTypes";

export interface BookType {
  id: number;
  name: string;
  description: string;
  pages: number;
  author: AuthorType;
}

export type SumaryBookType = Omit<BookType,'author'>

export interface BookResponseType{
    message:string;
    data: BookType;
}

export interface BooksResponseType {
    message:string;
    data: BookType[];
    pagination: PaginationType;
}
