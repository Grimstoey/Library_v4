import { prisma } from "../lib/prisma";
import { buildBookWhere } from "./helpers/buildBookWhere";
import { BookSearchQuery } from "../types/book-search.type";

export const bookRepository = {
  async searchBooksDb(
    query: BookSearchQuery,
    pageSize: number = 10,
    pageNo: number = 1
  ) {
    // 🔹 build where จาก query object
    const whereCondition = buildBookWhere(query);

    const books = await prisma.book.findMany({
      where: whereCondition,
      take: pageSize,
      skip: pageSize * (pageNo - 1),
      orderBy: { id: "asc" },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
        borrowItems: {
          include: {
            borrow: {
              include: {
                member: {
                  select: {
                    firstName: true,
                    lastName: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // 🔹 map ให้ได้ชื่อผู้เคยยืม
    const booksWithBorrowers = books.map((book) => ({
      id: book.id,
      title: book.title,
      isbn: book.isbn,
      category: book.category,
      author: book.author,
      borrowers: book.borrowItems.map(
        (b) => `${b.borrow.member.firstName} ${b.borrow.member.lastName}`
      ),
    }));

    return { books: booksWithBorrowers };
  },
};
