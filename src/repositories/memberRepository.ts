import { prisma } from "../lib/prisma";
import { buildMemberWhere } from "./helpers/buildMemberWhere";

export const memberRepository = {
  // ดึงสมาชิกทั้งหมด / ค้นหา + pagination
  async getMembersDb(
    name?: string,
    pageSize: number = 10,
    pageNo: number = 1
  ) {
    const whereCondition = buildMemberWhere(name);

    const items = await prisma.member.findMany({
      where: whereCondition,
      take: pageSize,
      skip: pageSize * (pageNo - 1),
      orderBy: { id: "asc" },
      include: { borrows: true },
    });

    const totalCount = await prisma.member.count({
      where: whereCondition,
    });

    return { data: items, totalCount };
  },

  // ดึงสมาชิกตาม member code (ไม่ต้องใช้ helper)
  async getByMemberCodeDb(mCode: string) {
    return prisma.member.findUnique({
      where: { memberCode: mCode },
      include: { borrows: true },
    });
  },
};
