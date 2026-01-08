import { prisma } from "../lib/prisma";

export const memberRepository = {
  // ดึงสมาชิก "ทั้งหมด" จาก db
  async getAllMemberDb() {
    return prisma.member.findMany({
      include: { borrows: true },
    });
  },

  // ดึงสมาชิกตาม "ชื่อหรือนามสกุล" จาก db
  async getByNameDb(name: string) {
    return prisma.member.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: name,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: name,
              mode: "insensitive",
            },
          },
        ],
      },
    });
  },

  // ดึงสมาชิกตาม "หมายเลขสมาชิก" จาก db
  async getByMemberCodeDb(mCode: string) {
    return prisma.member.findUnique({
      where: { memberCode: mCode },
      include: { borrows: true },
    });
  },
};
