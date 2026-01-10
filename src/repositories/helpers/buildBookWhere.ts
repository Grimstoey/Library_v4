import { Prisma } from "../../generated/prisma/client";
import { BookSearchQuery } from "../../types/book-search.type";


/* ไฟล์นี้ทำหน้าที่ สร้าง object สำหรับ Prisma .findMany({ where: ... })

    👉 มันไม่ได้ query database เอง
    👉 มันแค่ "ประกอบเงื่อนไขการค้นหา" ให้ Prisma

    พูดง่าย ๆ คือ
    รับ input จาก query → แปลงเป็น Prisma where condition
*/

export function buildBookWhere(
  query: BookSearchQuery
): Prisma.BookWhereInput {

  const andConditions: Prisma.BookWhereInput[] = []; //กล่องเก็บเงื่อนไข

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
          /* 
              is ใช้กับ relation field เท่านั้น
              เลยใช้ is เพื่อนำทางไป filter อีก table

              model Book {
                id       Int
                title    String

                authorId Int      // 👈 FK (scalar field)
                author   Author  @relation(fields: [authorId], references: [id]) // 👈 relation field
              }
          */
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
          // some คือ ขอแค่มี "อย่างน้อย 1 รายการ" ที่ตรงเงื่อนไข
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
    //สุดท้ายเอาเงื่อนไขทั้งหมดมาครอบด้วย AND
    AND: andConditions,

    /*
    ตัวอย่าง:
      /books?title=harry&author=rowling

    จะกลายเป็น:
      WHERE
        title CONTAINS "harry"
      AND
        author.firstName OR author.lastName CONTAINS "rowling"

    */
  };
}
