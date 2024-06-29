import Blog from "../models/blogModel.js";
import { logger } from "../utils/logger.js";

export async function createBlog({
  title,
  content,
  author,
  state,
  body,
  tags,
  description,
  timestamp,
  read_count,
}) {
  const reading_time = calculateReadingTime(content);
  const blog = new Blog({
    title,
    author,
    reading_time,
    state,
    body,
    tags,
    description,
    timestamp,
    read_count,
  });
  await blog.save();
  logger.info("Blog created successfully");
  return blog;

  function calculateReadingTime(content) {
    try {
      const wordsPerMinute = 200;
      const wordCount = content.split(/\s+/).length;
      logger.info("Reading time calculated");
      return Math.ceil(wordCount / wordsPerMinute);
    } catch (err) {
      logger.error(err);
      return 0;
    }
  }
}

export async function getAllBlogs({ page = 1, limit = 10, state, search }) {
  const skip = (page - 1) * limit;
  let query = {};

  if (state) {
    query.state = state;
  }

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { tags: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { body: { $regex: search, $options: "i" } },
    ];
  }

  const blogs = await Blog.find(query).skip(skip).limit(limit); // if 24 items => 3pages => 10 10 4
  return blogs;
}

export async function getBlogById(id) {
  const blog = await Blog.findById(id).populate("author");
  if (!blog) {
    logger.error("Blog not found");
    throw new Error("Blog not found");
  }

  blog.read_count += 1;
  await blog.save();

  logger.info("Blog found");
  return blog;
}

export async function updateBlogById(id, { title, content }) {
  const blog = await Blog.findByIdAndUpdate(id);
  if (!blog) {
    logger.error("Blog not found");
    throw new Error("Blog not found");
  }

  blog.title = title;
  blog.content = content;
  await blog.save();

  logger.info("Blog updated successfully");
  return blog;
}

export async function deleteBlogById(id) {
  const blog = await Blog.findByIdAndDelete(id);
  if (!blog) {
    logger.error("Blog not found");
    throw new Error("Blog not found");
  }

  // await blog.delete();
  logger.info("Blog deleted successfully");
  return { message: "Blog deleted successfully" };
}
