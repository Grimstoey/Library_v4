import { borrowRepository } from "../repositories/borrowRepository";

export const borrowService = {
  // แสดงหนังสือตามวันกำหนดคืน
  async getBooksDueOnDateService(date: Date, pageSize: number, pageNo: number) {
    return borrowRepository.getBooksDueOnDb(date, pageSize, pageNo);
  },

  // แสดงหนังสือที่ยังไม่ได้คืน
  async getUnreturnedBooksService(pageSize: number, pageNo: number) {
    return borrowRepository.getUnreturnedBooksDb(pageSize, pageNo);
  },
};
