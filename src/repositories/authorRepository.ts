import { prisma } from "../lib/prisma";

export const authorRepository = {
  // ดึงผู้แต่งทั้งหมด + pagination
  async getAllAuthorDb(
    pageSize: number = 10,
    pageNo: number = 1
  ) {
    const authors = await prisma.author.findMany({
      take: pageSize,
      skip: pageSize * (pageNo - 1),
      orderBy: { id: "asc" },
      include: {
        books: true,
      },
    });

    const totalCount = await prisma.author.count();

    return { authors, totalCount };
  },
};
