import { memberRepository } from "../repositories/memberRepository";

export const memberService = {

    // แสดง members ทั้งหมด
    async getAllMembersService()
    {
        return memberRepository.getAllMemberDb();
    },

    // แสดงผลจากการค้นหาด้วย ชื่อ หรือนามสกุล
    async getByNameService(name: string)
    {
        return memberRepository.getByNameDb(name);
    },

    // แสดงผลจากการค้นหาด้วย member code
    async getByCodeService(mCode: string)
    {
        return memberRepository.getByMemberCodeDb(mCode);
    }
}