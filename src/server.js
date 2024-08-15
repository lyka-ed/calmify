import express from "express";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";
import rateLimit from "express-rate-limit";
import pkg from "express-openid-connect";
import helmet from "helmet"; 
import {logger} from "./common/utils/logger.js";
import { ENVIRONMENT } from "./common/config/environment.js";
import { connectDB } from "./common/config/database.js";
import auth0Middleware from "./common/middlewares/auth0/auth0.js";


// Default app configurations
const app = express();

const port = ENVIRONMENT.APP.PORT;
const appName = ENVIRONMENT.APP.NAME;

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Auth0 middleware for authentication and authorization of requests to the API endpoints 
app.use(auth0Middleware);
const { requiresAuth } = pkg;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// Apply the rate limiting middleware to all requests
app.use(limiter);

app.use(helmet()); // Set security headers

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
  logger.info("Welcome to CALMIFY where all your worries are addressed");
  return res
    .status(200)
    .send("<h1> Welcome to CALMIFY where all your worries are addressed </h1>");
});

app.listen(port, async () => {
  console.log(`==> "${appName}" listening on port: ${port}!`.white.bgMagenta);
  await connectDB();
});
