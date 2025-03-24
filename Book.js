const mongoose = require("mongoose");

const Book = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  aviablableCopies: {
    type: Number,
    required: true,
  },
  borrowedby: [
    {
      users: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Book", Book);
