import {bookRepository} from "../repositories/bookRepository"


export const bookService = {

    // แสดงหนังสือทั้งหมด
    async getAllBooksService()
    {
        return bookRepository.getAllBooksDB();
    },

    // แสดงหนังสือตามรายชื่อที่ค้นหา
    async searchByTitleService(title : string)
    {
        return bookRepository.searchByTitleDB(title);
    }
};