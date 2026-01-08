import { authorRepository } from "../repositories/authorRepository";

export const authorService = {

    //แสดงนักเขียนทั้งหมด
    async getAllAuthorsService()
    {
        return authorRepository.getAllAuthorDb();
    }
};