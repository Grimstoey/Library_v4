import { prisma } from "../lib/prisma";
import { Author } from "../generated/prisma/client";

export async function seedBooks(authors: Author[]) {
  console.log("📚 Seeding books...");

  const data = [
    {
      title: "1984",
      isbn: "9780451524935",
      category: "Dystopian",
      authorId: authors[0].id,
    },
    {
      title: "Animal Farm",
      isbn: "9780451526342",
      category: "Political Fiction",
      authorId: authors[0].id,
    },
    {
      title: "Harry Potter and the Philosopher's Stone",
      isbn: "9780747532743",
      category: "Fantasy",
      authorId: authors[1].id,
    },
    {
      title: "Harry Potter and the Chamber of Secrets",
      isbn: "9780747538486",
      category: "Fantasy",
      authorId: authors[1].id,
    },
    {
      title: "Kafka on the Shore",
      isbn: "9781400079278",
      category: "Novel",
      authorId: authors[2].id,
    },
    {
      title: "Norwegian Wood",
      isbn: "9780375704024",
      category: "Novel",
      authorId: authors[2].id,
    },
    {
      title: "Sapiens: A Brief History of Humankind",
      isbn: "9780062316097",
      category: "History",
      authorId: authors[3].id,
    },
    {
      title: "Homo Deus",
      isbn: "9780062464316",
      category: "History",
      authorId: authors[3].id,
    },
    {
      title: "The Da Vinci Code",
      isbn: "9780307474278",
      category: "Thriller",
      authorId: authors[4].id,
    },
    {
      title: "Angels & Demons",
      isbn: "9780743493468",
      category: "Thriller",
      authorId: authors[4].id,
    },
  ];

  await prisma.book.createMany({ data });

  return prisma.book.findMany();
}
