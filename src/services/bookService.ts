import { bookRepository } from "../repositories/bookRepository";
import { BookSearchQuery } from "../types/book-search.type";

export const bookService = {

  /*
    ค้นหาหนังสือ (รองรับทุกเงื่อนไข)
    - title
    - category
    - author
    - member
    - keyword
   */
  async searchBooksService(
    query: BookSearchQuery,
    pageSize: number = 10,
    pageNo: number = 1
  ) {
    return bookRepository.searchBooksDb(query, pageSize, pageNo);
  },

};
