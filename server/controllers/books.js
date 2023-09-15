const books = require("../database/schema/books");
const jwt = require("jsonwebtoken");
const JWT_Secret = process.env.JWT_Secret;

//list
const list_books = async (req, res) => {
  try {
    const all_books = await books.find();
    res.send(200).json({ all_books: all_books });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//create
const create_books = async (req, res) => {
  try {
    const user_token = req.headers.authorization;
    const token = jwt.verify(user_token, JWT_Secret);
    const { name, author, summary } = req.body;

    const all_books = await books.insertOne({
      name: name,
      summary: summary,
      author: author,
      postedBy: user._id,
    });
    res
      .send(200)
      .json({ message: "Data inserted Successfully", all_books: all_books });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//update
const update_book = async (req, res) => {
  try {
    const user_token = req.headers.authorization;
    const token = jwt.verify(user_token, JWT_Secret);
    const book_id = req.params;
    const { name, author, summary } = req.body;

    const all_books = await books.findAndUpdateOne(
      {
        _id: book_id,
      },
      {
        name: name,
        summary: summary,
        author: author,
      }
    );
    res
      .send(200)
      .json({ message: "Data Updated Successfully", all_books: all_books });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//delete
const delete_book = async (req, res) => {
  try {
    const user_token = req.headers.authorization;
    const token = jwt.verify(user_token, JWT_Secret);
    const book_id = req.params;
    //   const { name, author, summary } = req.body;

    const all_books = await books.deleteOne({
      _id: book_id,
    });
    res.send(200).json({ message: "Data Deleted Successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

//retrive
//delete
const retrive_book = async (req, res) => {
  try {
    const user_token = req.headers.authorization;
    const token = jwt.verify(user_token, JWT_Secret);
    const book_id = req.params;
    //   const { name, author, summary } = req.body;

    const books = await books.findOne({
      _id: book_id,
    });
    res.send(200).json({ message: "Data Deleted Successfully", book: books });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  list_books,
  create_books,
  update_book,
  retrive_book,
  delete_book,
};
