import { borrowRepository } from "../repositories/borrowRepository";

export const borrowService = {

    // แสดงหนังสือตามวันกำหนดคืน
  async getBooksDueOnDateService(date: Date) {
    return borrowRepository.getBooksDueOnDb(date);
  },

    // แสดงหนังสือที่ยังไม่ได้คืน
  async getUnreturnedBooksService() {
    return borrowRepository.getUnreturnedBooksDb();
  },
};
