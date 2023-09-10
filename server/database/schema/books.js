import mongoose from "mongoose";
const User = require("./user");

const Schema = new mongoose.Schema();

const bookSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    author: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    postedBy: {
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", bookSchema);
