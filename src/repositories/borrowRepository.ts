import { prisma } from "../lib/prisma";
import { getDayRange } from "../utils/dateRangeUtils";

export const borrowRepository = {

  // ดึงข้อมูลด้วยวันกำหนดคืนจาก db
  async getBooksDueOnDb(date: Date) {
    const { startOfDay, startOfNextDay } = getDayRange(date);

    return prisma.borrowItem.findMany({
      where: {
        returnedAt: null,
        dueDate: {
          //dueDate ตั้งแต่ต้นวันนี้ จนถึงก่อนวันพรุ่งนี้จะเริ่ม
          gte: startOfDay, // >=
          lt: startOfNextDay, // <
        },
      },
      include: {
        book: true,
        borrow: {
          include: {
            member: true,
          },
        },
      },
    });
  },

  // ดึงหนังสือที่ยังไม่ได้คืนจาก db
  async getUnreturnedBooksDb() {
    return prisma.borrowItem.findMany({
      where: { returnedAt: null },
      include: {
        book: { include: { author: true } },
        borrow: { include: { member: true } },
      },
    });
  }

};

/*
    const { startOfDay, startOfNextDay } = getDayRange(date);

    👉 มันเอาค่าที่ได้จาก getDayRange(date)
        ใส่ตามชื่อ key ที่ตรงกันพอดี เป็น property lookup ตามชื่อ
        เลยไม่เอาไปใส่คีย์อื่น ไม่ใส่มั่วแน่นอน

        JavaScript จะทำ ตามลำดับนี้เป๊ะ ๆ

            1.เรียก getDayRange(date)

            2.ได้ object กลับมา 1 ตัว

                return { startOfDay, startOfNextDay };

                ผลลัพธ์คือ object แบบนี้:

                    {
                        startOfDay: Date,        // 2026-01-10 00:00:00
                        startOfNextDay: Date,    // 2026-01-11 00:00:00
                    }

            3.มองหา key ชื่อ startOfDay

            4.เจอ → เอาค่านั้นมาใส่ในตัวแปร startOfDay

            5.มองหา key ชื่อ startOfNextDay

            6.เจอ → เอาค่านั้นมาใส่ในตัวแปร startOfNextDay
    

    เขียนแบบนี้ทำงานเหมือนกันเป๊ะ ดูชัดเจน เข้าใจ แต่ยาวกว่า
    const tmp = getDayRange(date);

    const startOfDay = tmp.startOfDay;
    const startOfNextDay = tmp.startOfNextDay;

*/
