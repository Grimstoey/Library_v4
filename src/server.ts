import express from "express";
import { bookService } from "./services/bookService";
import { authorService } from "./services/authorService";


const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("📚 Library API is running");
});


// ======== Endpoint ========

// 📚 Books
app.get("/books", async(req, res) => 
{
  const {title} = req.query;
  if(title && typeof title === "string")
  {
    const books = await bookService.searchByTitleService(title);

    if(books.length != 0)
    {
      res.json(books);
    }
    else
    {
      res.send("❌ There is no book you are looking for.");
    }
    
  }
  else
  {
    const books = await bookService.getAllBooksService();
    res.json(books);
  }
  
});

// ✍ Authors
app.get("/authors", async(req, res) =>
{
  const authors = await authorService.getAllAuthorsService();

  res.json(authors);
});



//// เรียก Port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});