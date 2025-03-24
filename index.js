const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
const Book = require("./Book");

const port = 4000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Connection failed", err));

app.get("/", async (req, res) => {
  res.json({ message: "Welcome to Server" });
});

app.get("/book", async (req, res) => {
  try {
    const data = await Book.find();
    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "No Book Found",
      });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", err });
  }
});

app.get("/book/:id", async (req, res) => {
  try {
    const data = await Book.findById();
    if (!data) {
      return res.status(404).json({
        message: "Not Found",
      });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/book", async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      publishedYear,
      aviablableCopies,
      borrowedby,
    } = req.body;
    if (
      !title ||
      !author ||
      !genre ||
      !publishedYear ||
      !aviablableCopies ||
      !borrowedby
    ) {
      return res.status(400).json({
        message: "All Fileds are Required, make sure to fill all the fields",
      });
    }
    const newbook = new Book({
      title,
      author,
      genre,
      publishedYear,
      aviablableCopies,
      borrowedby,
    });
    await newbook.save();
    res.status(200).json(newbook);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/book/:id", async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      publishedYear,
      aviablableCopies,
      borrowedby,
    } = req.body;
    const updatebook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        genre,
        publishedYear,
        aviablableCopies,
        borrowedby,
      },
      { new: true }
    );
    if (!updatebook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    res.status(200).json(updatebook);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/book/:id", async (req, res) => {
  try {
    const id = req.parms.id;
    if (!id) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    const Deletebook = await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book Deleted Sucessfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => console.log("Connected to server at port 4000"));
