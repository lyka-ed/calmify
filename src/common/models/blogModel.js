import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  timestamp: { type: Date, default: Date.now },
  state: { type: String, required: true },
  read_count: { type: Number, default: 0 },
  reading_time: { type: Number, required: true },
  body: { type: String, required: true },
});

blogSchema.plugin(uniqueValidator);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
