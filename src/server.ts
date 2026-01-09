import express from "express";
import bookRoutes from "./routes/bookRoutes"
import { authorService } from "./services/authorService";
import { memberService } from "./services/memberService";
import { borrowService } from "./services/borrowService";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("📚 Library API is running");
});



// ===== Routes =====
app.use("/books", bookRoutes);

// ======== ✍ Authors ========
app.get("/authors", async (req, res) => {
  const authors = await authorService.getAllAuthorsService();

  res.json(authors);
});

/////////////////////////////////////////////////////////////////////////////////

// ======== 👩 Members ========
app.get("/members", async (req, res) => {
  const { name } = req.query; // 👈 destructuring
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

// ======== 📆 Borrows ========
app.get("/borrows/due", async (req, res) => {
  const dateQuery = req.query.date; // 👈 เขียนแบบนี้ก็ได้ เป็นการ assign ตรง ไม่ได้ใช้ destructuring 
  // ดึงค่ามาใส่ในตัวแปรชื่อ "dateQuery"
  // "date" คือ ชื่อ query parameter ใน URL ที่ฝั่ง server กับ client ต้องใช้ชื่อตรงกัน จึงจะเชื่อมกันได้

  if (typeof dateQuery !== "string") {
    return res.status(400).json({
      error: "Query parameter 'date' is required (YYYY-MM-DD)",
    });
  }

  // แปลง string → Date
  const dueDate = new Date(dateQuery);

  // ตรวจว่าเป็นวันที่ถูกต้องหรือไม่
  if (Number.isNaN(dueDate.getTime())) {
    return res.status(400).json({
      error: "Invalid date format. Use YYYY-MM-DD",
    });
  }

  const items = await borrowService.getBooksDueOnDateService(dueDate);

  res.json(items);
});

app.get("/borrows/unreturned", async (req, res) => {
  const items = await borrowService.getUnreturnedBooksService();
  res.json(items);
});





//// เรียก Port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
