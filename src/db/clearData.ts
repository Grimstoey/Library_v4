import { prisma } from "../lib/prisma";

export async function clearData() {
  console.log("🧹 Clearing data...");

  await prisma.borrowItem.deleteMany();
  await prisma.borrow.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.member.deleteMany();
}
