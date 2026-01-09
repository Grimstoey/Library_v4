import { Router } from "express";
import { authorService } from "../services/authorService";

const router = Router();

// ======== ✍ Authors ========
router.get("/", async (req, res) => {
  const authors = await authorService.getAllAuthorsService();
  res.json(authors);
});

export default router;
