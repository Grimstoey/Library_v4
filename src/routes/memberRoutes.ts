import { Router } from "express";
import { memberService } from "../services/memberService";

const router = Router();

// ======== 👩 Members ========

// ดึงสมาชิกทั้งหมด หรือค้นหาด้วยชื่อ (?name=...)
router.get("/", async (req, res) => {
  const { name } = req.query; // 👈 destructuring

  /*
    คือการบอก Express ว่า
    👉 ถ้ามี ?name=... ใน URL เอาค่านั้นมาใช้

    หมายเหตุ:
    - query parameter "name" เป็นชื่อที่เราตั้งเอง
    - ไม่เกี่ยวกับ field หรือ schema ใน prisma.schema
  */

  if (name && typeof name === "string") {
    const members = await memberService.getByNameService(name);

    if (members.length !== 0) {
      return res.json(members);
    }

    return res.status(404).json({
      message: "❌ The member you are looking for is not listed.",
    });
  }

  // ถ้าไม่ส่ง query มา → ดึงทั้งหมด
  const members = await memberService.getAllMembersService();
  res.json(members);
});

// ดึงสมาชิกด้วยรหัส (path param)
router.get("/:code", async (req, res) => {
  const member = await memberService.getByCodeService(req.params.code);

  if (member) {
    return res.json(member);
  }

  res.status(404).json({
    message: "❌ The member you are looking for is not listed.",
  });
});

export default router;
