import { prisma } from "../lib/prisma";
import { Member, Book } from "../generated/prisma/client";
import {
  borrowedDaysAgo,
  calculateDueDate,
} from "../utils/borrowUtils";

export async function seedBorrows(members: Member[], books: Book[]) {
  console.log("📦 Seeding borrows ...");

  /*
    CASE 1:
    - ยืม 2 เล่ม
    - ยืมมาแล้ว 3 วัน
    - ยังไม่ overdue
  */
  await prisma.borrow.create({
    data: {
      memberId: members[0].id,
      borrowDate: borrowedDaysAgo(3),
      items: {
        create: [
          {
            bookId: books[0].id,
            dueDate: calculateDueDate(3),
          },
          {
            bookId: books[1].id,
            dueDate: calculateDueDate(3),
          },
        ],
      },
    },
  });

  await prisma.book.updateMany({
    where: { id: { in: [books[0].id, books[1].id] } },
    data: { status: "BORROWED" },
  });

  /*
    CASE 2:
    - ยืมมาแล้ว 10 วัน
    - คืนแล้ว
  */
  await prisma.borrow.create({
    data: {
      memberId: members[1].id,
      borrowDate: borrowedDaysAgo(10),
      items: {
        create: [
          {
            bookId: books[2].id,
            dueDate: calculateDueDate(10),
            returnedAt: borrowedDaysAgo(2),
          },
        ],
      },
    },
  });

  await prisma.book.update({
    where: { id: books[2].id },
    data: { status: "AVAILABLE" },
  });

  /*
    CASE 3:
    - ยืมมาแล้ว 20 วัน
    - OVERDUE
  */
  await prisma.borrow.create({
    data: {
      memberId: members[2].id,
      borrowDate: borrowedDaysAgo(20),
      items: {
        create: [
          {
            bookId: books[3].id,
            dueDate: calculateDueDate(20),
          },
        ],
      },
    },
  });

  await prisma.book.update({
    where: { id: books[3].id },
    data: { status: "BORROWED" },
  });

  /*
    CASE 4–5:
    - ยืมปกติ (1 คน ต่อ 1 เล่ม)
    - ป้องกัน index หลุด
  */
  const limit = Math.min(members.length, books.length - 1);

  for (let i = 3; i < limit; i++) {
    const member = members[i];
    const book = books[i + 1];

    if (!member || !book) continue;

    await prisma.borrow.create({
      data: {
        memberId: member.id,
        borrowDate: borrowedDaysAgo(1),
        items: {
          create: [
            {
              bookId: book.id,
              dueDate: calculateDueDate(1),
            },
          ],
        },
      },
    });

    await prisma.book.update({
      where: { id: book.id },
      data: { status: "BORROWED" },
    });
  }

  console.log("✅ Seeding borrows completed");
}
