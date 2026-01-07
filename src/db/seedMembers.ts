import { prisma } from "../lib/prisma";

export async function seedMembers() {
  console.log("👤 Seeding members...");

  await prisma.member.createMany({
    data: [
      { memberCode: "M001", firstName: "John", lastName: "Doe", phoneNumber: "081-111-1111" },
      { memberCode: "M002", firstName: "Jane", lastName: "Smith", phoneNumber: "081-222-2222" },
      { memberCode: "M003", firstName: "Somchai", lastName: "Jaidee", phoneNumber: "081-333-3333" },
      { memberCode: "M004", firstName: "Suda", lastName: "Dee", phoneNumber: "081-444-4444" },
      { memberCode: "M005", firstName: "Anan", lastName: "Meechai", phoneNumber: "081-555-5555" },
    ],
  });

  return prisma.member.findMany();
}
