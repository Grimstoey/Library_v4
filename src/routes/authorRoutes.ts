import { Router } from "express";
import { authorService } from "../services/authorService";

const router = Router();

// ======== ✍ Authors ========
router.get("/", async (req, res) => {
  const pageNo = Number(req.query.pageNo) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  const result = await authorService.getAllAuthorsService(pageSize, pageNo);

  res.setHeader("X-Total-Count", result.totalCount.toString());

  res.json(result);
});

export default router;
