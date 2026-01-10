import { Router } from "express";
import { borrowService } from "../services/borrowService";

const router = Router();

// ======== 📆 Borrows ========

// หนังสือที่ครบกำหนดคืนตามวันที่
router.get("/due", async (req, res) => {
  const dateQuery = req.query.date;
  // "date" คือชื่อ query parameter ที่ client ต้องส่งมาให้ตรงกัน

  if (typeof dateQuery !== "string") {
    return res.status(400).json({
      error: "Query parameter 'date' is required (YYYY-MM-DD)",
    });
  }

  // แปลง string → Date
  const dueDate = new Date(dateQuery);

  // ตรวจสอบว่าเป็นวันที่ถูกต้องหรือไม่
  if (Number.isNaN(dueDate.getTime())) {
    return res.status(400).json({
      error: "Invalid date format. Use YYYY-MM-DD",
    });
  }

  const pageNo = Number(req.query.pageNo) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  const result = await borrowService.getBooksDueOnDateService(
    dueDate,
    pageSize,
    pageNo
  );

  res.setHeader("X-Total-Count", result.totalCount.toString());
  res.json(result.data);
});

// หนังสือที่ยังไม่ได้คืน
router.get("/unreturned", async (req, res) => {
  const pageNo = Number(req.query.pageNo) || 1;
  const pageSize = Number(req.query.pageSize) || 10;

  const result = await borrowService.getUnreturnedBooksService(
    pageSize,
    pageNo
  );

  res.setHeader("X-Total-Count", result.totalCount.toString());
  res.json(result.data);
});

export default router;
