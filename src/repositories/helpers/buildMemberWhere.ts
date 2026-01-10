import { Prisma } from "../../generated/prisma/client";

export function buildMemberWhere(
  name?: string
): Prisma.MemberWhereInput {
  const andConditions: Prisma.MemberWhereInput[] = [];

  // 🔍 ค้นหาด้วยชื่อ / นามสกุล
  if (name) {
    andConditions.push({
      OR: [
        {
          firstName: {
            contains: name,
            mode: Prisma.QueryMode.insensitive,
          },
        },
        {
          lastName: {
            contains: name,
            mode: Prisma.QueryMode.insensitive,
          },
        },
      ],
    });
  }

  // ถ้าไม่มีเงื่อนไข → return {}
  if (andConditions.length === 0) {
    return {};
  }

  return {
    AND: andConditions,
  };
}
