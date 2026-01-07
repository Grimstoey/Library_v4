import { prisma } from "../src/lib/prisma";
import {
  clearData,
  seedAuthors,
  seedBooks,
  seedMembers,
  seedBorrows,
} from "../src/db";

async function main() {
  console.log("🌱 Seeding database...\n");

  await clearData();

  const authors = await seedAuthors();
  const books = await seedBooks(authors);
  const members = await seedMembers();
  await seedBorrows(members, books);

  console.log("\n🎉 Seed สำเร็จ!");
}

main()
  .catch((e) => {
    console.error("❌ Error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
