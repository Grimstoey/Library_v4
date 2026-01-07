import { prisma } from "../lib/prisma";

export async function seedAuthors() {
  console.log("✍️ Seeding authors...");

  const authors = await prisma.author.createMany({
    data: [
      { firstName: "George", lastName: "Orwell", affiliation: "British Writers" },
      { firstName: "J.K.", lastName: "Rowling", affiliation: "Bloomsbury" },
      { firstName: "Haruki", lastName: "Murakami", affiliation: "Japanese Literature" },
      { firstName: "Yuval", lastName: "Harari", affiliation: "Hebrew University" },
      { firstName: "Dan", lastName: "Brown", affiliation: "American Writers" },
    ],
  });

  return prisma.author.findMany();
}
