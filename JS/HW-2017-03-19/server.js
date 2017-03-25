const express = require("express"),
	fs = require("fs"),
  app = express(),
  bodyParser = require("body-parser");

app.use(express.static("./public/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

let book_id = 3,
books = [
   {title: "ew", desc: "we", author: "we", published: "ewe", id: 1},
   {title: "sd", desc: "as", author: "as", published: "sd", id: 2}
];


app.post("/add-book", (req, res) => {
  const book = req.body;

  book.id = book_id++;
  books.push(book);

  console.log(book);
  res.send(book);

});



app.get("/books", (req, res) => {
  res.send(books);
});

app.get("/book/:id", (req, res) => {
  let id = req.params.id;
  fs.readFile(`${__dirname}/public/book.html`, "utf8", (err, file) => {
      if(err) return reject(404);
      res.send(file);
  });
});

app.get("/book/get/:id", (req, res) => {
  let id = req.params.id;
  let index = books.findIndex(book => book.id == id);
  console.log(id);
  res.send(books[index]);  
});

app.delete("/:id", (req, res) => {
  let id = req.params.id;

  let index = books.findIndex(book => book.id == id);

  books.splice(index, 1);

  res.send(books);
});

app.listen(3300, () => {
  console.log("Listen 3300");
});