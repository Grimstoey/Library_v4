import { Router } from "express";
import { memberService } from "../services/memberService";

const router = Router();

// ======== 👩 Members ========

router.get("/", async (req, res) => {
  const name = typeof req.query.name === "string" ? req.query.name : undefined;

  const pageNo = Number(req.query.pageNo) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  const result = await memberService.getMembersService(name, pageSize, pageNo);

  res.setHeader("X-Total-Count", result.totalCount.toString());

  res.json(result.data);
});

// ค้นหาด้วย member code
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
