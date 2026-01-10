import { memberRepository } from "../repositories/memberRepository";

export const memberService = {
  async getMembersService(
    name: string | undefined,
    pageSize: number,
    pageNo: number
  ) {
    return memberRepository.getMembersDb(name, pageSize, pageNo);
  },

  // แสดงผลจากการค้นหาด้วย member code
  async getByCodeService(mCode: string) {
    return memberRepository.getByMemberCodeDb(mCode);
  },
};
