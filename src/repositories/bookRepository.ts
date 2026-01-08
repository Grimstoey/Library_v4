import {prisma} from "../lib/prisma";

export const bookRepository = {

    // ดึงหนังสือทั้งหมดมาจาก db
    async getAllBooksDB() {
        return prisma.book.findMany(
            {
                include: {author: true}
            }
        );
    },

    // ดึงหนังสือตามชื่อที่ระบุจาก db
    async searchByTitleDB(title: string)
    {
        return prisma.book.findMany(
            {
                where: {
                    title: {contains: title, mode: "insensitive"}
                },
                include: {
                    author: true
                }
            }
        );
    }
};