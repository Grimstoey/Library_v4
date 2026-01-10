import { authorRepository } from "../repositories/authorRepository";

export const authorService = {
  // แสดงนักเขียนทั้งหมด + pagination
  async getAllAuthorsService(
    pageSize: number,
    pageNo: number
  ) {
    return authorRepository.getAllAuthorDb(
      pageSize,
      pageNo
    );
  },
};
