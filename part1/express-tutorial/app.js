const express = require("express");
const httpCodes = require("http-status-codes").StatusCodes;
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  {
    id: 1,
    title: "Book 1",
    author: "Author 1",
  },
  {
    id: 2,
    title: "Book 2",
    author: "Author 2",
  },
  {
    id: 3,
    title: "Book 3",
    author: "Author 3",
  },
];

app.get("/", (req, res) => {
  res.status(httpCodes.OK).send("Welcome to the Book Store API!");
});

app.get("/books", (req, res) => {
  res.status(httpCodes.OK).json(books);
});

app.get("/books/:id", (req, res) => {
  const book = books.find((book) => book.id === parseInt(req.params.id));
  if (!book) {
    return res.status(httpCodes.NOT_FOUND).send({ message: "Book not found" });
  }
  res.status(httpCodes.OK).json(book);
});

app.post("/books", (req, res) => {
  const book = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
  };
  books.push(book);
  res.status(httpCodes.CREATED).json(book);
});

app.put("/books/:id", (req, res) => {
  const bookToUpdate = books.find(
    (book) => book.id === parseInt(req.params.id)
  );

  if (bookToUpdate) {
    let updatedBook = null;

    books.map((book) => {
      if (book.id === bookToUpdate.id) {
        book.title = req.body.title;
        book.author = req.body.author;

        updatedBook = { ...book };
      }
    });

    return res.status(httpCodes.ACCEPTED).json(updatedBook);
  } else {
    res.status(httpCodes.NOT_FOUND).send({
      message: "Book not found",
    });
  }
});

app.delete("/books/:id", (req, res) => {
  const bookToDelete = books.find(
    (book) => book.id === parseInt(req.params.id)
  );

  if (bookToDelete) {
    books = books.filter((book) => book.id !== bookToDelete.id);
    res
      .status(httpCodes.ACCEPTED)
      .send({ message: "Book deleted successfully", data: bookToDelete });
  } else {
    res.status(httpCodes.NOT_FOUND).send({ message: "Book not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
