import express from "express";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";
import { ENVIRONMENT } from "./common/config/environment.js";
import { connectDB } from "./common/config/database.js";

// Default app configurations
const app = express();

const port = ENVIRONMENT.APP.PORT;
const appName = ENVIRONMENT.APP.NAME;

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// app.use("/api/v1/user", import("./common/routes/userRoutes.js"));
// app.use("/api/v1/blog", import("./common/routes/blogRoutes.js"));
(async () => {
  try {
    const blogRoutes = await import("./common/routes/blogRoutes.js");
    app.use("/api/v1/blog", blogRoutes.default);
  } catch (error) {
    console.error("Failed to load blog routes:", error);
  }
})();

(async () => {
  try {
    const userRoutes = await import("./common/routes/userRoutes.js");
    app.use("/api/v1/user", userRoutes.default);
  } catch (error) {
    console.error("Failed to load user routes:", error);
  }
})();

(async () => {
  try {
    const authRoutes = await import("./common/routes/authRoutes.js");
    app.use("/api/v1/auth", authRoutes.default);
  } catch (error) {
    console.error("Failed to load user routes:", error);
  }
})();

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1> Welcome to CALMIFY where all your worries are addressed </h1>");
});

app.listen(port, async () => {
  console.log(`==> "${appName}" listening on port: ${port}!`.white.bgMagenta);
  await connectDB();
});
