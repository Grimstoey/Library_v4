import express from "express";
import { bookService } from "./services/bookService";
import { authorService } from "./services/authorService";
import { memberService } from "./services/memberService";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("📚 Library API is running");
});

////////////////////////////////////// - - - Api  - - - //////////////////////////////////////

// ======== 📚 Books ========
app.get("/books", async (req, res) => {
  const { title } = req.query;

  if (title && typeof title === "string") {
    const books = await bookService.searchByTitleService(title);

    if (books.length != 0) {
      res.json(books);
    } else {
      res.status(404).json("❌ There is no book you are looking for.");
    }
  } else {
    const books = await bookService.getAllBooksService();

    res.json(books);
  }
});

/////////////////////////////////////////////////////////////////////////////////

// ======== ✍ Authors ========
app.get("/authors", async (req, res) => {
  const authors = await authorService.getAllAuthorsService();

  res.json(authors);
});

/////////////////////////////////////////////////////////////////////////////////

// ======== 👩 Members ========
app.get("/members", async (req, res) => {
  const { name } = req.query;
  // ***** ทดสอบ API query ด้วย " name " เท่านั้น
  // หรือชื่ออะไรก็ได้ที่อยากตั้ง 
  // ไม่สามารถเรียกด้วย schema ที่กำหนดไว้ใน schema.prisma ได้ เพราะไม่เกี่ยวกัน
  /*
    คือการบอก Express ว่า
    👉 ถ้ามี ?name=... ใน URL เอาค่านั้นมาใช้ 

  */

  if (name && typeof name === "string") {
    const members = await memberService.getByNameService(name);

    if (members.length != 0) {
      res.json(members);
    } else {
      res
        .status(404)
        .json({ message: "❌ The member you are looking for is not listed." });
    }
  } else {
    const members = await memberService.getAllMembersService();

    res.json(members);
  }
});

app.get("/member/:code", async (req, res) => {
  const mCode = await memberService.getByCodeService(req.params.code);

  if (mCode) {
    res.json(mCode);
  } else {
    res
      .status(404)
      .json({ message: "❌ The member you are looking for is not listed." });
  }
});

/////////////////////////////////////////////////////////////////////////////////

//// เรียก Port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
