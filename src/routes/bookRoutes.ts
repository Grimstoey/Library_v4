import { Router } from "express";
import { bookService } from "../services/bookService";
import { BookSearchQuery } from "../types/book-search.type";

const router = Router();

// ======== 📚 Books ========
router.get("/", async (req, res) => {
  try {
    // 🔹 map query → BookSearchQuery
    const searchQuery: BookSearchQuery = {
      keyword: typeof req.query.keyword === "string" ? req.query.keyword : undefined,
      title: typeof req.query.title === "string" ? req.query.title : undefined,
      category: typeof req.query.category === "string" ? req.query.category : undefined,
      author: typeof req.query.author === "string" ? req.query.author : undefined,
      member: typeof req.query.member === "string" ? req.query.member : undefined,
    };

    const pageNo = req.query.pageNo ? Number(req.query.pageNo) : 1;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;

    // 🔹 ส่ง object เข้า service
    const result = await bookService.searchBooksService(
      searchQuery,
      pageSize,
      pageNo
    );

     // ส่งจำนวนทั้งหมดผ่าน header
    res.setHeader("X-Total-Count", result.totalCount.toString());

    if (result.books.length > 0) {
      res.json(result.books);
    } else {
      res.status(404).json({
        message: "❌ There is no book you are looking for.",
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Server error" });
  }
});

export default router;
