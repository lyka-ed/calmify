import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
} from "../services/blogService.js";

export async function create(req, res) {
  const blog = await createBlog(req.body);
  res.status(201).json({
    success: true,
    message: "New Blog created successfully!",
    blog,
  });
}

export async function getAll(req, res) {
  try {
    const blogs = await getAllBlogs(req.query);
    res.status(200).json({
      success: true,
      message: "See Blog below!",
      totalBlogs: blogs.length,
      blogs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getById(req, res) {
  try {
    const blog = await getBlogById(req.params.id);
    res.status(200).json(blog);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export async function update(req, res) {
  try {
    const blog = await updateBlogById(req.params.id, req.body);
    res.json(blog);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export async function deleteById(req, res) {
  try {
    const blog = await deleteBlogById(req.params.id);
    res.json(blog);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}
