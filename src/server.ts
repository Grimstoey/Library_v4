import express from "express";
import bookRoutes from "./routes/bookRoutes"
import authorRoutes from "./routes/authorRoutes"
import borrowRoutes from "./routes/borrowRoutes"
import memberRoutes from "./routes/memberRoutes"



const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("📚 Library API is running");
});



// ===== Routes =====
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/borrows", borrowRoutes);
app.use("/members", memberRoutes);




//// เรียก Port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
