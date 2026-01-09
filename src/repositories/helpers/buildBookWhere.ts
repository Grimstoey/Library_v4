import { Prisma } from "../../generated/prisma/client";
import { BookSearchQuery } from "../../types/book-search.type";

export function buildBookWhere(
  query: BookSearchQuery
): Prisma.BookWhereInput {

  const andConditions: Prisma.BookWhereInput[] = [];

  // 🔍 ชื่อหนังสือ
  if (query.title) {
    andConditions.push({
      title: {
        contains: query.title,
        mode: "insensitive",
      },
    });
  }

  // 🔍 หมวดหนังสือ
  if (query.category) {
    andConditions.push({
      category: {
        contains: query.category,
        mode: "insensitive",
      },
    });
  }

  // 🔍 ผู้แต่ง
  if (query.author) {
    andConditions.push({
      author: {
        is: {
          OR: [
            {
              firstName: {
                contains: query.author,
                mode: "insensitive",
              },
            },
            {
              lastName: {
                contains: query.author,
                mode: "insensitive",
              },
            },
          ],
        },
      },
    });
  }

  // 🔍 สมาชิกที่เคยยืม
  if (query.member) {
    andConditions.push({
      borrowItems: {
        some: {
          borrow: {
            member: {
              OR: [
                {
                  firstName: {
                    contains: query.member,
                    mode: "insensitive",
                  },
                },
                {
                  lastName: {
                    contains: query.member,
                    mode: "insensitive",
                  },
                },
              ],
            },
          },
        },
      },
    });
  }

  // 🔍 keyword รวม (fallback)
  if (query.keyword) {
    andConditions.push({
      OR: [
        { title: { contains: query.keyword, mode: "insensitive" } },
        { category: { contains: query.keyword, mode: "insensitive" } },
      ],
    });
  }

  // ไม่มีเงื่อนไข → ไม่ filter
  if (andConditions.length === 0) {
    return {};
  }

  return {
    AND: andConditions,
  };
}
